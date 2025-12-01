import { useFetch } from "../hooks/useFetch"
import { deleteCategory } from "../services/categoryService"
import { Link } from "react-router-dom"

export default function Categories() {
	const { data: rawCategories, loading, setData } = useFetch(
		"https://ecommerce.fedegonzalez.com/categories/"
	)
	const categories = Array.isArray(rawCategories) ? rawCategories : []

	const handleDelete = async (id) => {
		if (window.confirm("¿Estás seguro de eliminar esta categoría?")) {
			try {
				await deleteCategory(id)
				setData(categories.filter(c => c.id !== id))
			} catch (error) {
				alert("Error al eliminar categoría")
				console.error(error)
			}
		}
	}

	return (
		<section className="space-y-4 mb-8">
			<div className="flex justify-between items-center">
				<h1 className="text-xl font-semibold text-white">Categorías</h1>
				<Link
					to="/admin/categorias/nueva"
					className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
				>
					Nueva Categoría
				</Link>
			</div>
			{loading && <div className="text-sm text-gray-400">Cargando categorías...</div>}
			<div className="overflow-hidden rounded-xl border border-zinc-800 shadow-lg">
				<table className="min-w-full text-sm">
					<thead className="bg-zinc-900 text-gray-400">
						<tr>
							<th className="px-2 sm:px-4 py-3 text-left font-medium">ID</th>
							<th className="px-2 sm:px-4 py-3 text-left font-medium">Título</th>
							<th className="px-2 sm:px-4 py-3 text-center font-medium">Acciones</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-zinc-800 bg-black">
						{categories.map((c) => (
							<tr key={c.id} className="hover:bg-zinc-900/50 transition-colors">
								<td className="px-2 sm:px-4 py-3 text-gray-300">{c.id}</td>
								<td className="px-2 sm:px-4 py-3 text-white font-medium">{c.title}</td>
								<td className="px-2 sm:px-4 py-3 text-center space-x-1 sm:space-x-3">
									<Link
										to={`/admin/categorias/editar/${c.id}`}
										className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
									>
										Editar
									</Link>
									<button
										onClick={() => handleDelete(c.id)}
										className="text-red-400 hover:text-red-300 font-medium transition-colors"
									>
										Eliminar
									</button>
								</td>
							</tr>
						))}
						{!loading && categories.length === 0 && (
							<tr>
								<td colSpan={3} className="px-4 py-8 text-center text-gray-500">
									No hay categorías.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</section>
	)
}
