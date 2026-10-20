import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import RoleSelect from './pages/RoleSelect'
import Login from './pages/Login'
import PanelLayout from './layouts/PanelLayout'
import Placeholder from './pages/Placeholder'
import AdminDashboard from './pages/dashboards/AdminDashboard'
import PersonalDashboard from './pages/dashboards/PersonalDashboard'
import DocenteDashboard from './pages/dashboards/DocenteDashboard'
import EstudianteDashboard from './pages/dashboards/EstudianteDashboard'
import { isRoleId, type RoleId } from './config/roles'

const DASHBOARDS: Record<RoleId, () => JSX.Element> = {
  admin: AdminDashboard,
  personal: PersonalDashboard,
  docente: DocenteDashboard,
  estudiante: EstudianteDashboard,
}

function Dashboard() {
  const { role } = useParams()
  if (!isRoleId(role)) return <Navigate to="/" replace />
  const Page = DASHBOARDS[role]
  return <Page />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelect />} />
      <Route path="/login/:role" element={<Login />} />
      <Route path="/app/:role" element={<PanelLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="*" element={<Placeholder />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
