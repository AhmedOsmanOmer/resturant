import pool from '../src/db.js'
import menu from './menu-data.js'

const client = await pool.connect()

try {
  await client.query('begin')
  await client.query('truncate menu_items restart identity')
  for (const item of menu) {
    await client.query(
      'insert into menu_items (name, description, price, category, image) values ($1, $2, $3, $4, $5)',
      [item.name, item.description, item.price, item.category, item.image],
    )
  }
  await client.query('commit')
  console.log(`Inserted ${menu.length} menu items`)
} catch (error) {
  await client.query('rollback')
  console.error('Seed failed:', error.message)
  process.exitCode = 1
} finally {
  client.release()
  await pool.end()
}
