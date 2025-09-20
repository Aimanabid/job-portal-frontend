import CompanyCreate from '../../../../src/components/admin/CompanyCreate'
import ProtectedRoute from '../../../../src/components/admin/ProtectedRoute'

export default function AdminCompanyCreatePage() {
  return (
    <ProtectedRoute>
      <CompanyCreate />
    </ProtectedRoute>
  )
}
