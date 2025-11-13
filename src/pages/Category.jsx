import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import ProductCard from "../components/ProductCard"

export default function Category() {
	const { id } = useParams()
	const { data: category, loading: loadingCategory } = useFetch(
		`https://ecommerce.fedegonzalez.com/categories/${id}`
	)
	const { data: rawProducts, loading: loadingProducts } = useFetch(
		`https://ecommerce.fedegonzalez.com/products?category_id=${id}`
	)
	const products = Array.isArray(rawProducts) ? rawProducts : []
	return (
		<section className="space-y-6">
			<h1 className="text-xl font-semibold">
				{loadingCategory
					? "Cargando categoría..."
					: category
					? category.title
					: "Categoría"}
			</h1>
			{loadingProducts && (
				<div className="text-sm">Cargando productos...</div>
			)}
			{!loadingProducts && products.length === 0 && (
				<div className="text-sm text-gray-600">
					No hay productos en esta categoría.
				</div>
			)}
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
				{products.map((p) => (
					<ProductCard key={p.id} product={p} />
				))}
			</div>
		</section>
	)
}
