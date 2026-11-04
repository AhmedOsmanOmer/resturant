const hours = [
  'Monday: closed',
  'Tuesday to Thursday: 17:00 – 22:30',
  'Friday and Saturday: 17:00 – 23:30',
  'Sunday: 12:00 – 21:00',
]

function Footer() {
  return (
    <footer id="contact" className="bg-dark pt-16 text-[0.95rem] text-cream">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="mb-4 font-heading text-lg font-semibold text-gold">Opening hours</h2>
            <ul className="space-y-1.5">
              {hours.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 font-heading text-lg font-semibold text-gold">Location</h2>
            <address className="leading-relaxed not-italic">
              Saffron & Olive<br />
              Kastanienallee 48<br />
              10119 Berlin, Germany
            </address>
          </div>
          <div>
            <h2 className="mb-4 font-heading text-lg font-semibold text-gold">Contact</h2>
            <ul className="space-y-1.5">
              <li>
                <a href="tel:+493044012345" className="rounded-sm transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
                  +49 30 4401 2345
                </a>
              </li>
              <li>
                <a href="mailto:hello@saffronandolive.de" className="rounded-sm transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
                  hello@saffronandolive.de
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-dark-soft py-6 text-sm">
          <p>© 2026 Saffron & Olive. All rights reserved.</p>
          <p>Mediterranean kitchen in Berlin</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
