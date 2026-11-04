import { Router } from 'express'
import pool from '../db.js'
import stripe from '../stripe.js'
import requireAuth from '../middleware/requireAuth.js'

const router = Router()

function readItems(body) {
  const items = body && body.items

  if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
    return { error: 'Your order is empty.' }
  }

  const ids = []
  for (const item of items) {
    if (!item || !Number.isInteger(item.id) || item.id < 1) {
      return { error: 'Each item needs a valid id.' }
    }
    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 20) {
      return { error: 'Each quantity must be a whole number from 1 to 20.' }
    }
    if (ids.includes(item.id)) {
      return { error: 'Each dish can only appear once in an order.' }
    }
    ids.push(item.id)
  }

  return { items }
}

router.post('/', requireAuth, async (req, res) => {
  const { items, error } = readItems(req.body)
  if (error) {
    return res.status(400).json({ error })
  }

  let orderId
  let lines

  try {
    const result = await pool.query(
      'select id, name, (price * 100)::int as price_cents from menu_items where id = any($1::int[])',
      [items.map((item) => item.id)],
    )
    if (result.rows.length !== items.length) {
      return res.status(400).json({ error: 'One or more dishes do not exist.' })
    }

    lines = items.map((item) => {
      const row = result.rows.find((dish) => dish.id === item.id)
      return { id: row.id, name: row.name, priceCents: row.price_cents, quantity: item.quantity }
    })
    const totalCents = lines.reduce((sum, line) => sum + line.priceCents * line.quantity, 0)

    const client = await pool.connect()
    try {
      await client.query('begin')
      const order = await client.query(
        'insert into orders (user_id, total_cents) values ($1, $2) returning id',
        [req.user.id, totalCents],
      )
      orderId = order.rows[0].id
      for (const line of lines) {
        await client.query(
          'insert into order_items (order_id, menu_item_id, name, unit_price_cents, quantity) values ($1, $2, $3, $4, $5)',
          [orderId, line.id, line.name, line.priceCents, line.quantity],
        )
      }
      await client.query('commit')
    } catch (error) {
      await client.query('rollback')
      throw error
    } finally {
      client.release()
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Something went wrong' })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lines.map((line) => ({
        quantity: line.quantity,
        price_data: {
          currency: 'eur',
          unit_amount: line.priceCents,
          product_data: { name: line.name },
        },
      })),
      client_reference_id: orderId,
      metadata: { order_id: orderId },
      customer_email: req.user.email,
      success_url: `${process.env.CLIENT_ORIGIN}/?checkout=success&order=${orderId}#menu`,
      cancel_url: `${process.env.CLIENT_ORIGIN}/?checkout=cancelled#menu`,
    })
    await pool.query('update orders set stripe_session_id = $1 where id = $2', [session.id, orderId])
    res.json({ url: session.url })
  } catch (error) {
    console.error(error)
    await pool.query("update orders set status = 'cancelled' where id = $1", [orderId]).catch(() => {})
    res.status(502).json({ error: 'We could not start the payment. Please try again.' })
  }
})

export default router
