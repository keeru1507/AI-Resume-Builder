import { Link, useParams, useNavigate } from 'react-router-dom'
import { useArtifacts, STEP_KEYS, type StepKey } from '../store/ArtifactStore'

const ROUTES: Record<StepKey, string> = {
  '01': '/rb/01-problem',
  '02': '/rb/02-market',
  '03': '/rb/03-architecture',
  '04': '/rb/04-hld',
  '05': '/rb/05-lld',
  '06': '/rb/06-build',
  '07': '/rb/07-test',
  '08': '/rb/08-ship',
}

const STEP_LABELS: Record<StepKey, string> = {
  '01': 'Problem',
  '02': 'Market',
  '03': 'Architecture',
  '04': 'HLD',
  '05': 'LLD',
  '06': 'Build',
  '07': 'Test',
  '08': 'Ship',
}

export default function RBStep() {
  const { stepSlug } = useParams<{ stepSlug: string }>()
  const navigate = useNavigate()
  const { hasArtifact } = useArtifacts()

  const stepKey = stepSlug?.slice(0, 2) as StepKey | undefined
  if (!stepKey || !STEP_KEYS.includes(stepKey)) {
    return (
      <div className="step-content">
        <p>Invalid step.</p>
        <Link to="/rb/01-problem">Go to Step 1</Link>
      </div>
    )
  }

  const idx = STEP_KEYS.indexOf(stepKey)
  const prevKey = idx > 0 ? STEP_KEYS[idx - 1] : null
  const nextKey = idx < STEP_KEYS.length - 1 ? STEP_KEYS[idx + 1] : null
  const canProceed = hasArtifact(stepKey)

  return (
    <div className="step-content">
      <h2>Step {stepKey}: {STEP_LABELS[stepKey]}</h2>
      <p>Complete this step and add your artifact in the build panel on the right. You cannot proceed until an artifact is uploaded.</p>

      <div className="step-nav">
        {prevKey ? (
          <Link to={ROUTES[prevKey]} className="btn btn-secondary">
            ← Previous
          </Link>
        ) : (
          <span />
        )}
        {nextKey ? (
          <button
            type="button"
            className="btn btn-primary"
            disabled={!canProceed}
            onClick={() => navigate(ROUTES[nextKey])}
          >
            Next →
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            disabled={!canProceed}
            onClick={() => navigate('/rb/proof')}
          >
            Go to Step 9: Proof →
          </button>
        )}
      </div>
    </div>
  )
}
