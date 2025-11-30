import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../store/auth"

export default function ProtectedRoute() {
    const { user, loading } = useAuth()

    if (loading) return null

    if (!user || user.role !== "admin") {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}
