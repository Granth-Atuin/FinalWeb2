import { useState, useEffect } from 'react'
import { getCategories } from '../services/categoryService'
import { useSearchParams } from 'react-router-dom'

export default function SearchBar({ onSubmit }) {
    const [searchParams] = useSearchParams()
    const initialQ = searchParams.get("q") || ""
    const initialCategory = searchParams.get("category") || ""

    const [q, setQ] = useState(initialQ)
    const [categoryId, setCategoryId] = useState(initialCategory)
    const [categories, setCategories] = useState([])

    // Sincronizar estado si cambia la URL externamente (ej: navegacion atras/adelante)
    useEffect(() => {
        setQ(searchParams.get("q") || "")
        setCategoryId(searchParams.get("category") || "")
    }, [searchParams])

    useEffect(() => {
        getCategories().then(setCategories).catch(console.error)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit?.({ q: q.trim(), categoryId })
    }

    // Deduplicate categories by Title
    const uniqueCategories = Array.isArray(categories)
        ? Array.from(new Map(categories.map(item => [item.title, item])).values())
        : []

    return (
        <form className="flex w-full gap-2" onSubmit={handleSubmit}>
            <select
                value={categoryId}
                onChange={(e) => {
                    setCategoryId(e.target.value)
                    onSubmit?.({ q: q.trim(), categoryId: e.target.value })
                }}
                className="rounded-lg border border-zinc-700 px-3 py-2 text-sm bg-zinc-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
                <option value="">Todas</option>
                {uniqueCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.title}</option>
                ))}
            </select>
            <input
                className="flex-1 rounded-lg border border-zinc-700 px-3 py-2 text-sm bg-zinc-900 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Buscar productos..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
            />
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                Buscar
            </button>
        </form>
    )
}