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
