import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { useCart } from '../store/cart'
import QuantityPicker from '../components/QuantityPicker'
import { useState } from 'react'

export default function Product() {
const { id } = useParams()
const { data: p, loading } = useFetch(
`http://161.35.104.211:8000/productos/${id}`
)

const { add } = useCart()
const [qty, setQty] = useState(1)

if (loading) return <div className="text-sm">Cargando...</div>
if (!p) return <div className="text-sm">Producto no encontrado</div>

return (
<section className="grid gap-6 md:grid-cols-2">
<div className="aspect-square rounded bg-gray-100" />

<div className="space-y-4">
<h1 className="text-2xl font-semibold">{p.nombre}</h1>
<p className="text-gray-700">{p.descripcion}</p>
<div className="text-2xl font-bold">${Number(p.precio).toFixed(2)}</div>

<QuantityPicker value={qty} onChange={setQty} />

<button
className="bg-blue-600 text-white px-4 py-2 rounded"
onClick={() => add(p, qty)}
>
Agregar al carrito
</button>
</div>
</section>
)
}