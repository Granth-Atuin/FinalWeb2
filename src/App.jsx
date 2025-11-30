import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Category from './pages/Category'
import Product from './pages/Product'
import Cart from './pages/Cart'
import AdminLayout from './admin/AdminLayout'
import Products from './admin/Products'
import Categories from './admin/Categories'
import Login from './pages/Login'

export default function App() {
    return (
        <div className="min-h-screen flex flex-col bg-black text-white">
            <Navbar />
            <main className="flex-1 w-full">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/categoria/:id" element={<Category />} />
                    <Route path="/producto/:id" element={<Product />} />
                    <Route path="/carrito" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Navigate to="productos" replace />} />
                        <Route path="productos" element={<Products />} />
                        <Route path="categorias" element={<Categories />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}