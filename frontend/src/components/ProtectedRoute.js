import { Navigate } from 'react-router-dom'
// components
import Spinner from './Spinner'
// context
import { useAuth } from 'context/AuthContext'

export function ProtectedRoute ({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <Spinner />

  if (!user) return <Navigate to='/login' />

  return <>{children}</>
}
