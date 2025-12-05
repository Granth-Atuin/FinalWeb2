import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../store/auth'

export default function Login() {
    const [isAdmin, setIsAdmin] = useState(false)
    const navigate = useNavigate()
    const { login } = useAuth()
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.type]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        if (isAdmin) {
            const success = login(formData.email, formData.password)
            if (success) {
                navigate('/admin')
            } else {
                setError('Credenciales inválidas')
            }
        } else {
            // Simular inicio de sesion de cliente
            navigate('/')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4">
            <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-8 shadow-2xl border border-zinc-800 relative">

                {/* Admin Credentials Hint */}
                {isAdmin && (
                    <div className="absolute -right-64 top-0 w-60 bg-zinc-800 border border-zinc-700 p-4 rounded-xl shadow-xl hidden lg:block">
                        <div className="flex items-center gap-2 mb-2 text-yellow-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <h3 className="font-bold text-sm">Credenciales Demo</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div>
                                <span className="text-gray-400 block text-xs">Email:</span>
                                <code className="bg-black/50 px-2 py-1 rounded text-gray-200 block mt-1 select-all">admin@admin.com</code>
                            </div>
                            <div>
                                <span className="text-gray-400 block text-xs">Contraseña:</span>
                                <code className="bg-black/50 px-2 py-1 rounded text-gray-200 block mt-1 select-all">admin</code>
                            </div>
                        </div>
                    </div>
                )}

                {/* Interruptor Toggle */}
                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => setIsAdmin(!isAdmin)}
                        className="relative w-64 h-12 bg-black rounded-full border border-zinc-800 p-1 cursor-pointer overflow-hidden group"
                    >
                        {/* Fondo animado */}
                        <div
                            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-all duration-500 ease-out shadow-lg z-0 ${isAdmin
                                ? 'left-[calc(50%+2px)] bg-gradient-to-r from-yellow-600 to-yellow-400'
                                : 'left-1 bg-gradient-to-r from-purple-600 to-purple-400'
                                }`}
                        />

                        {/* Textos */}
                        <div className="relative z-10 flex w-full h-full">
                            <div className={`w-1/2 flex items-center justify-center text-sm font-medium transition-colors duration-300 ${!isAdmin ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                Cliente
                            </div>
                            <div className={`w-1/2 flex items-center justify-center text-sm font-medium transition-colors duration-300 ${isAdmin ? 'text-black' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                Admin
                            </div>
                        </div>
                    </button>
                </div>

                <h2 className="text-2xl font-bold text-center mb-2 text-white">
                    {isAdmin ? 'Panel de Administración' : 'Bienvenido de nuevo'}
                </h2>
                <p className="text-center text-gray-400 mb-8 text-sm">
                    {isAdmin ? 'Gestiona tu tienda desde aquí' : 'Ingresa a tu cuenta para continuar'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center">
                            {error}
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                            placeholder="tu@email.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Contraseña</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-3 rounded-lg font-semibold text-white shadow-lg transition-all duration-300 transform hover:scale-[1.02] ${isAdmin
                            ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 shadow-yellow-900/20'
                            : 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 shadow-purple-900/20'
                            }`}
                    >
                        {isAdmin ? 'Ingresar como Admin' : 'Iniciar Sesión'}
                    </button>
                </form>

                {!isAdmin && (
                    <div className="mt-6 text-center">
                        <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors block mb-2">
                            ¿Olvidaste tu contraseña?
                        </a>
                        <Link to="/register" className="text-sm text-purple-400 hover:text-purple-300 font-medium">
                            Registrarse
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
