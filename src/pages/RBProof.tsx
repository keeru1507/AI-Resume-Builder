import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useArtifacts, STEP_KEYS, type StepKey } from '../store/ArtifactStore'

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

const STEP_ROUTES: Record<StepKey, string> = {
  '01': '/rb/01-problem',
  '02': '/rb/02-market',
  '03': '/rb/03-architecture',
  '04': '/rb/04-hld',
  '05': '/rb/05-lld',
  '06': '/rb/06-build',
  '07': '/rb/07-test',
  '08': '/rb/08-ship',
}

const CHECKLIST_ITEMS = [
  'All form sections save to localStorage',
  'Live preview updates in real-time',
  'Template switching preserves data',
  'Color theme persists after refresh',
  'ATS score calculates correctly',
  'Score updates live on edit',
  'Export buttons work (copy/download)',
  'Empty states handled gracefully',
  'Mobile responsive layout works',
  'No console errors on any page',
]

function isValidUrl(s: string): boolean {
  const t = s.trim()
  if (!t) return false
  try {
    const u = new URL(t)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

function buildFinalSubmissionText(proofLinks: { lovable: string; github: string; deploy: string }): string {
  return `------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: ${proofLinks.lovable || ''}
GitHub Repository: ${proofLinks.github || ''}
Live Deployment: ${proofLinks.deploy || ''}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist
------------------------------------------`
}

export default function RBProof() {
  const {
    proofLinks,
    setProofLinks,
    hasArtifact,
    checklist,
    setChecklistItem,
    isShipped,
    allProofLinksProvided,
  } = useArtifacts()
  const [copied, setCopied] = useState(false)
  const [touched, setTouched] = useState({ lovable: false, github: false, deploy: false })

  const stepStatus: Record<StepKey, boolean> = {} as Record<StepKey, boolean>
  STEP_KEYS.forEach((k) => {
    stepStatus[k] = hasArtifact(k)
  })

  const showLovableError = touched.lovable && proofLinks.lovable.trim() !== '' && !isValidUrl(proofLinks.lovable)
  const showGithubError = touched.github && proofLinks.github.trim() !== '' && !isValidUrl(proofLinks.github)
  const showDeployError = touched.deploy && proofLinks.deploy.trim() !== '' && !isValidUrl(proofLinks.deploy)

  const handleCopyFinal = useCallback(() => {
    navigator.clipboard.writeText(buildFinalSubmissionText(proofLinks)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [proofLinks])

  return (
    <div className="proof-page rb-proof-page">
      {isShipped && (
        <div className="rb-shipped-message" role="status">
          Project 3 Shipped Successfully.
        </div>
      )}

      <h2>Proof & submission</h2>
      <p>Complete all 8 steps, pass the verification checklist, and provide the three proof links. When all are done, the status at the top right will automatically show <strong>Shipped</strong> — there is no separate Ship button.</p>

      <section className="rb-proof-section">
        <h3>A) Step Completion Overview</h3>
        <p className="rb-proof-hint">Click a step to go to that step and add your artifact.</p>
        <ul className="proof-step-list proof-step-list-clickable">
          {STEP_KEYS.map((key) => (
            <li key={key}>
              <span className={`proof-dot ${stepStatus[key] ? 'done' : 'pending'}`} aria-hidden />
              <Link to={STEP_ROUTES[key]} className="proof-step-link">
                Step {key}: {STEP_LABELS[key]} — {stepStatus[key] ? 'Complete' : 'Pending'}
              </Link>
            </li>
          ))}
          <li>
            <span className={`proof-dot ${allProofLinksProvided ? 'done' : 'pending'}`} aria-hidden />
            <span className="proof-step-current">Step 09: Proof — {allProofLinksProvided ? 'Complete' : 'Pending'}</span>
          </li>
        </ul>
      </section>

      <section className="rb-proof-section">
        <h3>B) Artifact Collection (Required to mark Shipped)</h3>
        <p className="rb-proof-hint">All three URLs must be valid (http or https).</p>
        <div className="proof-links rb-proof-links">
          <label>
            Lovable Project Link
            <input
              type="url"
              placeholder="https://..."
              value={proofLinks.lovable}
              onChange={(e) => setProofLinks({ lovable: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, lovable: true }))}
              className={showLovableError ? 'input-invalid' : ''}
              aria-invalid={showLovableError}
            />
            {showLovableError && <span className="proof-input-error">Enter a valid URL (e.g. https://...)</span>}
          </label>
          <label>
            GitHub Repository Link
            <input
              type="url"
              placeholder="https://github.com/..."
              value={proofLinks.github}
              onChange={(e) => setProofLinks({ github: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, github: true }))}
              className={showGithubError ? 'input-invalid' : ''}
              aria-invalid={showGithubError}
            />
            {showGithubError && <span className="proof-input-error">Enter a valid URL (e.g. https://github.com/...)</span>}
          </label>
          <label>
            Deployed URL
            <input
              type="url"
              placeholder="https://..."
              value={proofLinks.deploy}
              onChange={(e) => setProofLinks({ deploy: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, deploy: true }))}
              className={showDeployError ? 'input-invalid' : ''}
              aria-invalid={showDeployError}
            />
            {showDeployError && <span className="proof-input-error">Enter a valid URL (e.g. https://...)</span>}
          </label>
        </div>
      </section>

      <section className="rb-proof-section">
        <h3>Verification Checklist (10 tests)</h3>
        <p className="rb-proof-hint">Mark each item after you have verified it. All must be checked to mark as Shipped.</p>
        <ul className="rb-checklist-list">
          {CHECKLIST_ITEMS.map((label, i) => (
            <li key={i}>
              <label className="rb-checklist-item">
                <input
                  type="checkbox"
                  checked={checklist[i] ?? false}
                  onChange={(e) => setChecklistItem(i, e.target.checked)}
                />
                <span>{label}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className="rb-proof-section">
        <h3>Final Submission Export</h3>
        <button type="button" className="btn btn-primary copy-final" onClick={handleCopyFinal}>
          {copied ? 'Copied!' : 'Copy Final Submission'}
        </button>
        <p className="rb-proof-hint">Copies Lovable, GitHub, Live Deployment links and core capabilities to the clipboard.</p>
      </section>

      {!allProofLinksProvided && (
        <p className="rb-proof-note">Provide all three valid proof links to unlock Shipped status.</p>
      )}

      <p style={{ marginTop: 24 }}>
        <Link to="/rb/08-ship">← Back to Step 8</Link>
        {' · '}
        <Link to="/rb/01-problem">Step 1</Link>
      </p>
    </div>
  )
}
