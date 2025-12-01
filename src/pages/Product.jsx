import { useParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import { useCart } from "../store/cart"

export default function Product() {
	const { id } = useParams()
	const { add } = useCart()
	const { data: product, loading } = useFetch(
		`https://ecommerce.fedegonzalez.com/products/${id}`
	)
	if (loading) {
		return <div className="text-sm">Cargando producto...</div>
	}
	if (!product) {
		return <div className="text-sm">Producto no encontrado.</div>
	}
	const picture =
		product.pictures && product.pictures.length > 0
			? product.pictures[0]
			: null
	const handleAdd = () => {
		add(
			{
				id: product.id,
				nombre: product.title,
				precio: product.price,
			},
			1
		)
	}
	return (
		<section className="grid gap-6 md:grid-cols-[1.5fr,2fr]">
			<div className="bg-white border rounded-lg p-4 flex items-center justify-center">
				{picture ? (
					<img
						src={picture}
						alt={product.title}
						className="max-h-96 w-full object-contain"
					/>
				) : (
					<span className="text-sm text-gray-500">Sin imagen</span>
				)}
			</div>
			<div className="space-y-4">
				<h1 className="text-2xl font-semibold">{product.title}</h1>
				<p className="text-gray-700">{product.description}</p>
				<div className="text-xl font-semibold">
					${Number(product.price).toFixed(2)}
				</div>
				<button
					onClick={handleAdd}
					className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
				>
					Agregar al carrito
				</button>
			</div>
		</section>
	)
}
