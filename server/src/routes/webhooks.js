import pool from '../db.js'
import stripe from '../stripe.js'

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function readOrderId(session) {
  const orderId = session.metadata && session.metadata.order_id
  return uuidPattern.test(orderId || '') ? orderId : null
}

async function markPaid(session) {
  if (session.payment_status !== 'paid') {
    return
  }

  const orderId = readOrderId(session)
  if (!orderId) {
    return
  }

  const result = await pool.query('select total_cents, currency from orders where id = $1', [orderId])
  const order = result.rows[0]
  if (!order) {
    return
  }

  if (order.total_cents !== session.amount_total || order.currency !== session.currency) {
    console.error(`Amount mismatch for order ${orderId}`)
    return
  }

  await pool.query(
    "update orders set status = 'paid', paid_at = now(), stripe_payment_intent = $1 where id = $2 and stripe_session_id = $3 and status = 'pending'",
    [session.payment_intent, orderId, session.id],
  )
}

async function markCancelled(session) {
  const orderId = readOrderId(session)
  if (!orderId) {
    return
  }

  await pool.query(
    "update orders set status = 'cancelled' where id = $1 and stripe_session_id = $2 and status = 'pending'",
    [orderId, session.id],
  )
}

async function stripeWebhook(req, res) {
  let event

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET,
    )
  } catch {
    return res.status(400).json({ error: 'Invalid signature' })
  }

  try {
    if (event.type === 'checkout.session.completed') {
      await markPaid(event.data.object)
    }
    if (event.type === 'checkout.session.expired') {
      await markCancelled(event.data.object)
    }
    res.json({ received: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

export default stripeWebhook
