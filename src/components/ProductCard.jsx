import { Link } from "react-router-dom"
import { useCart } from "../store/cart"

export default function ProductCard({ product }) {
	const { add } = useCart()
	const picture =
		product.pictures && product.pictures.length > 0
			? product.pictures[0]
			: null

	const hasDiscount = product.discount > 0
	const finalPrice = hasDiscount
		? product.price * (1 - product.discount / 100)
		: product.price

	const handleAdd = (e) => {
		e.preventDefault()
		add(
			{
				id: product.id,
				nombre: product.title,
				precio: finalPrice,
				image: picture
			},
			1
		)
	}

	return (
		<Link
			to={`/producto/${product.id}`}
			className="group block bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors w-full relative"
		>
			{hasDiscount && (
				<div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
					-{product.discount}%
				</div>
			)}
			<div className="aspect-square bg-zinc-800 relative overflow-hidden">
				{picture ? (
					<img
						src={picture}
						alt={product.title}
						className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
						Sin imagen
					</div>
				)}
				<button
					onClick={handleAdd}
					className="absolute bottom-2 right-2 bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 hover:bg-purple-500"
					title="Agregar al carrito"
				>
					+
				</button>
			</div>
			<div className="p-3">
				<h3 className="text-sm font-bold text-white line-clamp-1 mb-1" title={product.title}>{product.title}</h3>
				<p className="text-xs text-gray-400 line-clamp-2 mb-2 min-h-[2.5em]">{product.description}</p>
				<div className="flex flex-col">
					{hasDiscount && (
						<span className="text-xs text-gray-500 line-through">
							${Number(product.price).toFixed(2)}
						</span>
					)}
					<span className="text-xs text-purple-400 font-semibold">
						${Number(finalPrice).toFixed(2)}
					</span>
				</div>
			</div>
		</Link>
	)
}
