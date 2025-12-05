import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getCategory } from "../services/categoryService"
import { getProducts } from "../services/productService"
import ProductCard from "../components/ProductCard"

export default function Category() {
	const { id } = useParams()
	const [category, setCategory] = useState(null)
	const [products, setProducts] = useState([])
	const [loadingCategory, setLoadingCategory] = useState(true)
	const [loadingProducts, setLoadingProducts] = useState(true)

	useEffect(() => {
		setLoadingCategory(true)
		getCategory(id)
			.then(setCategory)
			.catch(console.error)
			.finally(() => setLoadingCategory(false))
	}, [id])

	useEffect(() => {
		setLoadingProducts(true)
		getProducts()
			.then(data => {
				const all = Array.isArray(data) ? data : []
				setProducts(all.filter(p => p.category_id == id))
			})
			.catch(console.error)
			.finally(() => setLoadingProducts(false))
	}, [id])
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
