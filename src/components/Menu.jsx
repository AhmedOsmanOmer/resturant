import { useState } from 'react'
import menu from '../data/menu'
import MenuItem from './MenuItem'

const categories = ['All', 'Starters', 'Mains', 'Desserts']

function Menu() {
  const [category, setCategory] = useState('All')
  const [quantities, setQuantities] = useState({})

  const items = category === 'All' ? menu : menu.filter((item) => item.category === category)

  function changeQuantity(id, value) {
    setQuantities({ ...quantities, [id]: value })
  }

  let count = 0
  let total = 0
  menu.forEach((item) => {
    const quantity = quantities[item.id] || 0
    count = count + quantity
    total = total + quantity * item.price
  })

  return (
    <section id="menu" className="scroll-mt-28 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="mb-6 font-heading text-[2rem] leading-tight font-semibold text-dark after:mt-4 after:block after:h-0.5 after:w-14 after:bg-gold">
          Our menu
        </h2>
        <p className="max-w-2xl leading-relaxed text-muted">
          A seasonal menu built for sharing, with dishes from the coasts of Lebanon, Greece, Turkey and Sicily.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={category === name}
              onClick={() => setCategory(name)}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                category === name
                  ? 'border-dark bg-dark text-gold'
                  : 'border-line bg-white text-dark hover:border-gold'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              quantity={quantities[item.id] || 0}
              onQuantityChange={(value) => changeQuantity(item.id, value)}
            />
          ))}
        </ul>
        <div aria-live="polite" className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 rounded-md bg-dark px-5 py-4 text-cream">
          <p>
            Your order: {count} {count === 1 ? 'item' : 'items'}
          </p>
          <p className="font-heading text-lg font-semibold text-gold">Total: €{total.toFixed(2)}</p>
        </div>
      </div>
    </section>
  )
}

export default Menu
