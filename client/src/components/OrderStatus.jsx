import { useEffect, useState } from 'react'

const buttonClass = 'cursor-pointer rounded border border-dark px-4 py-2 text-sm font-semibold text-dark transition-colors hover:bg-dark hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold'

function formatPrice(cents) {
  return `€${(cents / 100).toFixed(2)}`
}

function OrderStatus({ orderId, setQuantities, onClose }) {
  const [status, setStatus] = useState('checking')
  const [order, setOrder] = useState(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let tries = 0
    let timer
    let stopped = false

    async function check() {
      tries = tries + 1
      try {
        const response = await fetch(`/api/orders/${orderId}`, { credentials: 'include' })
        if (stopped) {
          return
        }
        if ([400, 401, 404].includes(response.status)) {
          setStatus('notfound')
          return
        }
        if (!response.ok) {
          throw new Error('Request failed')
        }

        const data = await response.json()
        if (stopped) {
          return
        }
        setOrder(data)

        if (data.status === 'paid') {
          setStatus('paid')
          setQuantities({})
        } else if (data.status === 'cancelled') {
          setStatus('cancelled')
        } else if (tries < 5) {
          timer = setTimeout(check, 2000)
        } else {
          setStatus('pending')
        }
      } catch {
        if (!stopped) {
          setStatus('error')
        }
      }
    }

    check()

    return () => {
      stopped = true
      clearTimeout(timer)
    }
  }, [orderId, attempt, setQuantities])

  function checkAgain() {
    setStatus('checking')
    setAttempt(attempt + 1)
  }

  return (
    <div role="status" aria-live="polite" className="rounded-md bg-white p-6 shadow-md shadow-dark/5 sm:p-8">
      {status === 'checking' && (
        <>
          <h2 className="font-heading text-2xl font-semibold text-dark">Checking your payment...</h2>
          <p className="mt-2 text-muted">This only takes a moment.</p>
        </>
      )}

      {status === 'paid' && order && (
        <>
          <h2 className="font-heading text-2xl font-semibold text-dark">Thank you, your order is paid</h2>
          <p className="mt-2 text-muted">We have started preparing it. A receipt is on its way to your email.</p>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-baseline justify-between gap-4 py-3">
                <span className="min-w-0 text-dark">
                  {item.quantity} × {item.name}
                  <span className="block text-sm text-muted">{formatPrice(item.unit_price_cents)} each</span>
                </span>
                <span className="font-heading font-semibold whitespace-nowrap text-dark">
                  {formatPrice(item.unit_price_cents * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex justify-between font-heading text-lg font-semibold text-dark">
            <span>Total</span>
            <span>{formatPrice(order.total_cents)}</span>
          </p>
          <button type="button" onClick={onClose} className={`mt-6 ${buttonClass}`}>
            Back to the menu
          </button>
        </>
      )}

      {status === 'pending' && (
        <>
          <h2 className="font-heading text-2xl font-semibold text-dark">We are still confirming your payment</h2>
          <p className="mt-2 text-muted">This can take a little longer than usual. Your order is safe, please check again in a moment.</p>
          <button type="button" onClick={checkAgain} className={`mt-6 ${buttonClass}`}>
            Check again
          </button>
        </>
      )}

      {status === 'cancelled' && (
        <>
          <h2 className="font-heading text-2xl font-semibold text-dark">This order was cancelled</h2>
          <p className="mt-2 text-muted">No payment was taken. You can place a new order from the menu.</p>
          <button type="button" onClick={onClose} className={`mt-6 ${buttonClass}`}>
            Back to the menu
          </button>
        </>
      )}

      {status === 'notfound' && (
        <>
          <h2 className="font-heading text-2xl font-semibold text-dark">We could not find this order</h2>
          <p className="mt-2 text-muted">Please make sure you are signed in with the account you ordered with.</p>
          <button type="button" onClick={onClose} className={`mt-6 ${buttonClass}`}>
            Back to the menu
          </button>
        </>
      )}

      {status === 'error' && (
        <>
          <h2 className="font-heading text-2xl font-semibold text-dark">We could not check your order</h2>
          <p className="mt-2 text-muted">Something went wrong on our side. Please try again.</p>
          <button type="button" onClick={checkAgain} className={`mt-6 ${buttonClass}`}>
            Check again
          </button>
        </>
      )}
    </div>
  )
}

export default OrderStatus
