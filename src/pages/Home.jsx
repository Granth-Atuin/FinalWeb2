import { useSearchParams, Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import ProductCard from '../components/ProductCard'

export default function Home() {
const [params] = useSearchParams()
const q = params.get('q') || ''

const { data: productos, loading } = useFetch(
q
? `http://161.35.104.211:8000/productos?search=${encodeURIComponent(q)}`
: 'http://161.35.104.211:8000/productos'
)

const { data: categorias } = useFetch(
'http://161.35.104.211:8000/categorias'
)

return (
<section className="space-y-6">
<div className="flex items-baseline justify-between">
<h1 className="text-xl font-semibold">Productos</h1>
{q && <span className="text-sm text-gray-600">Resultados para "{q}"</span>}
</div>

{loading && <div className="text-sm">Cargando...</div>}

<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
{productos?.map((p) => (
<ProductCard key={p.id} product={p} />
))}
</div>

<div className="pt-6 border-t">
<h2 className="text-lg font-medium mb-3">Categorías</h2>
<div className="flex flex-wrap gap-2">
{categorias?.map((c) => (
<Link
key={c.id}
to={`/categoria/${c.id}`}
className="text-sm px-3 py-1 rounded border bg-white"
>
{c.nombre}
</Link>
))}
</div>
</div>
</section>
)
}