import menu from '../data/menu'
import MenuItem from './MenuItem'

function Menu() {
  return (
    <section id="menu" className="scroll-mt-28 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="mb-6 font-heading text-[2rem] leading-tight font-semibold text-dark after:mt-4 after:block after:h-0.5 after:w-14 after:bg-gold">
          Our menu
        </h2>
        <p className="max-w-2xl leading-relaxed text-muted">
          A seasonal menu built for sharing, with dishes from the coasts of Lebanon, Greece, Turkey and Sicily.
        </p>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {menu.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Menu
