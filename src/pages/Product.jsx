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
		<section className="grid gap-8 md:grid-cols-[1.5fr,2fr] max-w-6xl mx-auto px-4 py-8">
			<div className="bg-white rounded-2xl p-6 flex items-center justify-center overflow-hidden shadow-lg border border-zinc-800">
				{picture ? (
					<img
						src={picture}
						alt={product.title}
						className="max-h-[500px] w-full object-contain transition-transform duration-500 hover:scale-110 cursor-zoom-in"
					/>
				) : (
					<span className="text-sm text-gray-500">Sin imagen</span>
				)}
			</div>
			<div className="space-y-6 flex flex-col justify-center">
				<div>
					<h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">{product.title}</h1>
					<div className="text-2xl sm:text-3xl font-bold text-green-400">
						${Number(product.price || 0).toFixed(2)}
					</div>
				</div>

				<p className="text-gray-300 text-lg leading-relaxed border-t border-zinc-800 pt-4">
					{product.description}
				</p>

				<div className="pt-4">
					<button
						onClick={handleAdd}
						className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 text-lg"
					>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
						</svg>
						Agregar al carrito
					</button>
				</div>
			</div>
		</section>
	)
}
