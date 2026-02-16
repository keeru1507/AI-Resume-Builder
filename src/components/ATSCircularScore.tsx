import { useResume } from '../store/ResumeStore'
import { computeATSScore } from '../utils/atsScore'

const RADIUS = 44
const STROKE = 8
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function ATSCircularScore() {
  const { data } = useResume()
  const { score, band, bandLabel, suggestions } = computeATSScore(data)
  const offset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE

  return (
    <div className="ats-circular-wrap">
      <div className="ats-circular-header">ATS Resume Score</div>
      <div className="ats-circular-row">
        <div className="ats-circular-svg-wrap" aria-hidden>
          <svg width="100" height="100" viewBox="0 0 100 100" className="ats-circular-svg">
            <circle
              className="ats-circular-bg"
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              strokeWidth={STROKE}
            />
            <circle
              className={`ats-circular-fill ats-band-${band}`}
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              strokeWidth={STROKE}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>
          <span className="ats-circular-value">{score}</span>
        </div>
        <div className="ats-circular-band">
          <span className={`ats-band-badge ats-band-${band}`}>{bandLabel}</span>
        </div>
      </div>
      {suggestions.length > 0 && (
        <ul className="ats-circular-suggestions">
          {suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
