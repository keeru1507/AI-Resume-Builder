import { useTemplate } from '../store/TemplateStore'
import type { TemplateId } from '../store/TemplateStore'

const OPTIONS: { id: TemplateId; label: string }[] = [
  { id: 'classic', label: 'Classic' },
  { id: 'modern', label: 'Modern' },
  { id: 'minimal', label: 'Minimal' },
]

export default function TemplateTabs() {
  const { template, setTemplate } = useTemplate()

  return (
    <div className="template-tabs" role="tablist" aria-label="Resume template">
      {OPTIONS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={template === id}
          className={`template-tab ${template === id ? 'active' : ''}`}
          onClick={() => setTemplate(id)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
