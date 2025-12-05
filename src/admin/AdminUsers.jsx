import { useState, useEffect } from 'react'
import { useAuth } from '../store/auth'

export default function AdminUsers() {
    const { register } = useAuth()
    const [users, setUsers] = useState([])
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        // Cargar usuarios del localStorage para mostrar la lista
        const loadUsers = () => {
            const storedUsers = localStorage.getItem("users")
            if (storedUsers) {
                const allUsers = JSON.parse(storedUsers)
                // Filtrar solo administradores
                setUsers(allUsers.filter(u => u.role === 'admin'))
            }
        }
        loadUsers()

        // Escuchar cambios en localStorage (aunque en este mismo componente actualizaremos)
        window.addEventListener('storage', loadUsers)
        return () => window.removeEventListener('storage', loadUsers)
    }, [])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (formData.password.length < 4) {
            setError('La contraseña debe tener al menos 4 caracteres')
            return
        }

        const registered = register(formData.email, formData.password, "admin")
        if (registered) {
            setSuccess('Administrador creado exitosamente')
            setFormData({ email: '', password: '' })
            // Recargar lista
            const storedUsers = localStorage.getItem("users")
            if (storedUsers) {
                const allUsers = JSON.parse(storedUsers)
                setUsers(allUsers.filter(u => u.role === 'admin'))
            }
        } else {
            setError('El email ya está registrado')
        }
    }

    return (
        <section className="space-y-8">
            <h1 className="text-xl font-semibold text-white">Gestión de Administradores</h1>

            {/* Formulario de Creacion */}
            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 max-w-2xl">
                <h2 className="text-lg font-medium text-white mb-4">Crear Nuevo Administrador</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-500/10 border border-green-500/50 text-green-500 text-sm p-3 rounded-lg">
                            {success}
                        </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="admin@ejemplo.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="••••"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Crear Administrador
                    </button>
                </form>
            </div>

            {/* Lista de Administradores */}
            <div className="overflow-hidden rounded-xl border border-zinc-800 shadow-lg">
                <table className="min-w-full text-sm">
                    <thead className="bg-zinc-900 text-gray-400">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium">Email</th>
                            <th className="px-4 py-3 text-left font-medium">Rol</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800 bg-black">
                        {users.map((u, index) => (
                            <tr key={index} className="hover:bg-zinc-900/50 transition-colors">
                                <td className="px-4 py-3 text-white">{u.email}</td>
                                <td className="px-4 py-3 text-blue-400 font-medium capitalize">{u.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
