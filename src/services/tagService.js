import { API_URL, API_TOKEN } from "../utils/constants"

export async function createTag(title) {
    const res = await fetch(`${API_URL}/tags/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ title }),
    })

    if (!res.ok) {
        console.warn("Error creating tag:", await res.text())
        return null
    }

    return res.json()
}

export async function getTags() {
    const res = await fetch(`${API_URL}/tags/`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
        },
    })
    if (!res.ok) return []
    return res.json()
}

export async function ensureTag(title) {
    const tags = await getTags()
    const existing = tags.find(t => t.title.toLowerCase() === title.toLowerCase())
    if (existing) return existing

    return createTag(title)
}
