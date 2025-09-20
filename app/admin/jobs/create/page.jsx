import PostJob from '../../../../src/components/admin/PostJob'
import ProtectedRoute from '../../../../src/components/admin/ProtectedRoute'

export default function AdminPostJobPage() {
  return (
    <ProtectedRoute>
      <PostJob />
    </ProtectedRoute>
  )
}
