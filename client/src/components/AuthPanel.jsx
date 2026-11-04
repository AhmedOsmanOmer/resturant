import { useState } from 'react'
import { authClient } from '../lib/authClient'

const labelClass = 'mb-1.5 block text-sm font-semibold text-dark'
const inputClass = 'w-full rounded border border-line bg-cream px-3.5 py-3 text-ink transition-colors hover:border-muted focus-visible:border-gold focus-visible:bg-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gold'

function AuthPanel({ onClose }) {
  const [mode, setMode] = useState('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isSignUp = mode === 'signup'

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    const result = isSignUp
      ? await authClient.signUp.email({ name, email, password })
      : await authClient.signIn.email({ email, password })

    setLoading(false)

    if (result.error) {
      setError(result.error.message || 'Something went wrong. Please try again.')
      return
    }

    onClose()
  }

  function switchMode() {
    setMode(isSignUp ? 'signin' : 'signup')
    setError('')
  }

  return (
    <div className="fixed inset-0 z-20 flex items-start justify-center overflow-y-auto bg-dark/70 px-5 py-10">
      <div role="dialog" aria-modal="true" aria-labelledby="auth-title" className="w-full max-w-md rounded-md bg-white p-6 shadow-xl sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 id="auth-title" className="font-heading text-2xl leading-tight font-semibold text-dark">
            {isSignUp ? 'Create an account' : 'Sign in'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line text-xl leading-none text-dark transition-colors hover:border-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-5">
          {isSignUp && (
            <div>
              <label htmlFor="auth-name" className={labelClass}>Name</label>
              <input
                type="text"
                id="auth-name"
                autoComplete="name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={inputClass}
              />
            </div>
          )}
          <div>
            <label htmlFor="auth-email" className={labelClass}>Email</label>
            <input
              type="email"
              id="auth-email"
              autoComplete="email"
              required
              autoFocus
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="auth-password" className={labelClass}>Password</label>
            <input
              type="password"
              id="auth-password"
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClass}
            />
          </div>
          {error && (
            <p role="alert" className="rounded border border-line bg-cream px-3.5 py-3 text-sm text-dark">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded border border-gold bg-gold px-6 py-3.5 font-semibold tracking-wide text-dark transition-colors hover:bg-dark hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold disabled:cursor-wait disabled:opacity-60"
          >
            {loading ? 'Please wait...' : isSignUp ? 'Create account' : 'Sign in'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-muted">
          {isSignUp ? 'Already have an account?' : 'New to Saffron & Olive?'}{' '}
          <button
            type="button"
            onClick={switchMode}
            className="cursor-pointer rounded-sm font-semibold text-dark underline underline-offset-4 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            {isSignUp ? 'Sign in' : 'Create an account'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default AuthPanel
