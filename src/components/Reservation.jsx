const labelClass = 'mb-1.5 block text-sm font-semibold text-dark'
const inputClass = 'w-full rounded border border-line bg-cream px-3.5 py-3 text-ink transition-colors hover:border-muted focus-visible:border-gold focus-visible:bg-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gold'

function Reservation() {
  return (
    <section id="reservation" className="scroll-mt-28 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="mb-6 font-heading text-[2rem] leading-tight font-semibold text-dark after:mt-4 after:block after:h-0.5 after:w-14 after:bg-gold">
          Reserve a table
        </h2>
        <p className="leading-relaxed text-muted">
          Book online and we will confirm your table by email within a few hours.
        </p>
        <form action="#" method="get" className="mt-8 grid gap-5 rounded-md bg-white p-6 shadow-md shadow-dark/5 sm:grid-cols-2 sm:p-8">
          <div>
            <label htmlFor="name" className={labelClass}>Full name</label>
            <input type="text" id="name" name="name" autoComplete="name" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>Email</label>
            <input type="email" id="email" name="email" autoComplete="email" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>Phone</label>
            <input type="tel" id="phone" name="phone" autoComplete="tel" className={inputClass} />
          </div>
          <div>
            <label htmlFor="date" className={labelClass}>Date</label>
            <input type="date" id="date" name="date" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="time" className={labelClass}>Time</label>
            <input type="time" id="time" name="time" min="12:00" max="22:00" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="guests" className={labelClass}>Number of guests</label>
            <input type="number" id="guests" name="guests" min="1" max="12" defaultValue="2" required className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="notes" className={labelClass}>Notes</label>
            <textarea id="notes" name="notes" rows="4" placeholder="Allergies, high chair, a special occasion..." className={`${inputClass} resize-y`} />
          </div>
          <button type="submit" className="w-full cursor-pointer rounded border border-gold bg-gold px-6 py-3.5 font-semibold tracking-wide text-dark transition-colors hover:bg-dark hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold sm:col-span-2 sm:w-auto sm:justify-self-start">
            Request reservation
          </button>
        </form>
      </div>
    </section>
  )
}

export default Reservation
