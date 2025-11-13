import { Link } from 'react-router-dom'
import { useCart } from '../store/cart'

export default function ProductCard({ product }) {
    const { add } = useCart()
    if (!product) return null
    return (
        <article className="bg-white rounded-lg border p-3 flex flex-col">
            <Link
                to={`/producto/${product.id}`}
                className="aspect-square overflow-hidden rounded bg-gray-100"
            />
            <h3 className="mt-3 font-medium line-clamp-1">{product.nombre}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">
                {product.descripcion}
            </p>
            <div className="mt-auto flex items-center justify-between">
                <span className="font-semibold">
                ${Number(product.precio ?? 0).toFixed(2)}
                </span>
                <button
                    type="button"
                    onClick={() => add(product, 1)}
                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded"
                >
                    Agregar
                </button>
            </div>
        </article>
    )
}
