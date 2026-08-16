import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { PageSkeleton } from '../ui/Skeleton'

export function ProtectedRoute({ children, roles }) {
  const { user, loading, isAuthenticated } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory p-8">
        <PageSkeleton />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (roles && !roles.includes(user.role)) {
    const fallback =
      user.role === 'student' ? '/app/student' : user.role === 'parent' ? '/app/parent' : '/app'
    return <Navigate to={fallback} replace />
  }

  return children
}
