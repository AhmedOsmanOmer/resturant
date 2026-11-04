import fs from 'node:fs'
import pool from '../src/db.js'

const files = ['schema.sql', 'auth-schema.sql']

try {
  for (const file of files) {
    const sql = fs.readFileSync(new URL(`./${file}`, import.meta.url), 'utf8')
    await pool.query(sql)
    console.log(`Applied ${file}`)
  }
} catch (error) {
  console.error('Migration failed:', error.message)
  process.exitCode = 1
} finally {
  await pool.end()
}
