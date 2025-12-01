import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-8 shadow-2xl border border-zinc-800">

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

                <div className="mt-6 text-center">
                    <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>
            </div>
        </div>
    )
}
