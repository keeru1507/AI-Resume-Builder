import { useResume } from '../store/ResumeStore'

function wordCount(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length
}

function skillsTotal(skills: { technical?: string[]; soft?: string[]; tools?: string[] }): number {
  return (skills.technical?.length ?? 0) + (skills.soft?.length ?? 0) + (skills.tools?.length ?? 0)
}

function hasNumberInText(text: string): boolean {
  if (!text || !text.trim()) return false
  return /\d|%|\b(k|m|M)\b|[\d,]+/.test(text)
}

export default function ImprovementPanel() {
  const { data } = useResume()
  const improvements: string[] = []

  if (data.projects.length < 2) {
    improvements.push('Add at least one more project.')
  }
  const hasNumbers = [
    ...data.experience.map((e) => e.description),
    ...data.projects.map((p) => p.description),
  ].some((d) => hasNumberInText(d ?? ''))
  if (!hasNumbers && (data.experience.length > 0 || data.projects.length > 0)) {
    improvements.push('Add measurable impact (numbers) in bullets.')
  }
  if (wordCount(data.summary) < 40) {
    improvements.push(data.summary.trim() ? 'Expand your summary (target 40+ words).' : 'Add a summary (target 40+ words).')
  }
  if (skillsTotal(data.skills as { technical?: string[]; soft?: string[]; tools?: string[] }) < 8) {
    improvements.push('Add more skills (target 8+).')
  }
  if (data.experience.length === 0) {
    improvements.push('Add internship or project work as experience.')
  }

  const top3 = improvements.slice(0, 3)
  if (top3.length === 0) return null

  return (
    <div className="improvement-panel">
      <div className="improvement-panel-title">Top 3 Improvements</div>
      <ul className="improvement-panel-list">
        {top3.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
