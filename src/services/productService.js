import { MOCK_PRODUCTS } from "../data/mockData"
import { API_URL, API_TOKEN } from "../utils/constants"

export async function getProducts() {
    try {
        const res = await fetch(`${API_URL}/products/`, {
            cache: 'no-store',
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
            },
        })
        if (!res.ok) throw new Error("Error al obtener productos")
        return await res.json()
    } catch (error) {
        console.warn("API Error, falling back to mock data:", error)
        return MOCK_PRODUCTS
    }
}

export async function addProduct(product) {
    const res = await fetch(`${API_URL}/products/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify(product),
    })

    if (!res.ok) {
        const errorData = await res.text()
        throw new Error(`Error al crear el producto: ${errorData}`)
    }

    return res.json()
}

export async function updateProduct(id, product) {
    const res = await fetch(`${API_URL}/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify(product),
    })

    if (!res.ok) {
        const errorData = await res.text()
        throw new Error(`Error al actualizar el producto: ${errorData}`)
    }

    return res.json()
}

export async function deleteProduct(id) {
    const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
        },
    })

    if (!res.ok) {
        throw new Error("Error al eliminar el producto")
    }

    return res.json()
}

export async function getProduct(id) {
    try {
        const res = await fetch(`${API_URL}/products/${id}`, {
            cache: 'no-store',
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
            },
        })
        if (!res.ok) throw new Error("Error al obtener el producto")
        return await res.json()
    } catch (error) {
        console.warn("API Error, falling back to mock data:", error)
        const product = MOCK_PRODUCTS.find(p => p.id == id)
        if (product) return product
        throw error
    }
}

export async function uploadProductImage(id, file) {
    const formData = new FormData()
    formData.append("files", file)

    const res = await fetch(`${API_URL}/products/${id}/pictures`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
        },
        body: formData,
    })

    if (!res.ok) {
        const errorData = await res.text()
        throw new Error(`Error al subir imagen: ${errorData}`)
    }

    return res.json()
}
