import { createContext, useContext, useCallback, useState, useEffect } from 'react'

const STORAGE_KEY_TEMPLATE = 'resumeBuilderTemplate'
const STORAGE_KEY_THEME = 'resumeBuilderTheme'

export type TemplateId = 'classic' | 'modern' | 'minimal'
export type ThemeId = 'teal' | 'navy' | 'burgundy' | 'forest' | 'charcoal'

export const THEME_HSL: Record<ThemeId, string> = {
  teal: 'hsl(168, 60%, 40%)',
  navy: 'hsl(220, 60%, 35%)',
  burgundy: 'hsl(345, 60%, 35%)',
  forest: 'hsl(150, 50%, 30%)',
  charcoal: 'hsl(0, 0%, 25%)',
}

const DEFAULT_TEMPLATE: TemplateId = 'classic'
const DEFAULT_THEME: ThemeId = 'teal'

function loadTemplate(): TemplateId {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TEMPLATE)
    if (raw === 'classic' || raw === 'modern' || raw === 'minimal') return raw
  } catch {
    // ignore
  }
  return DEFAULT_TEMPLATE
}

function loadTheme(): ThemeId {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_THEME)
    if (raw === 'teal' || raw === 'navy' || raw === 'burgundy' || raw === 'forest' || raw === 'charcoal') return raw
  } catch {
    // ignore
  }
  return DEFAULT_THEME
}

type TemplateContextValue = {
  template: TemplateId
  setTemplate: (t: TemplateId) => void
  theme: ThemeId
  setTheme: (t: ThemeId) => void
  accentHsl: string
}

const TemplateContext = createContext<TemplateContextValue | null>(null)

export function TemplateProvider({ children }: { children: React.ReactNode }) {
  const [template, setTemplateState] = useState<TemplateId>(loadTemplate)
  const [theme, setThemeState] = useState<ThemeId>(loadTheme)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TEMPLATE, template)
    } catch {
      // ignore
    }
  }, [template])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_THEME, theme)
    } catch {
      // ignore
    }
  }, [theme])

  const setTemplate = useCallback((t: TemplateId) => setTemplateState(t), [])
  const setTheme = useCallback((t: ThemeId) => setThemeState(t), [])

  const value: TemplateContextValue = {
    template,
    setTemplate,
    theme,
    setTheme,
    accentHsl: THEME_HSL[theme],
  }

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  )
}

export function useTemplate() {
  const ctx = useContext(TemplateContext)
  if (!ctx) throw new Error('useTemplate must be used within TemplateProvider')
  return ctx
}
