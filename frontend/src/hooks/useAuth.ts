import { useCallback } from "react"
import { useLocalStorage } from "@Hooks/useLocalStorage"

interface StoredUser {
  email: string
  name: string
}

export function useAuth() {
  const [token, setToken] = useLocalStorage<string | null>("authToken", null)
  const [user, setUser] = useLocalStorage<StoredUser | null>("authUser", null)

  const login = useCallback(
    async (email: string, _password: string) => {
      void _password
      await new Promise((resolve) => setTimeout(resolve, 700))
      setToken(`mock-token-${Date.now()}`)
      setUser({ email, name: email.split("@")[0] })
    },
    [setToken, setUser]
  )

  const register = useCallback(
    async (name: string, email: string, _password: string) => {
      void _password
      // TODO: replace with a real API call, e.g.:
      // await fetch("/api/auth/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ name, email, password: _password }),
      // })
      await new Promise((resolve) => setTimeout(resolve, 700))
      setToken(`mock-token-${Date.now()}`)
      setUser({ email, name })
    },
    [setToken, setUser]
  )

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
  }, [setToken, setUser])

  return {
    isAuthenticated: !!token,
    user,
    login,
    register,
    logout,
  }
}