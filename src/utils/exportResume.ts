import type { ResumeData } from '../store/ResumeStore'

export function resumeToPlainText(data: ResumeData): string {
  const lines: string[] = []
  const { personal, summary, education, experience, projects, skills: rawSkills, github, linkedin } = data
  const skills = rawSkills && typeof rawSkills === 'object' && !Array.isArray(rawSkills) ? rawSkills : null

  lines.push('Name')
  lines.push(personal.name || '')
  lines.push('')
  lines.push('Contact')
  const contact = [personal.email, personal.phone, personal.location].filter(Boolean)
  lines.push(contact.length ? contact.join(' · ') : '')
  lines.push('')

  if (summary?.trim()) {
    lines.push('Summary')
    lines.push(summary.trim())
    lines.push('')
  }

  if (education.length > 0) {
    lines.push('Education')
    education.forEach((e) => {
      const school = e.school || 'School'
      const dates = [e.start, e.end].filter(Boolean).join(' – ')
      const sub = [e.degree, e.field].filter(Boolean).join(' · ')
      lines.push(`${school}${dates ? `  ${dates}` : ''}`)
      if (sub) lines.push(sub)
    })
    lines.push('')
  }

  if (experience.length > 0) {
    lines.push('Experience')
    experience.forEach((e) => {
      const role = e.role || 'Role'
      const dates = [e.start, e.end].filter(Boolean).join(' – ')
      lines.push(`${role}${dates ? `  ${dates}` : ''}`)
      lines.push(e.company || 'Company')
      if (e.description?.trim()) lines.push(e.description.trim())
    })
    lines.push('')
  }

  if (projects.length > 0) {
    lines.push('Projects')
    projects.forEach((p) => {
      lines.push(p.name || 'Project')
      if (p.description?.trim()) lines.push(p.description.trim())
      if (p.techStack?.length) lines.push(p.techStack.join(', '))
      if (p.liveUrl?.trim()) lines.push(`Live: ${p.liveUrl.trim()}`)
      if (p.githubUrl?.trim()) lines.push(`GitHub: ${p.githubUrl.trim()}`)
    })
    lines.push('')
  }

  const skillGroups = skills && typeof skills === 'object' && !Array.isArray(skills)
    ? (skills as { technical?: string[]; soft?: string[]; tools?: string[] })
    : null
  if (skillGroups && (skillGroups.technical?.length || skillGroups.soft?.length || skillGroups.tools?.length)) {
    lines.push('Skills')
    if (skillGroups.technical?.length) lines.push('Technical: ' + skillGroups.technical.join(', '))
    if (skillGroups.soft?.length) lines.push('Soft: ' + skillGroups.soft.join(', '))
    if (skillGroups.tools?.length) lines.push('Tools: ' + skillGroups.tools.join(', '))
    lines.push('')
  }

  lines.push('Links')
  if (github?.trim()) lines.push(`GitHub: ${github.trim()}`)
  if (linkedin?.trim()) lines.push(`LinkedIn: ${linkedin.trim()}`)
  if (!github?.trim() && !linkedin?.trim()) lines.push('')

  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim()
}

export function isResumeIncomplete(data: ResumeData): boolean {
  const noName = !data.personal.name?.trim()
  const noProjectOrExperience = data.projects.length === 0 && data.experience.length === 0
  return noName || noProjectOrExperience
}
