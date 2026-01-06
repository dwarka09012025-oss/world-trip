import { Outlet } from 'react-router-dom'
import ClientHeader from '../components/client/ClientHeader'
import Footer from '../components/client/Footer'
import './ClientLayout.css'

const ClientLayout = () => {
  return (
    <div className="client-layout">
      <ClientHeader />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default ClientLayout

