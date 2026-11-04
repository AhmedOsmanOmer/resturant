import 'dotenv/config'
import Stripe from 'stripe'

const key = process.env.STRIPE_SECRET_KEY

if (!key) {
  throw new Error('STRIPE_SECRET_KEY is missing. Add your Stripe test secret key to server/.env.')
}

if (!key.startsWith('sk_test_')) {
  throw new Error('STRIPE_SECRET_KEY must be a Stripe test key that starts with sk_test_.')
}

const stripe = new Stripe(key)

export default stripe
