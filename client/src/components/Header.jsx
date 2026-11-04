import { useState } from 'react'
import { authClient } from '../lib/authClient'
import AuthPanel from './AuthPanel'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#menu', label: 'Menu' },
  { href: '#contact', label: 'Contact' },
]

function Header() {
  const [showAuth, setShowAuth] = useState(false)
  const { data: session, isPending } = authClient.useSession()

  return (
    <header className="sticky top-0 z-10 border-b border-dark-soft bg-dark">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-3 gap-y-2 px-5 sm:gap-x-6 py-3.5 lg:py-5">
        <a href="#home" className="rounded-sm font-heading text-[1.15rem] font-bold text-white sm:text-[1.35rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
          Saffron & Olive
        </a>
        <div className="flex min-h-8 items-center gap-2 sm:gap-3 lg:order-last">
          {!isPending && session && (
            <>
              <span title={session.user.name} className="max-w-16 truncate text-xs text-cream sm:max-w-40 sm:text-sm">{session.user.name}</span>
              <button
                type="button"
                onClick={() => authClient.signOut()}
                className="cursor-pointer rounded border border-cream px-2.5 py-1 text-sm sm:px-3 font-semibold text-cream transition-colors hover:bg-cream hover:text-dark focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold"
              >
                Sign out
              </button>
            </>
          )}
          {!isPending && !session && (
            <button
              type="button"
              onClick={() => setShowAuth(true)}
              className="cursor-pointer rounded border border-cream px-2.5 py-1 text-sm sm:px-3 font-semibold text-cream transition-colors hover:bg-cream hover:text-dark focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold"
            >
              Sign in
            </button>
          )}
        </div>
        <nav className="w-full lg:w-auto">
          <ul className="flex flex-wrap items-center gap-x-3.5 gap-y-2 lg:gap-x-8">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="rounded-sm text-sm font-medium text-cream transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#reservation" className="inline-block rounded border border-gold bg-gold px-3.5 py-1.5 text-sm font-semibold tracking-wide text-dark transition-colors hover:bg-dark hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold">
                Reserve
              </a>
            </li>
          </ul>
        </nav>
      </div>
      {showAuth && <AuthPanel onClose={() => setShowAuth(false)} />}
    </header>
  )
}

export default Header
