import { useEffect, useState } from "react"

export function useFetch<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await fetch(url)
        const contentType = res.headers.get("content-type");
        const json = contentType?.includes("application/json") ? await res.json() : null;

        if (!res.ok) {
          throw new Error(json?.message || `Request failed: ${res.status}`);
        }

        if (mounted) setData(json)
      } catch (err) {
        if (mounted) setError("Failed to fetch")
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchData()

    return () => {
      mounted = false
    }
  }, [url])

  return { data, loading, error }
}