import { useState, useEffect } from "react"
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "../data/mockData"

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!url) return

    let cancel = false

    async function load() {
      try {
        setLoading(true)

        // Evitar llamadas a la API si sabemos que fallaran (403)
        if (url.includes("ecommerce.fedegonzalez.com")) {
          console.info("Usando datos de prueba para API restringida:", url)
          if (url.includes("/categories")) {
            if (!cancel) setData(MOCK_CATEGORIES)
            return
          }
          if (url.includes("/products")) {
            if (!cancel) setData(MOCK_PRODUCTS)
            return
          }
        }

        const res = await fetch(url)

        if (!res.ok) {
          // Si hay error 403 u otro, usar datos de prueba
          console.info(`API access restricted (${res.status}). Switching to mock data.`)
          if (url.includes("/categories")) {
            if (!cancel) setData(MOCK_CATEGORIES)
            return
          }
          if (url.includes("/products")) {
            if (!cancel) setData(MOCK_PRODUCTS)
            return
          }
          throw new Error("HTTP " + res.status)
        }

        const json = await res.json()
        if (!cancel) setData(json)
      } catch (err) {
        console.error("Fetch error:", err)
        // Respaldo en caso de error
        if (url.includes("/categories")) {
          if (!cancel) setData(MOCK_CATEGORIES)
        } else if (url.includes("/products")) {
          if (!cancel) setData(MOCK_PRODUCTS)
        } else {
          if (!cancel) setData(null)
        }
      } finally {
        if (!cancel) setLoading(false)
      }
    }

    load()

    return () => {
      cancel = true
    }
  }, [url])

  return { data, loading }
}
