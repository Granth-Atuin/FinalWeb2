import { Link, NavLink, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import { useCart } from '../store/cart'
import { useState } from 'react'
import CartDrawer from './CartDrawer'

export default function Navbar() {
    const navigate = useNavigate()
    const { totalQty } = useCart()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)

    return (
        <>
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <header className="bg-black border-b border-gray-800 w-full sticky top-0 z-50">
                <div className="w-full px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link to="/" className="font-bold text-xl sm:text-2xl text-white tracking-tight shrink-0">
                        JP Store
                    </Link>

                    {/* Navegacion Escritorio */}
                    <nav className="hidden sm:flex gap-6 ml-auto">
                        <NavLink to="/" className={({ isActive }) => isActive ? 'text-purple-500 font-medium' : 'text-gray-300 hover:text-white transition-colors'}>Home</NavLink>
                        <NavLink to="/admin" className={({ isActive }) => isActive ? 'text-purple-500 font-medium' : 'text-gray-300 hover:text-white transition-colors'}>Admin</NavLink>
                        <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
                    </nav>

                    {/* Boton Menu Mobile */}
                    <button
                        className="sm:hidden text-gray-300 hover:text-white p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
                        </svg>
                    </button>
                </div>

                {/* Dropdown Navegacion Mobile */}
                {isMenuOpen && (
                    <div className="sm:hidden bg-zinc-900 border-t border-gray-800 px-4 py-4 space-y-4">
                        <NavLink
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) => `block ${isActive ? 'text-purple-500 font-medium' : 'text-gray-300'}`}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/admin"
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) => `block ${isActive ? 'text-purple-500 font-medium' : 'text-gray-300'}`}
                        >
                            Admin
                        </NavLink>
                        <Link
                            to="/login"
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-gray-300"
                        >
                            Login
                        </Link>
                    </div>
                )}

                {/* Barra de Busqueda y Carrito */}
                <div className="border-t border-gray-800 bg-zinc-900/50">
                    <div className="w-full px-4 sm:px-6 py-3 flex items-center gap-4">
                        <div className="flex-1 max-w-xl">
                            <SearchBar onSubmit={({ q, categoryId }) => {
                                const params = new URLSearchParams()
                                if (q) params.set("q", q)
                                if (categoryId) params.set("category", categoryId)
                                navigate(`/?${params.toString()}`)
                            }} />
                        </div>
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="ml-auto text-sm text-gray-300 hover:text-white flex items-center gap-2 shrink-0"
                        >
                            <span className="hidden sm:inline">Carrito</span>
                            <div className="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                                {totalQty > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                                        {totalQty}
                                    </span>
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </header>
        </>
    )
}