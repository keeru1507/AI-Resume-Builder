import { Outlet, useLocation } from 'react-router-dom'
import type { StepKey } from '../store/ArtifactStore'
import { useArtifacts } from '../store/ArtifactStore'
import BuildPanel from './BuildPanel'

const STEP_SLUGS = ['01-problem', '02-market', '03-architecture', '04-hld', '05-lld', '06-build', '07-test', '08-ship', '09-proof'] as const
const STEP_NUMS: Record<string, number> = {}
STEP_SLUGS.forEach((s, i) => (STEP_NUMS[s] = i + 1))

function getStepFromPath(pathname: string): { stepNum: number; label: string; stepKey: StepKey } | null {
  if (pathname === '/rb/proof') {
    return { stepNum: 9, label: 'Proof', stepKey: '08' }
  }
  const match = pathname.match(/\/rb\/(\d{2}-[a-z0-9-]+)/)
  if (!match) return null
  const slug = match[1]
  const num = STEP_NUMS[slug]
  if (num == null) return null
  const stepKey = slug.slice(0, 2) as StepKey
  const labels: Record<string, string> = {
    '01-problem': 'Problem',
    '02-market': 'Market',
    '03-architecture': 'Architecture',
    '04-hld': 'HLD',
    '05-lld': 'LLD',
    '06-build': 'Build',
    '07-test': 'Test',
    '08-ship': 'Ship',
    '09-proof': 'Proof',
  }
  return { stepNum: num, label: labels[slug] ?? slug, stepKey }
}

export default function PremiumLayout() {
  const location = useLocation()
  const isProof = location.pathname === '/rb/proof'
  const stepInfo = getStepFromPath(location.pathname)
  const { isShipped } = useArtifacts()

  const statusLabel = isProof && isShipped
    ? 'Shipped'
    : stepInfo
      ? 'In progress'
      : isProof
        ? 'Proof'
        : 'Project 3'

  return (
    <div className="premium-layout">
      {/* Top bar */}
      <header className="top-bar">
        <div className="top-bar-left">AI Resume Builder</div>
        <div className="top-bar-center">
          {stepInfo
            ? `Project 3 — Step ${stepInfo.stepNum} of 9`
            : isProof
              ? 'Project 3 — Proof'
              : 'Project 3 — Build Track'}
        </div>
        <div className="top-bar-right">
          <span className={`status-badge ${isProof && isShipped ? 'status-badge-shipped' : ''}`}>{statusLabel}</span>
        </div>
      </header>

      {/* Context header */}
      <div className="context-header">
        {stepInfo ? (
          <>Step {stepInfo.stepNum}: {stepInfo.label}</>
        ) : isProof ? (
          <>Proof & submission</>
        ) : (
          <>AI Resume Builder — Build Track</>
        )}
      </div>

      {/* Main + Build panel row */}
      <div className="workspace-row">
        <main className="main-workspace">
          <Outlet />
        </main>
        {!isProof && stepInfo && (
          <aside className="build-panel-wrap">
            <BuildPanel stepNum={stepInfo.stepNum} stepKey={stepInfo.stepKey} />
          </aside>
        )}
      </div>

      {/* Proof footer — show on step pages and proof */}
      <footer className="proof-footer">
        <a href="/rb/proof">View proof & submission →</a>
      </footer>
    </div>
  )
}
