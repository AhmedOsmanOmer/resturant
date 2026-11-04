import { Router } from 'express'
import pool from '../db.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'select id, name, description, price::float8 as price, category, image from menu_items order by id',
    )
    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

router.get('/:id', async (req, res) => {
  if (!/^\d{1,9}$/.test(req.params.id)) {
    return res.status(400).json({ error: 'Invalid menu item id' })
  }

  try {
    const result = await pool.query(
      'select id, name, description, price::float8 as price, category, image from menu_items where id = $1',
      [Number(req.params.id)],
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Menu item not found' })
    }
    res.json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

export default router
