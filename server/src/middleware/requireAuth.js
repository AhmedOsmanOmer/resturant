import { fromNodeHeaders } from 'better-auth/node'
import { auth } from '../auth.js'

async function requireAuth(req, res, next) {
  try {
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) })
    if (!session) {
      return res.status(401).json({ error: 'Not signed in' })
    }
    req.user = session.user
    next()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

export default requireAuth
