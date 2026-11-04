import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './auth.js'
import requireAuth from './middleware/requireAuth.js'
import menuRouter from './routes/menu.js'
import checkoutRouter from './routes/checkout.js'
import stripeWebhook from './routes/webhooks.js'

const app = express()
const port = process.env.PORT || 3000

app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }))
app.all('/api/auth/*splat', toNodeHandler(auth))
app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), stripeWebhook)
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/me', requireAuth, (req, res) => {
  res.json({ user: req.user })
})

app.use('/api/menu', menuRouter)
app.use('/api/checkout', checkoutRouter)

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`)
})
