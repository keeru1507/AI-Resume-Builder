import { useState, useCallback, KeyboardEvent } from 'react'
import type { ProjectEntry } from '../store/ResumeStore'

const DESC_MAX = 200

interface ProjectCardProps {
  project: ProjectEntry
  onUpdate: (patch: Partial<ProjectEntry>) => void
  onRemove: () => void
}

export default function ProjectCard({ project, onUpdate, onRemove }: ProjectCardProps) {
  const [open, setOpen] = useState(true)
  const [techInput, setTechInput] = useState('')

  const descLen = (project.description ?? '').length
  const overMax = descLen > DESC_MAX

  const addTech = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        const t = techInput.trim()
        if (t && !project.techStack.includes(t)) {
          onUpdate({ techStack: [...project.techStack, t] })
          setTechInput('')
        }
      }
    },
    [techInput, project.techStack, onUpdate]
  )

  return (
    <div className="project-accordion-card">
      <div className="project-accordion-header" onClick={() => setOpen((o) => !o)}>
        <span className="project-accordion-title">{project.name || 'Untitled Project'}</span>
        <span className="project-accordion-chevron">{open ? '▼' : '▶'}</span>
      </div>
      {open && (
        <div className="project-accordion-body">
          <label className="form-full">
            <span>Project Title</span>
            <input
              type="text"
              value={project.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              placeholder="Project name"
              className="form-input-full"
            />
          </label>
          <label className="form-full">
            <span>Description ({descLen}/{DESC_MAX})</span>
            <textarea
              value={project.description}
              onChange={(e) => onUpdate({ description: e.target.value.slice(0, DESC_MAX) })}
              placeholder="Brief description..."
              rows={3}
              className={`form-textarea ${overMax ? 'form-input-invalid' : ''}`}
            />
          </label>
          <label className="form-full">
            <span>Tech Stack</span>
            <div className="skill-pills-wrap">
              {project.techStack.map((t, i) => (
                <span key={`${t}-${i}`} className="skill-pill">
                  {t}
                  <button type="button" className="skill-pill-remove" onClick={() => onUpdate({ techStack: project.techStack.filter((_, j) => j !== i) })} aria-label={`Remove ${t}`}>×</button>
                </span>
              ))}
              <input
                type="text"
                className="skill-tag-input"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={addTech}
                placeholder="Type and press Enter"
              />
            </div>
          </label>
          <label>
            <span>Live URL</span>
            <input type="url" value={project.liveUrl} onChange={(e) => onUpdate({ liveUrl: e.target.value })} placeholder="https://..." className="form-input-full" />
          </label>
          <label>
            <span>GitHub URL</span>
            <input type="url" value={project.githubUrl} onChange={(e) => onUpdate({ githubUrl: e.target.value })} placeholder="https://github.com/..." className="form-input-full" />
          </label>
          <button type="button" className="btn-remove project-delete-btn" onClick={onRemove}>Delete project</button>
        </div>
      )}
    </div>
  )
}
