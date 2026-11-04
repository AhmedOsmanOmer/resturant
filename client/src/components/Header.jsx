const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#menu', label: 'Menu' },
  { href: '#contact', label: 'Contact' },
]

function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-dark-soft bg-dark">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-3.5 lg:py-5">
        <a href="#home" className="rounded-sm font-heading text-[1.35rem] font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
          Saffron & Olive
        </a>
        <nav>
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
    </header>
  )
}

export default Header
