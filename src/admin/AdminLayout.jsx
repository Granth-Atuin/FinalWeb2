import { Outlet, NavLink } from "react-router-dom"

export default function AdminLayout() {
  return (
    <section className="flex gap-6">
      {/* Sidebar */}
      <aside className="w-48 border-r pr-4 flex flex-col gap-2 text-sm">
        <NavLink
          to="/admin/productos"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-medium"
              : "text-gray-700"
          }
        >
          Productos
        </NavLink>
        <NavLink
          to="/admin/categorias"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-medium"
              : "text-gray-700"
          }
        >
          Categorías
        </NavLink>
      </aside>
      {/* Contenido */}
      <main className="flex-1">
        <Outlet />
      </main>
    </section>
  )
}
