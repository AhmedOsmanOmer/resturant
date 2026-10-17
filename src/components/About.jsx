const facts = [
  { value: '2015', label: 'Opened' },
  { value: '100%', label: 'Local produce' },
  { value: 'Wood-fired', label: 'Kitchen' },
]

function About() {
  return (
    <section id="about" className="scroll-mt-28 py-16 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="mb-6 font-heading text-[2rem] leading-tight font-semibold text-dark after:mt-4 after:block after:h-0.5 after:w-14 after:bg-gold">
            Our story
          </h2>
          <p className="mb-4 leading-relaxed">
            Saffron & Olive opened in 2015 on a quiet corner of Prenzlauer Berg, founded by a Lebanese chef and a Sicilian baker who wanted to cook the food they grew up with.
          </p>
          <p className="leading-relaxed">
            Every morning we bake our bread in a wood-fired oven, buy vegetables from farms in Brandenburg and prepare each sauce by hand. The menu changes with the seasons, but the welcome stays the same.
          </p>
          <ul className="mt-8 grid grid-cols-3 gap-3">
            {facts.map((fact) => (
              <li key={fact.label} className="rounded-md bg-dark px-2 py-4 text-center sm:py-5">
                <strong className="block font-heading text-lg leading-tight text-gold sm:text-2xl">{fact.value}</strong>
                <span className="mt-1.5 block text-xs tracking-wider text-cream uppercase">{fact.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <img
          src="/images/about.jpg"
          alt="Our chef adding fresh basil to a plated dish in the kitchen"
          width="900"
          height="600"
          loading="lazy"
          className="aspect-4/3 w-full rounded-md object-cover shadow-xl shadow-dark/20 sm:aspect-video lg:aspect-4/3"
        />
      </div>
    </section>
  )
}

export default About
