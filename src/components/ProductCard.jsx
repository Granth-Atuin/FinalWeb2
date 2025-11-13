import { Link } from "react-router-dom"
import { useCart } from "../store/cart"

export default function ProductCard({ product }) {
	const { add } = useCart()
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
		<article className="bg-white rounded-lg border p-3 flex flex-col">
			<Link
				to={`/producto/${product.id}`}
				className="aspect-square overflow-hidden rounded bg-gray-100 flex items-center justify-center"
			>
				{picture ? (
					<img
						src={picture}
						alt={product.title}
						className="w-full h-full object-cover"
					/>
				) : (
					<span className="text-xs text-gray-500">Sin imagen</span>
				)}
			</Link>
			<h3 className="mt-3 font-medium line-clamp-1">{product.title}</h3>
			<p className="text-sm text-gray-600 line-clamp-2">
				{product.description}
			</p>
			<div className="mt-auto flex items-center justify-between pt-3">
				<span className="font-semibold">
					${Number(product.price).toFixed(2)}
				</span>
				<button
					onClick={handleAdd}
					className="text-sm bg-blue-600 text-white px-3 py-1 rounded"
				>
					Agregar
				</button>
			</div>
		</article>
	)
}
