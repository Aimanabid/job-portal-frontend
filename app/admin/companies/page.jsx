import Companies from '../../../src/components/admin/Companies'
import ProtectedRoute from '../../../src/components/admin/ProtectedRoute'

export default function AdminCompaniesPage() {
  return (
    <ProtectedRoute>
      <Companies />
    </ProtectedRoute>
  )
}
