import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createCategory, getCategory, updateCategory } from "../services/categoryService"

export default function CategoryForm() {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditMode = !!id

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    })

    useEffect(() => {
        if (isEditMode) {
            loadCategory()
        }
    }, [id])

    const loadCategory = async () => {
        try {
            const category = await getCategory(id)
            setFormData({
                title: category.title,
                description: category.description || "",
            })
        } catch (err) {
            setError("Error al cargar la categoría")
            console.error(err)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            if (isEditMode) {
                await updateCategory(id, formData)
            } else {
                await createCategory(formData)
            }
            navigate("/admin/categorias")
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">
                {isEditMode ? "Editar Categoría" : "Nueva Categoría"}
            </h1>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Título
                    </label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Nombre de la categoría"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descripción
                    </label>
                    <textarea
                        name="description"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Descripción opcional..."
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate("/admin/categorias")}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                        {loading ? "Guardando..." : isEditMode ? "Actualizar Categoría" : "Guardar Categoría"}
                    </button>
                </div>
            </form>
        </section>
    )
}
