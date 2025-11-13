import { useEffect, useState } from "react"

export default function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!url) return

    let cancel = false

    async function load() {
      try {
        setLoading(true)

        const res = await fetch(url, {
          headers: {
            Authorization: "Bearer 022",
          },
        })

        if (!res.ok) throw new Error("HTTP " + res.status)

        const json = await res.json()
        if (!cancel) setData(json)
      } catch (err) {
        console.error("Fetch error:", err)
        if (!cancel) setData(null)
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
