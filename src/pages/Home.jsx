import { useState, useEffect, useMemo } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { getProducts } from "../services/productService"
import { getCategories } from "../services/categoryService"
import ProductCard from "../components/ProductCard"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorState from "../components/ErrorState"


export default function Home() {
	const [params] = useSearchParams()
	const q = (params.get("q") || "").toLowerCase()
	const categoryId = params.get("category")

	// Sort State
	const [sortOrder, setSortOrder] = useState("default")

	const [products, setProducts] = useState([])
	const [categories, setCategories] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		Promise.all([getProducts(), getCategories()])
			.then(([productsData, categoriesData]) => {
				setProducts(Array.isArray(productsData) ? productsData : [])
				setCategories(Array.isArray(categoriesData) ? categoriesData : [])
			})
			.catch(err => console.error(err))
			.finally(() => setLoading(false))
	}, [])

	const { featured, categoriesWithProducts, allFilteredProducts } = useMemo(() => {
		if (products.length === 0 || categories.length === 0) return { featured: [], categoriesWithProducts: [], allFilteredProducts: [] }

		// 1. Calcular descuentos automaticos (Frontend override)
		// Regla: 1er producto de cada categoria = 50%, 2do = 25%
		const productDiscounts = {}
		const featuredProducts = []

		for (const cat of categories) {
			// Obtener productos de esta categoria
			const catProducts = products.filter(p => p.category_id == cat.id)

			// Aplicar reglas
			if (catProducts[0]) {
				productDiscounts[catProducts[0].id] = 50
				featuredProducts.push({ ...catProducts[0], discount: 50, isAutoFeatured: true })
			}
			if (catProducts[1]) {
				productDiscounts[catProducts[1].id] = 25
				featuredProducts.push({ ...catProducts[1], discount: 25, isAutoFeatured: true })
			}
		}

		// 2. Aplicar descuentos a TODOS los productos para visualizacion
		const allProductsWithDiscounts = products.map(p => {
			// A. Descuento Manual (Tags)
			let manualDiscount = 0
			if (p.tags) {
				const discountTag = p.tags.find(t => t.title.toLowerCase().startsWith("descuento_"))
				if (discountTag) {
					const val = parseInt(discountTag.title.split("_")[1])
					if (!isNaN(val)) manualDiscount = val
				}
			}

			// B. Descuento Automatico (Fallback)
			const autoDiscount = productDiscounts[p.id] || 0

			// Prioridad: Manual > Auto > DB > 0
			const finalDiscount = manualDiscount > 0 ? manualDiscount : (autoDiscount > 0 ? autoDiscount : (p.discount || 0))

			return {
				...p,
				discount: finalDiscount,
			}
		})

		// 3. Filtrar por busqueda y categoria
		let filtered = allProductsWithDiscounts.filter((p) => {
			const matchesSearch = q
				? p.title.toLowerCase().includes(q) || (p.description || "").toLowerCase().includes(q)
				: true

			let matchesCategory = true
			if (categoryId) {
				const selectedCat = categories.find(c => c.id == categoryId)
				matchesCategory = p.category_id == categoryId ||
					(selectedCat && p.category && p.category.title === selectedCat.title)
			}

			return matchesSearch && matchesCategory
		})

		// 4. Ordenar (Sorting)
		if (sortOrder !== "default") {
			filtered.sort((a, b) => {
				switch (sortOrder) {
					case "price-asc": return a.price - b.price
					case "price-desc": return b.price - a.price
					case "alpha-asc": return a.title.localeCompare(b.title)
					case "alpha-desc": return b.title.localeCompare(a.title)
					default: return 0
				}
			})
		}

		// 5. Logica de destacados Final
		// Si hay busqueda o filtro, no mostramos el carrusel de destacados (se ve la grilla)
		// Pero la variable 'featured' se usa para el carrusel principal.
		// Combinamos los destacados automaticos con los manuales (tags)

		// Manuales (DB tags)
		const manualFeatured = allProductsWithDiscounts.filter(p =>
			p.tags && (p.tags.some(t => t.title === "destacado") || p.tags.includes("destacado"))
		)

		// Unir y desduplicar
		const combinedFeatured = [...featuredProducts]
		manualFeatured.forEach(p => {
			if (!combinedFeatured.find(f => f.id === p.id)) {
				combinedFeatured.push(p)
			}
		})

		// Ordenar destacados por descuento siempre
		combinedFeatured.sort((a, b) => b.discount - a.discount)

		return {
			featured: combinedFeatured,
			allFilteredProducts: filtered,
			categoriesWithProducts: categories.map(cat => ({
				...cat,
				products: filtered.filter(p => {
					return p.category_id == cat.id || (p.category && p.category.title === cat.title)
				})
			}))
		}
	}, [products, categories, q, categoryId, sortOrder])

	const isFiltering = q || categoryId

	return (
		<section className="space-y-6 sm:space-y-8 pb-12">
			{/* Vista de Filtros Activos (Grid) */}
			{isFiltering && (
				<div className="px-4 sm:px-6">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
						<h2 className="text-xl sm:text-2xl font-bold text-white capitalize">
							{categoryId
								? categories.find(c => c.id == categoryId)?.title || "Productos"
								: `Resultados para "${q}"`
							}
						</h2>

						<select
							value={sortOrder}
							onChange={(e) => setSortOrder(e.target.value)}
							className="bg-zinc-800 text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
						>
							<option value="default">Ordenar por...</option>
							<option value="price-asc">Precio: Menor a Mayor</option>
							<option value="price-desc">Precio: Mayor a Menor</option>
							<option value="alpha-asc">A-Z</option>
							<option value="alpha-desc">Z-A</option>
						</select>
					</div>

					{allFilteredProducts.length > 0 ? (
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
							{allFilteredProducts.map(p => (
								<ProductCard key={p.id} product={p} />
							))}
						</div>
					) : (
						<div className="text-center py-12 text-gray-500">
							No se encontraron productos.
						</div>
					)}
				</div>
			)}

			{/* Vista Default (Carruseles) */}
			{!isFiltering && (
				<>
					{/* Seccion Destacados */}
					{featured.length > 0 && (
						<div className="px-4 sm:px-6 py-6 sm:py-8 bg-gradient-to-b from-purple-900/20 to-transparent">
							<h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
								<span className="text-yellow-500">★</span> Destacados
							</h2>
							<div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 snap-x -mx-4 sm:mx-0 px-4 sm:px-0">
								{featured.map((p, index) => (
									<div key={`${p.id}-${index}`} className="snap-start shrink-0 w-[180px]">
										<ProductCard product={p} />
									</div>
								))}
							</div>
						</div>
					)}

					{/* Filas de Categorias */}
					<div className="px-4 sm:px-6 space-y-6 sm:space-y-8">
						{categoriesWithProducts.map(cat => {
							if (cat.products.length === 0) return null

							return (
								<div key={cat.id} id={`category-${cat.id}`} className="scroll-mt-24">
									<div className="flex justify-between items-end mb-3 sm:mb-4">
										<h2 className="text-lg sm:text-xl font-bold text-white capitalize">{cat.title}</h2>
										<Link to={`/categoria/${cat.id}`} className="text-sm text-purple-400 hover:text-purple-300">
											Ver todo
										</Link>
									</div>
									<div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 snap-x -mx-4 sm:mx-0 px-4 sm:px-0">
										{cat.products.map(p => (
											<div key={p.id} className="snap-start shrink-0 w-[180px]">
												<ProductCard product={p} />
											</div>
										))}
									</div>
								</div>
							)
						})}
					</div>

				</>
			)}

			{loading && <LoadingSpinner />}
			{!loading && products.length === 0 && <ErrorState />}
		</section>
	)
}
