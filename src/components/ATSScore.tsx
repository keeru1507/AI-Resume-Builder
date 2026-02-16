import { useResume } from '../store/ResumeStore'
import { computeATSScore } from '../utils/atsScore'

export default function ATSScore() {
  const { data } = useResume()
  const { score, band, bandLabel, suggestions } = computeATSScore(data)

  return (
    <div className="ats-score-block">
      <div className="ats-score-label">ATS Resume Score</div>
      <div className="ats-score-meter-wrap">
        <div className="ats-score-meter" role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100}>
          <div className="ats-score-meter-fill" style={{ width: `${score}%` }} />
        </div>
        <span className="ats-score-value">{score}</span>
      </div>
      <span className={`ats-score-band-inline ats-band-badge ats-band-${band}`}>{bandLabel}</span>
      {suggestions.length > 0 && (
        <ul className="ats-suggestions">
          {suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
