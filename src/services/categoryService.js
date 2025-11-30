export async function getCategories() {
    const res = await fetch("https://ecommerce.fedegonzalez.com/categories/", {
        headers: {
            Authorization: "Bearer 022",
        },
    })
    if (!res.ok) throw new Error("Error al obtener categorías")
    return res.json()
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
