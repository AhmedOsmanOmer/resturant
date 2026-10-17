import QuantityStepper from './QuantityStepper'

function MenuItem({ item, quantity, onQuantityChange }) {
  return (
    <li className="flex gap-4 rounded-md bg-white p-4 shadow-md shadow-dark/5">
      <img
        src={item.image}
        alt=""
        width="80"
        height="80"
        loading="lazy"
        className="size-20 shrink-0 rounded object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-heading text-[1.05rem] leading-snug font-semibold text-dark">{item.name}</h3>
          <span className="font-heading font-semibold whitespace-nowrap text-dark">€{item.price.toFixed(2)}</span>
        </div>
        <p className="mt-1 text-sm leading-normal text-muted">{item.description}</p>
        <div className="mt-auto flex justify-end pt-3">
          <QuantityStepper
            name={item.name}
            value={quantity}
            onChange={onQuantityChange}
            min={0}
            max={10}
          />
        </div>
      </div>
    </li>
  )
}

export default MenuItem
