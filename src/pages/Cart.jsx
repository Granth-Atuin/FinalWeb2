import { useCart } from '../store/cart'
import QuantityPicker from '../components/QuantityPicker'

export default function Cart() {
  const { items, total, update, remove, clear } = useCart()
  if (!items.length) {
    return (
      <section className="space-y-3">
        <h1 className="text-xl font-semibold">Carrito</h1>
        <p className="text-sm">Tu carrito está vacío.</p>
      </section>
    )
  }
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Carrito</h1>
        <button
          type="button"
          className="text-sm px-3 py-1 border rounded"
          onClick={clear}
        >
          Vaciar
        </button>
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="bg-white border rounded p-3 flex items-center gap-4"
          >
            <div className="w-16 h-16 rounded bg-gray-100" />
            <div className="flex-1">
              <div className="font-medium">{item.nombre}</div>
              <div className="text-sm text-gray-600">
                ${Number(item.precio).toFixed(2)}
              </div>
            </div>
            <QuantityPicker
              value={item.qty}
              onChange={(qty) => update(item.id, qty)}
            />

            <button
              type="button"
              onClick={() => remove(item.id)}
              className="text-sm px-3 py-1 border rounded"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <div className="text-right text-lg font-semibold">
        Total: ${total.toFixed(2)}
      </div>
      <div className="text-right">
        <button
          type="button"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Continuar compra
        </button>
      </div>
    </section>
  )
}
