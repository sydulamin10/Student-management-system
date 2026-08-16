import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export function RoleGate({ roles, children }) {
  const { user } = useAuth()
  if (roles && !roles.includes(user?.role)) {
    const fallback =
      user?.role === 'student' ? '/app/student' : user?.role === 'parent' ? '/app/parent' : '/app'
    return <Navigate to={fallback} replace />
  }
  return children
}
