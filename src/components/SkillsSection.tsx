import { useState, useCallback } from 'react'
import { useResume } from '../store/ResumeStore'
import type { SkillsCategory } from '../store/ResumeStore'
import SkillTagInput from './SkillTagInput'

const SUGGESTED = {
  technical: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL'],
  soft: ['Team Leadership', 'Problem Solving'],
  tools: ['Git', 'Docker', 'AWS'],
} as const

const CATEGORIES: { id: SkillsCategory; label: string }[] = [
  { id: 'technical', label: 'Technical Skills' },
  { id: 'soft', label: 'Soft Skills' },
  { id: 'tools', label: 'Tools & Technologies' },
]

export default function SkillsSection() {
  const { data, addSkill, removeSkill } = useResume()
  const [suggesting, setSuggesting] = useState(false)

  const handleSuggestClick = useCallback(() => {
    setSuggesting(true)
    setTimeout(() => {
      (Object.keys(SUGGESTED) as SkillsCategory[]).forEach((cat) => {
        SUGGESTED[cat].forEach((skill) => addSkill(cat, skill))
      })
      setSuggesting(false)
    }, 1000)
  }, [addSkill])

  return (
    <section className="form-section skills-accordion">
      <div className="form-section-head">
        <h3 className="form-section-title">Skills</h3>
        <button type="button" className="btn btn-secondary btn-sm" onClick={handleSuggestClick} disabled={suggesting}>
          {suggesting ? 'Adding…' : '✨ Suggest Skills'}
        </button>
      </div>
      {CATEGORIES.map(({ id, label }) => (
        <SkillTagInput
          key={id}
          label={label}
          count={data.skills[id].length}
          skills={data.skills[id]}
          onAdd={(skill) => addSkill(id, skill)}
          onRemove={(index) => removeSkill(id, index)}
        />
      ))}
    </section>
  )
}
