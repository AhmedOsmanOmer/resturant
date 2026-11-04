import { Router } from 'express'
import pool from '../db.js'
import requireAuth from '../middleware/requireAuth.js'

const router = Router()

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

router.get('/:id', requireAuth, async (req, res) => {
  if (!uuidPattern.test(req.params.id)) {
    return res.status(400).json({ error: 'Invalid order id' })
  }

  try {
    const result = await pool.query(
      'select id, status, total_cents, currency, created_at, paid_at from orders where id = $1 and user_id = $2',
      [req.params.id, req.user.id],
    )
    const order = result.rows[0]
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }

    const items = await pool.query(
      'select id, name, unit_price_cents, quantity from order_items where order_id = $1 order by id',
      [order.id],
    )
    res.json({ ...order, items: items.rows })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

export default router
