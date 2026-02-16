import { useTemplate } from '../store/TemplateStore'
import { THEME_HSL } from '../store/TemplateStore'
import type { ThemeId } from '../store/TemplateStore'

const THEMES: { id: ThemeId; label: string }[] = [
  { id: 'teal', label: 'Teal' },
  { id: 'navy', label: 'Navy' },
  { id: 'burgundy', label: 'Burgundy' },
  { id: 'forest', label: 'Forest' },
  { id: 'charcoal', label: 'Charcoal' },
]

export default function ColorThemePicker() {
  const { theme, setTheme } = useTemplate()

  return (
    <div className="color-theme-picker" role="group" aria-label="Color theme">
      {THEMES.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className={`color-theme-circle ${theme === id ? 'active' : ''}`}
          style={{ background: THEME_HSL[id] }}
          onClick={() => setTheme(id)}
          title={label}
          aria-label={label}
          aria-pressed={theme === id}
        />
      ))}
    </div>
  )
}
