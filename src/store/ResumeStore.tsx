import { createContext, useContext, useCallback, useState, useMemo, useEffect } from 'react'

const STORAGE_KEY = 'resumeBuilderData'

export interface PersonalInfo {
  name: string
  email: string
  phone: string
  location: string
}

export interface EducationEntry {
  id: string
  school: string
  degree: string
  field: string
  start: string
  end: string
}

export interface ExperienceEntry {
  id: string
  company: string
  role: string
  start: string
  end: string
  description: string
}

export interface ProjectEntry {
  id: string
  name: string
  description: string
  techStack: string[]
  liveUrl: string
  githubUrl: string
}

export type SkillsCategory = 'technical' | 'soft' | 'tools'

export interface SkillsGroups {
  technical: string[]
  soft: string[]
  tools: string[]
}

export interface ResumeData {
  personal: PersonalInfo
  summary: string
  education: EducationEntry[]
  experience: ExperienceEntry[]
  projects: ProjectEntry[]
  skills: SkillsGroups
  github: string
  linkedin: string
}

const defaultPersonal: PersonalInfo = {
  name: '',
  email: '',
  phone: '',
  location: '',
}

const defaultSkills: SkillsGroups = {
  technical: [],
  soft: [],
  tools: [],
}

const defaultData: ResumeData = {
  personal: { ...defaultPersonal },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: { ...defaultSkills },
  github: '',
  linkedin: '',
}

const sampleData: ResumeData = {
  personal: {
    name: 'Jordan Chen',
    email: 'jordan.chen@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
  },
  summary: 'Software engineer with 5+ years building scalable web applications. Focus on clean architecture and user experience.',
  education: [
    { id: 'e1', school: 'Stanford University', degree: 'B.S.', field: 'Computer Science', start: '2016', end: '2020' },
  ],
  experience: [
    { id: 'x1', company: 'Tech Corp', role: 'Senior Software Engineer', start: '2022', end: 'Present', description: 'Lead frontend initiatives. Shipped features used by 2M+ users.' },
    { id: 'x2', company: 'Startup Inc', role: 'Software Engineer', start: '2020', end: '2022', description: 'Full-stack development. Built APIs and dashboards.' },
  ],
  projects: [
    { id: 'p1', name: 'Open Source CLI', description: 'Developer tool with 10k+ downloads.', techStack: ['Node.js', 'TypeScript'], liveUrl: '', githubUrl: 'https://github.com/example/cli' },
  ],
  skills: {
    technical: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL'],
    soft: [],
    tools: [],
  },
  github: 'https://github.com/jordanchen',
  linkedin: 'https://linkedin.com/in/jordanchen',
}

type ResumeContextValue = {
  data: ResumeData
  setPersonal: (p: Partial<PersonalInfo>) => void
  setSummary: (s: string) => void
  setEducation: (list: EducationEntry[]) => void
  addEducation: () => void
  removeEducation: (id: string) => void
  updateEducation: (id: string, patch: Partial<EducationEntry>) => void
  setExperience: (list: ExperienceEntry[]) => void
  addExperience: () => void
  removeExperience: (id: string) => void
  updateExperience: (id: string, patch: Partial<ExperienceEntry>) => void
  setProjects: (list: ProjectEntry[]) => void
  addProject: () => void
  removeProject: (id: string) => void
  updateProject: (id: string, patch: Partial<ProjectEntry>) => void
  addSkill: (category: SkillsCategory, skill: string) => void
  removeSkill: (category: SkillsCategory, index: number) => void
  setSkillsCategory: (category: SkillsCategory, skills: string[]) => void
  setLinks: (links: { github?: string; linkedin?: string }) => void
  loadSampleData: () => void
}

const ResumeContext = createContext<ResumeContextValue | null>(null)

function makeId() {
  return Math.random().toString(36).slice(2, 10)
}

function ensureIds<T extends { id: string }>(items: T[]): T[] {
  return items.map((item) => (item.id ? item : { ...item, id: makeId() }))
}

function normalizeProject(p: Record<string, unknown> & { id: string }): ProjectEntry {
  const hasOldShape = 'url' in p && !('githubUrl' in p)
  return {
    id: p.id,
    name: typeof p.name === 'string' ? p.name : '',
    description: typeof p.description === 'string' ? p.description : '',
    techStack: Array.isArray(p.techStack) ? (p.techStack as string[]) : [],
    liveUrl: typeof p.liveUrl === 'string' ? p.liveUrl : '',
    githubUrl: typeof p.githubUrl === 'string' ? p.githubUrl : (hasOldShape && typeof p.url === 'string' ? p.url : ''),
  }
}

