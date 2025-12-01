import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import ProtectedRoute from './components/ProtectedRoute'

// Lazy load pages
const Home = lazy(() => import('./pages/Home'))
const Category = lazy(() => import('./pages/Category'))
const Product = lazy(() => import('./pages/Product'))
const Cart = lazy(() => import('./pages/Cart'))
const Login = lazy(() => import('./pages/Login'))
const AdminLayout = lazy(() => import('./admin/AdminLayout'))
const Products = lazy(() => import('./admin/Products'))
const AddProduct = lazy(() => import('./admin/AddProduct'))
const Categories = lazy(() => import('./admin/Categories'))

export default function App() {
    return (
        <div className="min-h-screen flex flex-col bg-black text-white">
            <Navbar />
            <main className="flex-1 w-full">
                <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/categoria/:id" element={<Category />} />
                        <Route path="/producto/:id" element={<Product />} />
                        <Route path="/carrito" element={<Cart />} />
                        <Route path="/login" element={<Login />} />

                        <Route element={<ProtectedRoute />}>
                            <Route path="/admin" element={<AdminLayout />}>
                                <Route index element={<Navigate to="productos" replace />} />
                                <Route path="productos" element={<Products />} />
                                <Route path="productos/nuevo" element={<AddProduct />} />
                                <Route path="categorias" element={<Categories />} />
                            </Route>
                        </Route>

                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Suspense>
            </main>
            <Footer />
        </div>
    )
}