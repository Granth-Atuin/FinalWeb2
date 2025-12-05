import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])

    useEffect(() => {
        // Cargar usuario actual
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }

        // Cargar lista de usuarios o inicializar con admin por defecto
        const storedUsers = localStorage.getItem("users")
        let parsedUsers = []

        if (storedUsers) {
            parsedUsers = JSON.parse(storedUsers)
        }

        // Asegurar que el admin por defecto siempre exista y sea el correcto
        const defaultAdmin = { email: "admin@admin.com", password: "admin", role: "admin" }
        const adminIndex = parsedUsers.findIndex(u => u.role === "admin" && (u.email === "admin@gmail.com" || u.email === "admin@admin.com"))

        if (adminIndex >= 0) {
            // Actualizar admin existente si es necesario (ej. cambiar email viejo)
            parsedUsers[adminIndex] = defaultAdmin
        } else {
            // Si no hay admin, agregarlo
            parsedUsers.push(defaultAdmin)
        }

        setUsers(parsedUsers)
        localStorage.setItem("users", JSON.stringify(parsedUsers))

        setLoading(false)
    }, [])

    const login = (email, password) => {
        const foundUser = users.find(u => u.email === email && u.password === password)
        if (foundUser) {
            const { password, ...userWithoutPass } = foundUser
            setUser(userWithoutPass)
            localStorage.setItem("user", JSON.stringify(userWithoutPass))
            return true
        }
        return false
    }

    const register = (email, password, role = "client") => {
        if (users.some(u => u.email === email)) {
            return false // Usuario ya existe
        }
        const newUser = { email, password, role }
        const updatedUsers = [...users, newUser]
        setUsers(updatedUsers)
        localStorage.setItem("users", JSON.stringify(updatedUsers))

        // Auto-login si es registro de cliente (opcional, pero comun)
        // Si es admin creando admin, no hacemos auto-login
        if (role === "client") {
            const { password, ...userWithoutPass } = newUser
            setUser(userWithoutPass)
            localStorage.setItem("user", JSON.stringify(userWithoutPass))
        }
        return true
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    )


}

export const useAuth = () => useContext(AuthContext)
