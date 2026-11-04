const buttonClass = 'flex size-8 cursor-pointer items-center justify-center rounded-full border border-line bg-cream text-lg leading-none text-dark transition-colors hover:border-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line'

function QuantityStepper({ name, value, onChange, min, max }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label={`Remove one ${name}`}
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className={buttonClass}
      >
        −
      </button>
      <span aria-live="polite" className="w-6 text-center font-semibold text-dark">
        {value}
      </span>
      <button
        type="button"
        aria-label={`Add one ${name}`}
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className={buttonClass}
      >
        +
      </button>
    </div>
  )
}

export default QuantityStepper
