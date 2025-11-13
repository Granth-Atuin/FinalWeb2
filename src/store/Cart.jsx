import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { load, save } from '../utils/storage'

const CartContext = createContext(null)

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => load('cart:v1', []))
    useEffect(() => {
        save('cart:v1', items)
    }, [items])
    const value = useMemo(() => {
        return {
            items,
            add(product, qty = 1) {
                setItems((prev) => {
                    const index = prev.findIndex((i) => i.id === product.id)
                    if (index >= 0) {
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
                    precio: product.precio,
                    qty,
                },
                ]
                })
            },
            update(id, qty) {
                setItems((prev) =>
                prev.map((i) =>
                    i.id === id ? { ...i, qty: Math.max(1, qty) } : i
                )
                )
            },
            remove(id) {
                setItems((prev) => prev.filter((i) => i.id !== id))
            },
            clear() {
                setItems([])
            },
            totalQty: items.reduce((acc, i) => acc + i.qty, 0),
            total: items.reduce((acc, i) => acc + i.precio * i.qty, 0),
        }
    }, [items])
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}   
export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('CartProvider missing')
    return ctx
}
