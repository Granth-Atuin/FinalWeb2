import { useState } from 'react'

export default function SearchBar({ onSubmit }){
const [q, setQ] = useState('')

return (
<form className="flex w-full gap-2" onSubmit={(e)=>{ e.preventDefault(); onSubmit?.(q.trim()) }}>
<input
className="flex-1 rounded border px-3 py-2 text-sm"
placeholder="Buscar productos..."
value={q}
onChange={(e)=> setQ(e.target.value)}
/>
<button className="rounded bg-blue-600 px-3 py-2 text-white text-sm">Buscar</button>
</form>
)
}