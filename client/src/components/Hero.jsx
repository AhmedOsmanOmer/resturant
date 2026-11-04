function Hero() {
  return (
    <section id="home" className="bg-dark bg-[url(/images/hero.jpg)] bg-cover bg-center text-center text-cream">
      <div className="flex min-h-[85vh] items-center bg-linear-to-b from-dark/55 to-dark/85 py-24 lg:py-32">
        <div className="mx-auto w-full max-w-6xl px-5">
          <h1 className="mb-4 font-heading text-[2.6rem] leading-tight font-bold text-white sm:text-[3.4rem] lg:text-7xl">
            Saffron & Olive
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed lg:text-xl">
            Slow-cooked Mediterranean dishes, wood-fired bread and natural wines in the heart of Berlin.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#reservation" className="inline-block rounded border border-gold bg-gold px-6 py-3 font-semibold tracking-wide text-dark transition-colors hover:bg-dark hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold">
              Reserve a table
            </a>
            <a href="#menu" className="inline-block rounded border border-cream px-6 py-3 font-semibold tracking-wide text-cream transition-colors hover:bg-cream hover:text-dark focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold">
              View the menu
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