function loadFromStorage(): ResumeData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultData
    const parsed = JSON.parse(raw) as Record<string, unknown>
    const education = ensureIds(Array.isArray(parsed.education) ? parsed.education : [])
    const experience = ensureIds(Array.isArray(parsed.experience) ? parsed.experience : [])
    const rawProjects = Array.isArray(parsed.projects) ? parsed.projects : []
    const projects = ensureIds(rawProjects).map((p) => normalizeProject(p as Record<string, unknown> & { id: string }))

    let skills: SkillsGroups = { ...defaultSkills }
    if (parsed.skills && typeof parsed.skills === 'object' && !Array.isArray(parsed.skills)) {
      const s = parsed.skills as Record<string, unknown>
      skills = {
        technical: Array.isArray(s.technical) ? s.technical : [],
        soft: Array.isArray(s.soft) ? s.soft : [],
        tools: Array.isArray(s.tools) ? s.tools : [],
      }
    } else if (typeof parsed.skills === 'string') {
      const list = (parsed.skills as string).split(',').map((x) => x.trim()).filter(Boolean)
      skills = { ...defaultSkills, technical: list }
    }

    return {
      ...defaultData,
      personal: { ...defaultPersonal, ...(parsed.personal as object) },
      summary: typeof parsed.summary === 'string' ? parsed.summary : '',
      education,
      experience,
      projects,
      skills,
      github: typeof parsed.github === 'string' ? parsed.github : '',
      linkedin: typeof parsed.linkedin === 'string' ? parsed.linkedin : '',
    }
  } catch {
    return defaultData
  }
}

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ResumeData>(loadFromStorage)

  const setPersonal = useCallback((p: Partial<PersonalInfo>) => {
    setData((prev) => ({ ...prev, personal: { ...prev.personal, ...p } }))
  }, [])

  const setSummary = useCallback((s: string) => {
    setData((prev) => ({ ...prev, summary: s }))
  }, [])

  const setEducation = useCallback((list: EducationEntry[]) => {
    setData((prev) => ({ ...prev, education: list }))
  }, [])

  const addEducation = useCallback(() => {
    setData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { id: makeId(), school: '', degree: '', field: '', start: '', end: '' },
      ],
    }))
  }, [])

  const removeEducation = useCallback((id: string) => {
    setData((prev) => ({ ...prev, education: prev.education.filter((e) => e.id !== id) }))
  }, [])

  const updateEducation = useCallback((id: string, patch: Partial<EducationEntry>) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }))
  }, [])

  const setExperience = useCallback((list: ExperienceEntry[]) => {
    setData((prev) => ({ ...prev, experience: list }))
  }, [])

  const addExperience = useCallback(() => {
    setData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { id: makeId(), company: '', role: '', start: '', end: '', description: '' },
      ],
    }))
  }, [])

  const removeExperience = useCallback((id: string) => {
    setData((prev) => ({ ...prev, experience: prev.experience.filter((e) => e.id !== id) }))
  }, [])

  const updateExperience = useCallback((id: string, patch: Partial<ExperienceEntry>) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }))
  }, [])

  const setProjects = useCallback((list: ProjectEntry[]) => {
    setData((prev) => ({ ...prev, projects: list }))
  }, [])

  const addProject = useCallback(() => {
    setData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { id: makeId(), name: '', description: '', techStack: [], liveUrl: '', githubUrl: '' },
      ],
    }))
  }, [])

  const removeProject = useCallback((id: string) => {
    setData((prev) => ({ ...prev, projects: prev.projects.filter((p) => p.id !== id) }))
  }, [])

  const updateProject = useCallback((id: string, patch: Partial<ProjectEntry>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }))
  }, [])

  const addSkill = useCallback((category: SkillsCategory, skill: string) => {
    const trimmed = skill.trim()
    if (!trimmed) return
    setData((prev) => {
      const list = prev.skills[category]
      if (list.includes(trimmed)) return prev
      return {
        ...prev,
        skills: { ...prev.skills, [category]: [...list, trimmed] },
      }
    })
  }, [])

  const removeSkill = useCallback((category: SkillsCategory, index: number) => {
    setData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((_, i) => i !== index),
      },
    }))
  }, [])

  const setSkillsCategory = useCallback((category: SkillsCategory, skills: string[]) => {
    setData((prev) => ({ ...prev, skills: { ...prev.skills, [category]: skills } }))
  }, [])

  const setLinks = useCallback((links: { github?: string; linkedin?: string }) => {
    setData((prev) => ({
      ...prev,
      ...(links.github !== undefined && { github: links.github }),
      ...(links.linkedin !== undefined && { linkedin: links.linkedin }),
    }))
  }, [])

  const loadSampleData = useCallback(() => {
    setData(JSON.parse(JSON.stringify(sampleData)))
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      // ignore quota or serialization errors
    }
  }, [data])

  const value = useMemo<ResumeContextValue>(
    () => ({
      data,
      setPersonal,
      setSummary,
      setEducation,
      addEducation,
      removeEducation,
      updateEducation,
      setExperience,
      addExperience,
      removeExperience,
      updateExperience,
      setProjects,
      addProject,
      removeProject,
      updateProject,
      addSkill,
      removeSkill,
      setSkillsCategory,
      setLinks,
      loadSampleData,
    }),
    [
      data,
      setPersonal,
      setSummary,
      setEducation,
      addEducation,
      removeEducation,
      updateEducation,
      setExperience,
      addExperience,
      removeExperience,
      updateExperience,
      setProjects,
      addProject,
      removeProject,
      updateProject,
      addSkill,
      removeSkill,
      setSkillsCategory,
      setLinks,
      loadSampleData,
    ]
  )

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
}

export function useResume() {
  const ctx = useContext(ResumeContext)
  if (!ctx) throw new Error('useResume must be used within ResumeProvider')
  return ctx
}
