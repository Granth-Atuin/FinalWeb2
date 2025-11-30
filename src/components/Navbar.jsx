import { Link, NavLink, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import { useCart } from '../store/cart'

export default function Navbar() {
    const navigate = useNavigate()
    const { totalQty } = useCart()

    return (
        <header className="bg-black border-b border-gray-800 w-full">
            <div className="w-full px-6 py-4 flex items-center gap-6">
                <Link to="/" className="font-bold text-2xl text-white tracking-tight">JP Store</Link>
                <nav className="ml-auto hidden sm:flex gap-6">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'text-purple-500 font-medium' : 'text-gray-300 hover:text-white transition-colors'}>Home</NavLink>
                    <NavLink to="/admin" className={({ isActive }) => isActive ? 'text-purple-500 font-medium' : 'text-gray-300 hover:text-white transition-colors'}>Admin</NavLink>
                    <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
                </nav>
            </div>
            <div className="border-t border-gray-800 bg-zinc-900/50">
                <div className="w-full px-6 py-3 flex items-center gap-4">
                    <div className="flex-1 max-w-xl">
                        <SearchBar onSubmit={(q) => navigate(`/?q=${encodeURIComponent(q)}`)} />
                    </div>
                    <Link to="/carrito" className="ml-auto text-sm text-gray-300 hover:text-white flex items-center gap-2">
                        <span>Carrito</span>
                        <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">{totalQty}</span>
                    </Link>
                </div>
            </div>
        </header>
    )
}