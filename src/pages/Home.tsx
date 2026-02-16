import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home-page">
      <h1 className="home-headline">Build a Resume That Gets Read.</h1>
      <p className="home-sub">Create a clear, ATS-friendly resume with a clean structure. No clutter.</p>
      <Link to="/builder" className="btn btn-primary btn-cta">
        Start Building
      </Link>
    </div>
  )
}
