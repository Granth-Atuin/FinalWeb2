import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import ProductCard from '../components/ProductCard'

export default function Category() {
const { id } = useParams()

const { data: categoria } = useFetch(
`http://161.35.104.211:8000/categorias/${id}`
)

const { data: productos, loading } = useFetch(
`http://161.35.104.211:8000/categorias/${id}/productos`
)

return (
<section className="space-y-6">
<h1 className="text-xl font-semibold">{categoria?.nombre}</h1>
{loading && <div className="text-sm">Cargando...</div>}


<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
{productos?.map((p) => (
<ProductCard key={p.id} product={p} />
))}
</div>
</section>
)
}