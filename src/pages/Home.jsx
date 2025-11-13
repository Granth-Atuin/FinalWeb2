import { useSearchParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import ProductCard from "../components/ProductCard"

export default function Home() {
	const [params] = useSearchParams()
	const q = (params.get("q") || "").toLowerCase()
	const { data: rawProducts, loading } = useFetch(
		"https://ecommerce.fedegonzalez.com/products"
	)
	const products = Array.isArray(rawProducts) ? rawProducts : []
	const filtered = q
		? products.filter(
				(p) =>
					p.title.toLowerCase().includes(q) ||
					(p.description || "").toLowerCase().includes(q)
		)
		: products
	return (
		<section className="space-y-6">
			<div className="flex items-baseline justify-between">
				<h1 className="text-xl font-semibold">Productos</h1>
			</div>
			{loading && <div className="text-sm">Cargando productos...</div>}
			{!loading && filtered.length === 0 && (
				<div className="text-sm text-gray-600">
					No se encontraron productos.
				</div>
			)}
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
				{filtered.map((p) => (
					<ProductCard key={p.id} product={p} />
				))}
			</div>
		</section>
	)
}
