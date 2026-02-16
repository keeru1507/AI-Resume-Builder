import { Outlet, NavLink } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div className="app-layout">
      <nav className="app-nav">
        <NavLink to="/" className="app-nav-brand">
          AI Resume Builder
        </NavLink>
        <div className="app-nav-links">
          <NavLink to="/builder" className={({ isActive }) => (isActive ? 'app-nav-link active' : 'app-nav-link')}>
            Builder
          </NavLink>
          <NavLink to="/preview" className={({ isActive }) => (isActive ? 'app-nav-link active' : 'app-nav-link')}>
            Preview
          </NavLink>
          <NavLink to="/proof" className={({ isActive }) => (isActive ? 'app-nav-link active' : 'app-nav-link')}>
            Proof
          </NavLink>
        </div>
      </nav>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
