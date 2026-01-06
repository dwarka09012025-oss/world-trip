import { Outlet } from 'react-router-dom'
import AdminHeader from '../components/admin/AdminHeader'
import './AdminLayout.css'

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminHeader />
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout

