import AdminJobs from '../../../src/components/admin/AdminJobs'
import ProtectedRoute from '../../../src/components/admin/ProtectedRoute'

export default function AdminJobsPage() {
  return (
    <ProtectedRoute>
      <AdminJobs />
    </ProtectedRoute>
  )
}
