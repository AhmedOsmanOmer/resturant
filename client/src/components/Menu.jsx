import { useEffect, useState } from 'react'
import { authClient } from '../lib/authClient'
import MenuItem from './MenuItem'
import OrderStatus from './OrderStatus'

const categories = ['All', 'Starters', 'Mains', 'Desserts']

function readCheckout() {
  const params = new URLSearchParams(window.location.search)
  const result = params.get('checkout')
  if (result === 'success' && params.get('order')) {
    return { type: 'success', orderId: params.get('order') }
  }
  if (result === 'cancelled') {
    return { type: 'cancelled' }
  }
  return null
}

function Menu({ onSignIn }) {
  const { data: session } = authClient.useSession()
  const [menu, setMenu] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [category, setCategory] = useState('All')
  const [quantities, setQuantities] = useState({})
  const [ordering, setOrdering] = useState(false)
  const [orderError, setOrderError] = useState('')
  const [checkout, setCheckout] = useState(readCheckout)

  useEffect(() => {
    async function loadMenu() {
      try {
        const response = await fetch('/api/menu')
        if (!response.ok) {
          throw new Error('Request failed')
        }
        setMenu(await response.json())
      } catch {
        setError('We could not load the menu right now. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    loadMenu()
  }, [])

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('checkout')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.hash)
    }
  }, [])

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

  async function placeOrder() {
    if (!session) {
      onSignIn()
      return
    }

    setOrderError('')
    setOrdering(true)

    const items = Object.keys(quantities)
      .map((id) => ({ id: Number(id), quantity: quantities[id] }))
      .filter((item) => item.quantity > 0)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ items }),
      })
      const data = await response.json()

      if (response.status === 401) {
        setOrdering(false)
        onSignIn()
        return
      }

      if (!response.ok) {
        setOrderError(data.error || 'We could not start your order. Please try again.')
        setOrdering(false)
        return
      }

      window.location.href = data.url
    } catch {
      setOrderError('We could not reach the restaurant. Please check your connection and try again.')
      setOrdering(false)
    }
  }

  return (
    <section id="menu" className="scroll-mt-32 py-16 lg:scroll-mt-24 lg:py-24">
      <div className="mx-auto max-w-6xl px-5">
        {checkout && checkout.type === 'success' && (
          <OrderStatus orderId={checkout.orderId} setQuantities={setQuantities} onClose={() => setCheckout(null)} />
        )}
        {checkout && checkout.type === 'cancelled' && (
          <div role="status" className="rounded-md bg-white p-6 shadow-md shadow-dark/5 sm:p-8">
            <h2 className="font-heading text-2xl font-semibold text-dark">Payment cancelled</h2>
            <p className="mt-2 text-muted">No money was taken. You can change your order and try again whenever you like.</p>
            <button
              type="button"
              onClick={() => setCheckout(null)}
              className="mt-6 cursor-pointer rounded border border-dark px-4 py-2 text-sm font-semibold text-dark transition-colors hover:bg-dark hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold"
            >
              Back to the menu
            </button>
          </div>
        )}
        {!checkout && (
          <>
            <h2 className="mb-6 font-heading text-[2rem] leading-tight font-semibold text-dark after:mt-4 after:block after:h-0.5 after:w-14 after:bg-gold">
              Our menu
            </h2>
            <p className="max-w-2xl leading-relaxed text-muted">
              A seasonal menu built for sharing, with dishes from the coasts of Lebanon, Greece, Turkey and Sicily.
            </p>
          </>
        )}
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
        {loading && (
          <p role="status" className="mt-8 text-muted">
            Loading the menu...
          </p>
        )}
        {error && (
          <p role="alert" className="mt-8 rounded-md border border-line bg-white px-5 py-4 text-dark">
            {error}
          </p>
        )}
        {!loading && !error && (
          <>
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
            <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-md bg-dark px-5 py-4 text-cream">
              <div aria-live="polite" className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                <p>
                  Your order: {count} {count === 1 ? 'item' : 'items'}
                </p>
                <p className="font-heading text-lg font-semibold text-gold">Total: €{total.toFixed(2)}</p>
              </div>
              <button
                type="button"
                onClick={placeOrder}
                disabled={count === 0 || ordering}
                className="w-full cursor-pointer rounded border border-gold bg-gold px-6 py-3 font-semibold tracking-wide text-dark transition-colors hover:bg-cream hover:border-cream focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gold disabled:hover:bg-gold sm:w-auto"
              >
                {ordering ? 'Starting checkout...' : 'Order now'}
              </button>
            </div>
            {orderError && (
              <p role="alert" className="mt-4 rounded-md border border-line bg-white px-5 py-4 text-dark">
                {orderError}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default Menu
