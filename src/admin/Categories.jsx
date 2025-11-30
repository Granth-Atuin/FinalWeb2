import useFetch from "../hooks/useFetch"

export default function Categories() {
	const { data: rawCategories, loading } = useFetch(
		"https://ecommerce.fedegonzalez.com/categories/"
	)
	const categories = Array.isArray(rawCategories) ? rawCategories : []
	return (
		<section className="space-y-4">
			<h1 className="text-xl font-semibold">Categorías</h1>
			{loading && <div className="text-sm">Cargando categorías...</div>}
			<div className="overflow-x-auto">
				<table className="min-w-full text-sm border">
					<thead className="bg-gray-100">
						<tr>
							<th className="px-3 py-2 border text-left">ID</th>
							<th className="px-3 py-2 border text-left">Título</th>
						</tr>
					</thead>
					<tbody>
						{categories.map((c) => (
							<tr key={c.id} className="border-t">
								<td className="px-3 py-2 border">{c.id}</td>
								<td className="px-3 py-2 border">{c.title}</td>
							</tr>
						))}
						{!loading && categories.length === 0 && (
							<tr>
								<td colSpan={2} className="px-3 py-4 text-center text-gray-500">
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
