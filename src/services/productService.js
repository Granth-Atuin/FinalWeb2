export async function addProduct(product) {
    const res = await fetch("https://ecommerce.fedegonzalez.com/products/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 022",
        },
        body: JSON.stringify(product),
    })

    if (!res.ok) {
        throw new Error("Error al crear el producto")
    }

    return res.json()
}

export async function updateProduct(id, product) {
    const res = await fetch(`https://ecommerce.fedegonzalez.com/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 022",
        },
        body: JSON.stringify(product),
    })

    if (!res.ok) {
        throw new Error("Error al actualizar el producto")
    }

    return res.json()
}

export async function deleteProduct(id) {
    const res = await fetch(`https://ecommerce.fedegonzalez.com/products/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer 022",
        },
    })

    if (!res.ok) {
        throw new Error("Error al eliminar el producto")
    }

    return res.json()
}

export async function getProduct(id) {
    const res = await fetch(`https://ecommerce.fedegonzalez.com/products/${id}`)
    if (!res.ok) throw new Error("Error al obtener el producto")
    return res.json()
}
