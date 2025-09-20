import Applicants from '../../../../../src/components/admin/Applicants'
import ProtectedRoute from '../../../../../src/components/admin/ProtectedRoute'
export default function AdminApplicantsPage({ params }) {
  return (
    <ProtectedRoute>
      <Applicants id={params.id} />
    </ProtectedRoute>
  )
}
