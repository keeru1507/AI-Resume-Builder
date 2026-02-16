import { createContext, useContext, useCallback, useState, useEffect } from 'react'

const STEP_KEYS = ['01', '02', '03', '04', '05', '06', '07', '08'] as const
export type StepKey = (typeof STEP_KEYS)[number]

function storageKey(step: StepKey) {
  return `rb_step_${step}_artifact`
}

export type ArtifactStatus = 'pending' | 'uploaded' | 'worked' | 'error' | 'screenshot'

export interface StepArtifact {
  value: string
  status: ArtifactStatus
  screenshotUrl?: string
}

type ArtifactState = Partial<Record<StepKey, StepArtifact>>

interface ArtifactContextValue {
  getArtifact: (step: StepKey) => StepArtifact | undefined
  setArtifact: (step: StepKey, value: string) => void
  setArtifactStatus: (step: StepKey, status: ArtifactStatus, screenshotUrl?: string) => void
  hasArtifact: (step: StepKey) => boolean
  proofLinks: { lovable: string; github: string; deploy: string }
  setProofLinks: (links: Partial<{ lovable: string; github: string; deploy: string }>) => void
  checklist: boolean[]
  setChecklistItem: (index: number, value: boolean) => void
  allStepsComplete: boolean
  allChecklistComplete: boolean
  allProofLinksProvided: boolean
  isShipped: boolean
}

const defaultProof = { lovable: '', github: '', deploy: '' }
const PROOF_KEY = 'rb_final_submission'
const CHECKLIST_KEY = 'rb_checklist'

const DEFAULT_CHECKLIST: boolean[] = Array(10).fill(false)

function loadArtifacts(): ArtifactState {
  const state: ArtifactState = {}
  STEP_KEYS.forEach((step) => {
    try {
      const raw = localStorage.getItem(storageKey(step))
      if (raw) {
        const parsed = JSON.parse(raw) as StepArtifact
        state[step] = parsed
      }
    } catch {
      // ignore
    }
  })
  return state
}

function loadProofLinks() {
  try {
    const raw = localStorage.getItem(PROOF_KEY)
    if (raw) return { ...defaultProof, ...JSON.parse(raw) }
  } catch {
    // ignore
  }
  return defaultProof
}

function loadChecklist(): boolean[] {
  try {
    const raw = localStorage.getItem(CHECKLIST_KEY)
    if (raw) {
      const arr = JSON.parse(raw) as unknown
      if (Array.isArray(arr) && arr.length === 10) return arr.map(Boolean)
    }
  } catch {
    // ignore
  }
  return [...DEFAULT_CHECKLIST]
}

const ArtifactContext = createContext<ArtifactContextValue | null>(null)

function isValidUrl(s: string): boolean {
  const t = s.trim()
  if (!t) return false
  try {
    const u = new URL(t)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

export function ArtifactProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ArtifactState>(loadArtifacts)
  const [proofLinks, setProofLinksState] = useState(loadProofLinks)
  const [checklist, setChecklistState] = useState<boolean[]>(loadChecklist)

  useEffect(() => {
    STEP_KEYS.forEach((step) => {
      const a = state[step]
      if (a) localStorage.setItem(storageKey(step), JSON.stringify(a))
    })
  }, [state])

  useEffect(() => {
    localStorage.setItem(PROOF_KEY, JSON.stringify(proofLinks))
  }, [proofLinks])

  useEffect(() => {
    localStorage.setItem(CHECKLIST_KEY, JSON.stringify(checklist))
  }, [checklist])

  const allStepsComplete = STEP_KEYS.every((k) => hasArtifactInternal(state, k))
  const allChecklistComplete = checklist.length === 10 && checklist.every(Boolean)
  const allProofLinksProvided =
    isValidUrl(proofLinks.lovable) &&
    isValidUrl(proofLinks.github) &&
    isValidUrl(proofLinks.deploy)
  const isShipped = allStepsComplete && allChecklistComplete && allProofLinksProvided

  function hasArtifactInternal(s: ArtifactState, step: StepKey) {
    const a = s[step]
    return Boolean(a?.value?.trim())
  }

  const setChecklistItem = useCallback((index: number, value: boolean) => {
    setChecklistState((prev) => {
      const next = [...prev]
      if (index >= 0 && index < 10) next[index] = value
      return next
    })
  }, [])

  const getArtifact = useCallback(
    (step: StepKey) => state[step],
    [state]
  )

  const setArtifact = useCallback((step: StepKey, value: string) => {
    setState((prev) => ({
      ...prev,
      [step]: { ...prev[step], value, status: (prev[step]?.status as ArtifactStatus) || 'pending' },
    }))
  }, [])

  const setArtifactStatus = useCallback(
    (step: StepKey, status: ArtifactStatus, screenshotUrl?: string) => {
      setState((prev) => ({
        ...prev,
        [step]: {
          ...prev[step],
          value: prev[step]?.value ?? '',
          status,
          ...(screenshotUrl !== undefined && { screenshotUrl }),
        },
      }))
    },
    []
  )

  const hasArtifact = useCallback(
    (step: StepKey) => {
      const a = state[step]
      return Boolean(a?.value?.trim())
    },
    [state]
  )

  const setProofLinks = useCallback((next: Partial<{ lovable: string; github: string; deploy: string }>) => {
    setProofLinksState((prev: typeof defaultProof) => ({ ...prev, ...next }))
  }, [])

  const value: ArtifactContextValue = {
    getArtifact,
    setArtifact,
    setArtifactStatus,
    hasArtifact,
    proofLinks,
    setProofLinks,
    checklist,
    setChecklistItem,
    allStepsComplete,
    allChecklistComplete,
    allProofLinksProvided,
    isShipped,
  }

  return <ArtifactContext.Provider value={value}>{children}</ArtifactContext.Provider>
}

export function useArtifacts() {
  const ctx = useContext(ArtifactContext)
  if (!ctx) throw new Error('useArtifacts must be used within ArtifactProvider')
  return ctx
}

export { STEP_KEYS }
