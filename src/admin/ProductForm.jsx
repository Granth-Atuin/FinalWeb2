import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { addProduct, getProduct, updateProduct } from "../services/productService"
import { getCategories } from "../services/categoryService"

export default function ProductForm() {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditMode = !!id

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [categories, setCategories] = useState([])
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        image: "",
        category_id: "",
        isFeatured: false,
    })

    useEffect(() => {
        loadInitialData()
    }, [id])

    const loadInitialData = async () => {
        try {
            const cats = await getCategories()
            setCategories(cats)

            if (isEditMode) {
                const product = await getProduct(id)
                setFormData({
                    title: product.title,
                    price: product.price,
                    description: product.description,
                    image: product.pictures?.[0] || product.image || "",
                    category_id: product.category_id,
                    isFeatured: product.tags?.includes("destacados") || false,
                })
            }
        } catch (err) {
            setError("Error al cargar datos")
            console.error(err)
        }
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const payload = {
                title: formData.title,
                price: Number(formData.price),
                description: formData.description,
                category_id: Number(formData.category_id),
                pictures: [formData.image],
                tags: formData.isFeatured ? ["destacados"] : [],
            }

            if (isEditMode) {
                await updateProduct(id, payload)
            } else {
                await addProduct(payload)
            }
            navigate("/admin/productos")
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">
                {isEditMode ? "Editar Producto" : "Agregar Nuevo Producto"}
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
                        placeholder="Nombre del producto"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Precio
                        </label>
                        <input
                            type="number"
                            name="price"
                            required
                            min="0"
                            step="0.01"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="0.00"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Categoría
                        </label>
                        <select
                            name="category_id"
                            required
                            value={formData.category_id}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                        >
                            <option value="">Seleccionar categoría</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="isFeatured"
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">
                        Producto Destacado
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        URL de la Imagen
                    </label>
                    <input
                        type="url"
                        name="image"
                        required
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="https://ejemplo.com/imagen.jpg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descripción
                    </label>
                    <textarea
                        name="description"
                        required
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Descripción del producto..."
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate("/admin/productos")}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                        {loading ? "Guardando..." : isEditMode ? "Actualizar Producto" : "Guardar Producto"}
                    </button>
                </div>
            </form>
        </section>
    )
}
