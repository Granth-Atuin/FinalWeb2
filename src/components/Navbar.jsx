import { Link, NavLink, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import { useCart } from '../store/cart'


export default function Navbar() {
const navigate = useNavigate()
const { totalQty } = useCart()


return (
<header className="bg-white border-b">
<div className="container mx-auto px-4 py-3 flex items-center gap-3">
<Link to="/" className="font-semibold text-lg">JP Store</Link>
<nav className="ml-auto hidden sm:flex gap-4">
<NavLink to="/" className={({isActive})=> isActive? 'text-blue-600' : 'text-gray-700'}>Home</NavLink>
<NavLink to="/admin" className={({isActive})=> isActive? 'text-blue-600' : 'text-gray-700'}>Admin</NavLink>
</nav>
</div>
<div className="border-t">
<div className="container mx-auto px-4 py-2 flex items-center gap-3">
<SearchBar onSubmit={(q)=> navigate(`/?q=${encodeURIComponent(q)}`)} />
<Link to="/carrito" className="ml-auto text-sm">Carrito ({totalQty})</Link>
</div>
</div>
</header>
)
}