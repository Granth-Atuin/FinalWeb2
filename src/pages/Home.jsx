import { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import ProductCard from "../components/ProductCard"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorState from "../components/ErrorState"
import CategoryNav from "../components/CategoryNav"


export default function Home() {
	const [params] = useSearchParams()
	const q = (params.get("q") || "").toLowerCase()
	const { data: rawProducts, loading: loadingProducts } = useFetch(
		"https://ecommerce.fedegonzalez.com/products/"
	)
	const { data: rawCategories, loading: loadingCategories } = useFetch(
		"https://ecommerce.fedegonzalez.com/categories/"
	)

	const products = Array.isArray(rawProducts) ? rawProducts : []
	const categories = Array.isArray(rawCategories) ? rawCategories : []

	// Filtrar por busqueda si existe
	const filteredProducts = q
		? products.filter(
			(p) =>
				p.title.toLowerCase().includes(q) ||
				(p.description || "").toLowerCase().includes(q)
		)
		: products

	// Si busca, mostrar grilla. Si no, mostrar filas categorizadas.
	if (q) {
		return (
			<section className="space-y-6 px-4 sm:px-6 py-6 sm:py-8">
				<h1 className="text-xl sm:text-2xl font-bold text-white">Resultados para "{q}"</h1>
				<h1 className="text-xl sm:text-2xl font-bold text-white">Resultados para "{q}"</h1>
				{loadingProducts ? (
					<LoadingSpinner />
				) : (
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
						{filteredProducts.map((p) => (
							<ProductCard key={p.id} product={p} />
						))}
					</div>
				)}
				{!loadingProducts && filteredProducts.length === 0 && (
					<ErrorState message={`No encontramos productos que coincidan con "${q}"`} />
				)}
			</section>
		)
	}

	// Helper para obtener productos por categoria
	const getCategoryProducts = (catId) => products.filter(p => p.category_id === catId)

	// Logica de destacados
	let featured = products.filter(p => p.tags && p.tags.includes('destacados'))

	// Respaldo si no hay destacados
	if (featured.length === 0 && categories.length > 0 && products.length > 0) {
		const discounts = [50, 30, 20]

		// Iterar categorias para encontrar top 3 de cada una
		for (const cat of categories) {
			const catProducts = getCategoryProducts(cat.id)

			// Tomar hasta 3 productos
			for (let i = 0; i < Math.min(catProducts.length, 3); i++) {
				const product = { ...catProducts[i], discount: discounts[i] }
				featured.push(product)
			}
		}

		// Ordenar por descuento descendente
		featured.sort((a, b) => b.discount - a.discount)
	}

	return (
		<section className="space-y-6 sm:space-y-8 pb-12">
			{/* Seccion Destacados */}
			{featured.length > 0 && (
				<div className="px-4 sm:px-6 py-6 sm:py-8 bg-gradient-to-b from-purple-900/20 to-transparent">
					<h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
						<span className="text-yellow-500">★</span> Destacados
					</h2>
					<div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x -mx-4 sm:mx-0 px-4 sm:px-0">
						{featured.map((p, index) => (
							<div key={`${p.id}-${index}`} className="snap-start shrink-0">
								<ProductCard product={p} />
							</div>
						))}
					</div>
				</div>
			)}

			{/* Filas de Categorias */}
			<div className="px-4 sm:px-6 space-y-6 sm:space-y-8">
				{categories.map(cat => {
					const catProducts = getCategoryProducts(cat.id)
					if (catProducts.length === 0) return null

					return (
						<div key={cat.id} id={`category-${cat.id}`} className="scroll-mt-24">
							<div className="flex justify-between items-end mb-3 sm:mb-4">
								<h2 className="text-lg sm:text-xl font-bold text-white capitalize">{cat.title}</h2>
								<Link to={`/categoria/${cat.id}`} className="text-sm text-purple-400 hover:text-purple-300">
									Ver todo
								</Link>
							</div>
							<div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x -mx-4 sm:mx-0 px-4 sm:px-0">
								{catProducts.map(p => (
									<div key={p.id} className="snap-start shrink-0">
										<ProductCard product={p} />
									</div>
								))}
							</div>
						</div>
					)
				})}
			</div>

			<CategoryNav categories={categories} />

			{loadingProducts && <LoadingSpinner />}
			{!loadingProducts && products.length === 0 && <ErrorState />}
		</section>
	)
}
