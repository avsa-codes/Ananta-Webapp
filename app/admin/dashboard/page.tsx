import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function AdminDashboardPage() {
  const isAdmin = cookies().get('admin-auth')

  if (!isAdmin) {
    redirect('/admin/login')
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      <p>You are logged in as admin.</p>
    </div>
  )
}
