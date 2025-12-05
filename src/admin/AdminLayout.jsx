import { Outlet, NavLink } from "react-router-dom"

export default function AdminLayout() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <section className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-zinc-800 pb-4 md:pb-0 md:pr-8 flex flex-col gap-2 text-sm">
          <NavLink
            to="/admin/productos"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-medium bg-zinc-900 px-4 py-3 rounded-xl transition-all"
                : "text-gray-400 hover:text-gray-200 hover:bg-zinc-900/50 px-4 py-3 rounded-xl transition-all"
            }
          >
            Productos
          </NavLink>
          <NavLink
            to="/admin/categorias"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-medium bg-zinc-900 px-4 py-3 rounded-xl transition-all"
                : "text-gray-400 hover:text-gray-200 hover:bg-zinc-900/50 px-4 py-3 rounded-xl transition-all"
            }
          >
            Categorías
          </NavLink>
          <NavLink
            to="/admin/usuarios"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-medium bg-zinc-900 px-4 py-3 rounded-xl transition-all"
                : "text-gray-400 hover:text-gray-200 hover:bg-zinc-900/50 px-4 py-3 rounded-xl transition-all"
            }
          >
            Administradores
          </NavLink>
        </aside>
        {/* Contenido */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </section>
    </div>
  )
}
