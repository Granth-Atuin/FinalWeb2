import { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import ProductCard from "../components/ProductCard"
import { getCategories } from "../services/categoryService"

export default function Home() {
	const [params] = useSearchParams()
	const q = (params.get("q") || "").toLowerCase()
	const { data: rawProducts, loading: loadingProducts } = useFetch(
		"https://ecommerce.fedegonzalez.com/products/"
	)
	const [categories, setCategories] = useState([])

	useEffect(() => {
		getCategories().then(setCategories).catch(console.error)
	}, [])

	const products = Array.isArray(rawProducts) ? rawProducts : []

	// Filter by search query if present
	const filteredProducts = q
		? products.filter(
			(p) =>
				p.title.toLowerCase().includes(q) ||
				(p.description || "").toLowerCase().includes(q)
		)
		: products

	// If searching, show grid. If not, show categorized rows.
	if (q) {
		return (
			<section className="space-y-6 px-6 py-8">
				<h1 className="text-2xl font-bold text-white">Resultados para "{q}"</h1>
				{loadingProducts && <div className="text-sm text-gray-400">Cargando...</div>}
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
					{filteredProducts.map((p) => (
						<ProductCard key={p.id} product={p} />
					))}
				</div>
				{!loadingProducts && filteredProducts.length === 0 && (
					<div className="text-gray-500">No se encontraron productos.</div>
				)}
			</section>
		)
	}

	// Helper to get products for a category
	const getCategoryProducts = (catId) => products.filter(p => p.category_id === catId)

	// Featured Logic
	let featured = products.filter(p => p.tags && p.tags.includes('destacados'))

	// Fallback if no featured products
	if (featured.length === 0 && categories.length > 0 && products.length > 0) {
		const discounts = [50, 30, 20]

		// Iterate categories to find top 3 products from each
		for (const cat of categories) {
			const catProducts = getCategoryProducts(cat.id)

			// Take up to 3 products
			for (let i = 0; i < Math.min(catProducts.length, 3); i++) {
				const product = { ...catProducts[i], discount: discounts[i] }
				featured.push(product)
			}
		}

		// Sort by discount descending
		featured.sort((a, b) => b.discount - a.discount)
	}

	return (
		<section className="space-y-8 pb-12">
			{/* Hero / Featured Section */}
			{featured.length > 0 && (
				<div className="px-6 py-8 bg-gradient-to-b from-purple-900/20 to-transparent">
					<h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
						<span className="text-yellow-500">★</span> Destacados
					</h2>
					<div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
						{featured.map((p, index) => (
							<div key={`${p.id}-${index}`} className="snap-start">
								<ProductCard product={p} />
							</div>
						))}
					</div>
				</div>
			)}

			{/* Categories Rows */}
			<div className="px-6 space-y-8">
				{categories.map(cat => {
					const catProducts = getCategoryProducts(cat.id)
					if (catProducts.length === 0) return null

					return (
						<div key={cat.id}>
							<div className="flex justify-between items-end mb-4">
								<h2 className="text-xl font-bold text-white capitalize">{cat.title}</h2>
								<Link to={`/categoria/${cat.id}`} className="text-sm text-purple-400 hover:text-purple-300">
									Ver todo
								</Link>
							</div>
							<div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
								{catProducts.map(p => (
									<div key={p.id} className="snap-start">
										<ProductCard product={p} />
									</div>
								))}
							</div>
						</div>
					)
				})}
			</div>

			{loadingProducts && <div className="px-6 text-sm text-gray-400">Cargando productos...</div>}
		</section>
	)
}
