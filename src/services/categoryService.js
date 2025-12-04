import { MOCK_CATEGORIES } from "../data/mockData"

export async function getCategories() {
    try {
        const res = await fetch("https://ecommerce.fedegonzalez.com/categories/", {
            headers: {
                Authorization: "Bearer 022",
            },
        })
        if (!res.ok) throw new Error("Error al obtener categorías")
        return await res.json()
    } catch (error) {
        console.warn("API Error, falling back to mock data:", error)
        return MOCK_CATEGORIES
    }
}

export async function getCategory(id) {
    try {
        const res = await fetch(`https://ecommerce.fedegonzalez.com/categories/${id}`)
        if (!res.ok) throw new Error("Error al obtener la categoría")
        return await res.json()
    } catch (error) {
        console.warn("API Error, falling back to mock data:", error)
        const category = MOCK_CATEGORIES.find(c => c.id == id)
        if (category) return category
        throw error
    }
}

export async function createCategory(category) {
    const res = await fetch("https://ecommerce.fedegonzalez.com/categories/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 022",
        },
        body: JSON.stringify(category),
    })
    if (!res.ok) throw new Error("Error al crear categoría")
    return res.json()
}

export async function updateCategory(id, category) {
    const res = await fetch(`https://ecommerce.fedegonzalez.com/categories/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 022",
        },
        body: JSON.stringify(category),
    })
    if (!res.ok) throw new Error("Error al actualizar categoría")
    return res.json()
}

export async function deleteCategory(id) {
    const res = await fetch(`https://ecommerce.fedegonzalez.com/categories/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer 022",
        },
    })
    if (!res.ok) throw new Error("Error al eliminar categoría")
    return res.json()
}
