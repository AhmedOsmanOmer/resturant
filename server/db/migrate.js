import fs from 'node:fs'
import pool from '../src/db.js'

const sql = fs.readFileSync(new URL('./schema.sql', import.meta.url), 'utf8')

try {
  await pool.query(sql)
  console.log('Schema applied')
} catch (error) {
  console.error('Migration failed:', error.message)
  process.exitCode = 1
} finally {
  await pool.end()
}
