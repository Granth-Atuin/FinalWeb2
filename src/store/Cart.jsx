import { createContext, useContext, useEffect, useState } from "react"
import { load, save } from "../utils/storage"

const CartContext = createContext(null)
export function CartProvider({ children }) {
    const [items, setItems] = useState(() => load("cart:v1", []))
    useEffect(() => {
        save("cart:v1", items)
    }, [items])
    const add = (product, qty = 1) => {
        if (!product || !product.id) return
        setItems((prev) => {
            const index = prev.findIndex((p) => p.id === product.id)
            if (index !== -1) {
                const clone = [...prev]
                clone[index] = {
                    ...clone[index],
                    qty: clone[index].qty + qty,
                }
                return clone
            }
            return [
                ...prev,
                {
                    id: product.id,
                    nombre: product.nombre,
                    precio: Number(product.precio ?? 0),
                    image: product.image,
                    qty,
                },
            ]
        })
    }
    const update = (id, qty) => {
        setItems((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, qty: Math.max(1, qty) } : p
            )
        )
    }
    const remove = (id) => {
        setItems((prev) => prev.filter((p) => p.id !== id))
    }
    const clear = () => {
        setItems([])
    }
    const totalQty = items.reduce((acc, p) => acc + p.qty, 0)
    const total = items.reduce((acc, p) => acc + p.qty * p.precio, 0)
    const value = {
        items,
        add,
        update,
        remove,
        clear,
        totalQty,
        total,
        // Alias para compatibilidad
        cart: items,
        updateQty: update,
    }
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error("CartProvider missing")
    return ctx
}
