import { useState, useEffect } from "react"
import { getProducts, deleteProduct } from "../services/productService"
import { Link } from "react-router-dom"

import { useSearchParams } from "react-router-dom"

export default function Products() {
	const [searchParams] = useSearchParams()
	const q = (searchParams.get("q") || "").toLowerCase()
	const [sortOrder, setSortOrder] = useState('id-asc')

	const [rawProducts, setRawProducts] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		getProducts()
			.then(data => setRawProducts(Array.isArray(data) ? data : []))
			.catch(err => console.error(err))
			.finally(() => setLoading(false))
	}, [])

	const allProducts = rawProducts

	const filteredProducts = q
		? allProducts.filter(p => p.title.toLowerCase().includes(q) || (p.description || "").toLowerCase().includes(q))
		: allProducts

	const products = [...filteredProducts].sort((a, b) => {
		switch (sortOrder) {
			case 'id-asc': return a.id - b.id
			case 'id-desc': return b.id - a.id
			case 'alpha-asc': return a.title.localeCompare(b.title)
			case 'alpha-desc': return b.title.localeCompare(a.title)
			default: return 0
		}
	})

	const handleDelete = async (id) => {
		if (window.confirm("¿Estás seguro de eliminar este producto?")) {
			try {
				await deleteProduct(id)
				// Actualizar lista localmente
				setRawProducts(products.filter(p => p.id !== id))
			} catch (error) {
				alert("Error al eliminar producto")
				console.error(error)
			}
		}
	}

	return (
		<section className="space-y-4 mb-8">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<h1 className="text-xl font-semibold text-white">Productos</h1>

				<div className="flex items-center gap-4 w-full sm:w-auto">
					<select
						value={sortOrder}
						onChange={(e) => setSortOrder(e.target.value)}
						className="bg-zinc-900 border border-zinc-800 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
					>
						<option value="id-asc">ID (Ascendente)</option>
						<option value="id-desc">ID (Descendente)</option>
						<option value="alpha-asc">Alfabético (A-Z)</option>
						<option value="alpha-desc">Alfabético (Z-A)</option>
					</select>

					<Link
						to="/admin/productos/nuevo"
						className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
					>
						Nuevo Producto
					</Link>
				</div>
			</div>
			{loading && <div className="text-sm text-gray-400">Cargando productos...</div>}
			<div className="overflow-hidden rounded-xl border border-zinc-800 shadow-lg">
				<table className="min-w-full text-sm">
					<thead className="bg-zinc-900 text-gray-400">
						<tr>
							<th className="px-2 sm:px-4 py-3 text-left font-medium">ID</th>
							<th className="px-2 sm:px-4 py-3 text-left font-medium">Título</th>
							<th className="px-2 sm:px-4 py-3 text-left font-medium">Precio</th>
							<th className="px-2 sm:px-4 py-3 text-left font-medium">Descuento</th>
							<th className="px-2 sm:px-4 py-3 text-center font-medium">Acciones</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-zinc-800 bg-black">
						{products.map((p) => (
							<tr key={p.id} className="hover:bg-zinc-900/50 transition-colors">
								<td className="px-2 sm:px-4 py-3 text-gray-300">{p.id}</td>
								<td className="px-2 sm:px-4 py-3 text-white font-medium">{p.title}</td>
								<td className="px-2 sm:px-4 py-3 text-gray-300">
									${Number(p.price).toFixed(2)}
								</td>
								<td className="px-2 sm:px-4 py-3 text-gray-300">
									{p.discount ? `${p.discount}%` : "-"}
								</td>
								<td className="px-2 sm:px-4 py-3 text-center space-x-1 sm:space-x-3">
									<Link
										to={`/admin/productos/editar/${p.id}`}
										className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
									>
										Editar
									</Link>
									<button
										onClick={() => handleDelete(p.id)}
										className="text-red-400 hover:text-red-300 font-medium transition-colors"
									>
										Eliminar
									</button>
								</td>
							</tr>
						))}
						{!loading && products.length === 0 && (
							<tr>
								<td colSpan={4} className="px-4 py-8 text-center text-gray-500">
									No hay productos.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</section>
	)
}
