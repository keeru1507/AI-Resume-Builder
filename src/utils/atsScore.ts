import type { ResumeData } from '../store/ResumeStore'

const ACTION_VERBS = [
  'built', 'led', 'designed', 'improved', 'created', 'developed', 'implemented',
  'managed', 'delivered', 'achieved', 'optimized', 'automated', 'launched',
  'established', 'increased', 'reduced', 'transformed', 'coordinated',
]

function skillsCount(skills: ResumeData['skills']): number {
  const g = skills as { technical?: string[]; soft?: string[]; tools?: string[] }
  return (g.technical?.length ?? 0) + (g.soft?.length ?? 0) + (g.tools?.length ?? 0)
}

function summaryHasActionVerbs(summary: string): boolean {
  const lower = summary.trim().toLowerCase()
  if (!lower) return false
  return ACTION_VERBS.some((verb) => {
    const re = new RegExp(`\\b${verb}\\b`)
    return re.test(lower)
  })
}

function hasExperienceWithBullets(data: ResumeData): boolean {
  return data.experience.some((e) => Boolean(e.description?.trim()))
}

export interface ATSResult {
  score: number
  band: 'needs-work' | 'getting-there' | 'strong'
  bandLabel: string
  suggestions: string[]
}

export function computeATSScore(data: ResumeData): ATSResult {
  let score = 0
  const { personal, summary, education, projects, skills, github, linkedin } = data

  if (personal.name?.trim()) score += 10
  if (personal.email?.trim()) score += 10
  if (personal.phone?.trim()) score += 5
  if (summary.trim().length > 50) score += 10
  if (hasExperienceWithBullets(data)) score += 15
  if (education.length >= 1) score += 10
  if (skillsCount(skills) >= 5) score += 10
  if (projects.length >= 1) score += 10
  if (linkedin?.trim()) score += 5
  if (github?.trim()) score += 5
  if (summaryHasActionVerbs(summary)) score += 10

  score = Math.min(100, score)

  let band: ATSResult['band']
  let bandLabel: string
  if (score <= 40) {
    band = 'needs-work'
    bandLabel = 'Needs Work'
  } else if (score <= 70) {
    band = 'getting-there'
    bandLabel = 'Getting There'
  } else {
    band = 'strong'
    bandLabel = 'Strong Resume'
  }

  const suggestions: string[] = []
  if (!personal.name?.trim()) suggestions.push('Add your name (+10 points)')
  if (!personal.email?.trim()) suggestions.push('Add your email (+10 points)')
  if (!personal.phone?.trim()) suggestions.push('Add your phone (+5 points)')
  if (summary.trim().length <= 50) suggestions.push('Add a professional summary over 50 characters (+10 points)')
  if (!hasExperienceWithBullets(data)) suggestions.push('Add at least one experience entry with bullet points (+15 points)')
  if (education.length < 1) suggestions.push('Add at least one education entry (+10 points)')
  if (skillsCount(skills) < 5) suggestions.push('Add at least 5 skills (+10 points)')
  if (projects.length < 1) suggestions.push('Add at least one project (+10 points)')
  if (!linkedin?.trim()) suggestions.push('Add your LinkedIn (+5 points)')
  if (!github?.trim()) suggestions.push('Add your GitHub (+5 points)')
  if (summary.trim().length > 50 && !summaryHasActionVerbs(summary)) {
    suggestions.push('Use action verbs in your summary (e.g. built, led, designed) (+10 points)')
  }

  return {
    score,
    band,
    bandLabel,
    suggestions,
  }
}
