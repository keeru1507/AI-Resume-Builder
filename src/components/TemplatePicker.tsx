import { useTemplate } from '../store/TemplateStore'
import type { TemplateId } from '../store/TemplateStore'

const OPTIONS: { id: TemplateId; label: string }[] = [
  { id: 'classic', label: 'Classic' },
  { id: 'modern', label: 'Modern' },
  { id: 'minimal', label: 'Minimal' },
]

function ThumbnailClassic() {
  return (
    <div className="template-thumb template-thumb-classic">
      <div className="thumb-line thumb-name" />
      <div className="thumb-line thumb-rule" />
      <div className="thumb-block" />
      <div className="thumb-block" />
      <div className="thumb-block short" />
    </div>
  )
}

function ThumbnailModern() {
  return (
    <div className="template-thumb template-thumb-modern">
      <div className="thumb-sidebar" />
      <div className="thumb-main">
        <div className="thumb-block" />
        <div className="thumb-block" />
      </div>
    </div>
  )
}

function ThumbnailMinimal() {
  return (
    <div className="template-thumb template-thumb-minimal">
      <div className="thumb-line thumb-name" />
      <div className="thumb-spacer" />
      <div className="thumb-block" />
      <div className="thumb-spacer" />
      <div className="thumb-block short" />
    </div>
  )
}

export default function TemplatePicker() {
  const { template, setTemplate } = useTemplate()

  return (
    <div className="template-picker" role="tablist" aria-label="Resume template">
      {OPTIONS.map(({ id, label }) => {
        const active = template === id
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active}
            className={`template-picker-card ${active ? 'active' : ''}`}
            onClick={() => setTemplate(id)}
          >
            {id === 'classic' && <ThumbnailClassic />}
            {id === 'modern' && <ThumbnailModern />}
            {id === 'minimal' && <ThumbnailMinimal />}
            <span className="template-picker-label">{label}</span>
            {active && <span className="template-picker-check" aria-hidden>✓</span>}
          </button>
        )
      })}
    </div>
  )
}
