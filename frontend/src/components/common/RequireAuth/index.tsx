import { ProtectedRoute } from "@Components/common/ProtectedRoute"
import { useAuth } from "@Hooks/useAuth"

export function RequireAuth() {
  const { isAuthenticated } = useAuth()
  return <ProtectedRoute isAuthenticated={isAuthenticated} />
}

export default RequireAuth