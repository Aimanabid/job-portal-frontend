import CompanySetup from '../../../../src/components/admin/CompanySetup'
import ProtectedRoute from '../../../../src/components/admin/ProtectedRoute'

export default function AdminCompanySetupPage({ params }) {
  return (
    <ProtectedRoute>
      <CompanySetup id={params.id} />
    </ProtectedRoute>
  )
}
