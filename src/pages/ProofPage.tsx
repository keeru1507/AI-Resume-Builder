import { Link } from 'react-router-dom'

export default function ProofPage() {
  return (
    <div className="proof-placeholder-page">
      <h2>Proof</h2>
      <p>Step completion, artifact collection, and final submission for Project 3 are in the Build Track.</p>
      <p>
        <Link to="/rb/proof" className="proof-page-cta">Go to Proof &amp; submission →</Link>
      </p>
    </div>
  )
}
