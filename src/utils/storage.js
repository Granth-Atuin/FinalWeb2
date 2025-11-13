export const load = (key, fallback) => {
    try {
        const value = localStorage.getItem(key)
        return value ? JSON.parse(value) : fallback
    } catch {
        return fallback
    }
}
export const save = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value))
    } catch {}
}
