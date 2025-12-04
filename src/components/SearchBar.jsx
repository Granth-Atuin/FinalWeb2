import { useState } from 'react'
import { useFetch } from '../hooks/useFetch'

export default function SearchBar({ onSubmit }) {
    const [q, setQ] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const { data: categories } = useFetch("https://ecommerce.fedegonzalez.com/categories/")

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit?.({ q: q.trim(), categoryId })
    }

    return (
        <form className="flex w-full gap-2" onSubmit={handleSubmit}>
            <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="rounded border px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Todas</option>
                {Array.isArray(categories) && categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.title}</option>
                ))}
            </select>
            <input
                className="flex-1 rounded border px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Buscar productos..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
            />
            <button className="rounded bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                Buscar
            </button>
        </form>
    )
}