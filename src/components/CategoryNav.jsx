import { useState, useEffect } from "react"

export default function CategoryNav({ categories }) {
    const [isOpen, setIsOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("")

    // Cerrar al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest("#category-nav-container")) {
                setIsOpen(false)
            }
        }
        document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)
    }, [])

    const scrollToCategory = (catId) => {
        const element = document.getElementById(`category-${catId}`)
        if (element) {
            // Offset para el navbar sticky + un poco de espacio
            const y = element.getBoundingClientRect().top + window.scrollY - 100
            window.scrollTo({ top: y, behavior: 'smooth' })
            setIsOpen(false)
            setActiveSection(catId)
        }
    }

    if (!categories || categories.length === 0) return null

    return (
        <div id="category-nav-container" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-4">
            {/* Lista de Categorias */}
            <div className={`
                bg-zinc-900/90 backdrop-blur-md border border-gray-700 rounded-2xl p-2 shadow-2xl
                transition-all duration-300 origin-bottom-right
                ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"}
            `}>
                <div className="flex flex-col min-w-[160px] max-h-[60vh] overflow-y-auto scrollbar-hide">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 py-2 mb-1 border-b border-gray-800">
                        Categorías
                    </h3>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => scrollToCategory(cat.id)}
                            className={`
                                text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-colors
                                hover:bg-white/10
                                ${activeSection === cat.id ? "text-purple-400 bg-purple-500/10" : "text-gray-300"}
                            `}
                        >
                            {cat.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Boton Principal */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    group flex items-center justify-center w-14 h-14 rounded-full shadow-lg shadow-purple-900/20
                    transition-all duration-300 hover:scale-105 active:scale-95
                    ${isOpen ? "bg-white text-black rotate-90" : "bg-purple-600 text-white hover:bg-purple-500"}
                `}
                aria-label="Navegar categorías"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                )}
            </button>
        </div>
    )
}
