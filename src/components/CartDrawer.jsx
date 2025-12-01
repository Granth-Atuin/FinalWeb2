import { useCart } from "../store/cart"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

export default function CartDrawer({ isOpen, onClose }) {
    const { cart, totalQty, total, remove, updateQty, clear } = useCart()
    const drawerRef = useRef(null)
    const navigate = useNavigate()

    // Cerrar al hacer click afuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                onClose()
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/50 backdrop-blur-sm">
            <div
                ref={drawerRef}
                className="w-full max-w-md bg-zinc-900 h-full shadow-2xl flex flex-col border-l border-zinc-800 animate-slide-in"
            >
                {/* Encabezado */}
                <div className="p-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">Tu Carrito</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 opacity-50">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                            <p>Tu carrito está vacío</p>
                            <button
                                onClick={onClose}
                                className="text-purple-400 hover:text-purple-300 font-medium"
                            >
                                Seguir comprando
                            </button>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="flex gap-4 items-center group">
                                {/* Imagen */}
                                <div className="w-16 h-16 bg-zinc-800 rounded-lg overflow-hidden shrink-0">
                                    {item.image ? (
                                        <img src={item.image} alt={item.nombre} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">Img</div>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-white font-medium text-sm leading-tight mb-1">{item.nombre}</h3>
                                    <p className="text-purple-400 font-bold text-sm">${Number(item.precio).toFixed(2)}</p>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    <div className="flex items-center gap-3 bg-zinc-800/50 rounded-full px-2 py-1">
                                        <button
                                            onClick={() => updateQty(item.id, item.qty - 1)}
                                            className="text-gray-400 hover:text-white text-lg leading-none pb-0.5"
                                        >
                                            -
                                        </button>
                                        <span className="text-white text-sm font-medium min-w-[1ch] text-center">{item.qty}</span>
                                        <button
                                            onClick={() => updateQty(item.id, item.qty + 1)}
                                            className="text-gray-400 hover:text-white text-lg leading-none pb-0.5"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => remove(item.id)}
                                        className="text-zinc-500 hover:text-red-400 text-xs transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pie de pagina */}
                {cart.length > 0 && (
                    <div className="p-6 border-t border-zinc-800 bg-zinc-900 space-y-4">
                        <div className="flex justify-between items-center text-xl font-bold text-white">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3.5 rounded-xl font-bold transition-colors shadow-lg shadow-purple-900/20">
                            Finalizar Compra
                        </button>
                        <button
                            onClick={clear}
                            className="w-full text-zinc-500 hover:text-zinc-300 text-sm"
                        >
                            Vaciar Carrito
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
