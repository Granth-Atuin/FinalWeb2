import useFetch from "../hooks/useFetch"

export default function Products() {
	const { data: rawProducts, loading } = useFetch(
		"https://ecommerce.fedegonzalez.com/products"
	)
	const products = Array.isArray(rawProducts) ? rawProducts : []
	return (
		<section className="space-y-4">
			<h1 className="text-xl font-semibold">Productos</h1>
			{loading && <div className="text-sm">Cargando productos...</div>}
			<div className="overflow-x-auto">
				<table className="min-w-full text-sm border">
					<thead className="bg-gray-100">
						<tr>
							<th className="px-3 py-2 border text-left">ID</th>
							<th className="px-3 py-2 border text-left">Título</th>
							<th className="px-3 py-2 border text-left">Precio</th>
						</tr>
					</thead>
					<tbody>
						{products.map((p) => (
							<tr key={p.id} className="border-t">
								<td className="px-3 py-2 border">{p.id}</td>
								<td className="px-3 py-2 border">{p.title}</td>
								<td className="px-3 py-2 border">
									${Number(p.price).toFixed(2)}
								</td>
							</tr>
						))}
						{!loading && products.length === 0 && (
							<tr>
								<td colSpan={3} className="px-3 py-4 text-center text-gray-500">
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
