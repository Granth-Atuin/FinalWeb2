import { useFetch } from "../hooks/useFetch"
import { deleteProduct } from "../services/productService"
import { Link } from "react-router-dom"

export default function Products() {
	const { data: rawProducts, loading, setData } = useFetch(
		"https://ecommerce.fedegonzalez.com/products/"
	)
	const products = Array.isArray(rawProducts) ? rawProducts : []

	const handleDelete = async (id) => {
		if (window.confirm("¿Estás seguro de eliminar este producto?")) {
			try {
				await deleteProduct(id)
				// Actualizar lista localmente
				setData(products.filter(p => p.id !== id))
			} catch (error) {
				alert("Error al eliminar producto")
				console.error(error)
			}
		}
	}

	return (
		<section className="space-y-4 mb-8">
			<div className="flex justify-between items-center">
				<h1 className="text-xl font-semibold text-white">Productos</h1>
				<Link
					to="/admin/productos/nuevo"
					className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
				>
					Nuevo Producto
				</Link>
			</div>
			{loading && <div className="text-sm text-gray-400">Cargando productos...</div>}
			<div className="overflow-hidden rounded-xl border border-zinc-800 shadow-lg">
				<table className="min-w-full text-sm">
					<thead className="bg-zinc-900 text-gray-400">
						<tr>
							<th className="px-4 py-3 text-left font-medium">ID</th>
							<th className="px-4 py-3 text-left font-medium">Título</th>
							<th className="px-4 py-3 text-left font-medium">Precio</th>
							<th className="px-4 py-3 text-center font-medium">Acciones</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-zinc-800 bg-black">
						{products.map((p) => (
							<tr key={p.id} className="hover:bg-zinc-900/50 transition-colors">
								<td className="px-4 py-3 text-gray-300">{p.id}</td>
								<td className="px-4 py-3 text-white font-medium">{p.title}</td>
								<td className="px-4 py-3 text-gray-300">
									${Number(p.price).toFixed(2)}
								</td>
								<td className="px-4 py-3 text-center space-x-3">
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
