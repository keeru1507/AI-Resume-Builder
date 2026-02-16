import { useState, useCallback, KeyboardEvent } from 'react'

interface SkillTagInputProps {
  label: string
  count: number
  skills: string[]
  onAdd: (skill: string) => void
  onRemove: (index: number) => void
  placeholder?: string
}

export default function SkillTagInput({ label, count, skills, onAdd, onRemove, placeholder }: SkillTagInputProps) {
  const [input, setInput] = useState('')

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        const trimmed = input.trim()
        if (trimmed) {
          onAdd(trimmed)
          setInput('')
        }
      }
    },
    [input, onAdd]
  )

  return (
    <div className="skill-category">
      <h4 className="skill-category-title">{label} ({count})</h4>
      <div className="skill-pills-wrap">
        {skills.map((s, i) => (
          <span key={`${s}-${i}`} className="skill-pill">
            {s}
            <button type="button" className="skill-pill-remove" onClick={() => onRemove(i)} aria-label={`Remove ${s}`}>×</button>
          </span>
        ))}
        <input
          type="text"
          className="skill-tag-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder ?? 'Type and press Enter'}
        />
      </div>
    </div>
  )
}
