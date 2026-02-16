import type { ResumeData } from '../store/ResumeStore'
import type { TemplateId } from '../store/TemplateStore'

interface ResumePreviewProps {
  data: ResumeData
  variant: 'live' | 'preview'
  template?: TemplateId
  accentHsl?: string
}

export default function ResumePreview({ data, variant, template = 'classic', accentHsl }: ResumePreviewProps) {
  const isPreview = variant === 'preview'
  const base = isPreview ? 'resume-preview resume-preview-page' : 'resume-preview resume-preview-live'
  const className = `${base} resume-template-${template}`
  const { personal, summary, education, experience, projects, skills: skillGroups, github, linkedin } = data
  const hasAnySkill = (skillGroups.technical?.length ?? 0) + (skillGroups.soft?.length ?? 0) + (skillGroups.tools?.length ?? 0) > 0
  const style = accentHsl ? { '--resume-accent': accentHsl } as React.CSSProperties : undefined

  const contactBlock = (
    <>
      <div className="resume-contact">
        {personal.email && <span>{personal.email}</span>}
        {personal.phone && <span>{personal.phone}</span>}
        {personal.location && <span>{personal.location}</span>}
      </div>
      {(github?.trim() || linkedin?.trim()) && (
        <div className="resume-links-list">
          {github?.trim() && <a href={github} target="_blank" rel="noopener noreferrer">GitHub</a>}
          {linkedin?.trim() && <a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
        </div>
      )}
    </>
  )

  const skillsBlock = hasAnySkill && (
    <section className="resume-section">
      <h2 className="resume-section-title">Skills</h2>
      <div className="resume-skills-groups">
        {skillGroups.technical?.length > 0 && (
          <div className="resume-skill-group">
            <span className="resume-skill-group-label">Technical</span>
            <div className="resume-pills-wrap">
              {skillGroups.technical.map((s, i) => (
                <span key={`${s}-${i}`} className="resume-pill">{s}</span>
              ))}
            </div>
          </div>
        )}
        {skillGroups.soft?.length > 0 && (
          <div className="resume-skill-group">
            <span className="resume-skill-group-label">Soft</span>
            <div className="resume-pills-wrap">
              {skillGroups.soft.map((s, i) => (
                <span key={`${s}-${i}`} className="resume-pill">{s}</span>
              ))}
            </div>
          </div>
        )}
        {skillGroups.tools?.length > 0 && (
          <div className="resume-skill-group">
            <span className="resume-skill-group-label">Tools</span>
            <div className="resume-pills-wrap">
              {skillGroups.tools.map((s, i) => (
                <span key={`${s}-${i}`} className="resume-pill">{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )

  if (template === 'modern') {
    return (
      <div className={className} style={style}>
        <div className="resume-modern-layout">
          <aside className="resume-modern-sidebar">
            <header className="resume-header resume-modern-sidebar-header">
              <h1 className="resume-name">{personal.name || 'Your Name'}</h1>
            </header>
            {contactBlock}
            {skillsBlock}
          </aside>
          <div className="resume-modern-main">
            {summary && (
              <section className="resume-section">
                <h2 className="resume-section-title">Summary</h2>
                <p className="resume-summary">{summary}</p>
              </section>
            )}
            {education.length > 0 && (
              <section className="resume-section">
                <h2 className="resume-section-title">Education</h2>
                {education.map((e) => (
                  <div key={e.id} className="resume-block">
                    <div className="resume-block-head">
                      <strong>{e.school || 'School'}</strong>
                      <span className="resume-date">{e.start}{e.end ? ` – ${e.end}` : ''}</span>
                    </div>
                    <div className="resume-block-sub">{[e.degree, e.field].filter(Boolean).join(' · ')}</div>
                  </div>
                ))}
              </section>
            )}
            {experience.length > 0 && (
              <section className="resume-section">
                <h2 className="resume-section-title">Experience</h2>
                {experience.map((e) => (
                  <div key={e.id} className="resume-block">
                    <div className="resume-block-head">
                      <strong>{e.role || 'Role'}</strong>
                      <span className="resume-date">{e.start}{e.end ? ` – ${e.end}` : ''}</span>
                    </div>
                    <div className="resume-block-sub">{e.company || 'Company'}</div>
                    {e.description && <p className="resume-block-desc">{e.description}</p>}
                  </div>
                ))}
              </section>
            )}
            {projects.length > 0 && (
              <section className="resume-section">
                <h2 className="resume-section-title">Projects</h2>
                <div className="resume-projects-cards">
                  {projects.map((p) => (
                    <div key={p.id} className="resume-project-card">
                      <div className="resume-project-card-head">
                        <strong>{p.name || 'Project'}</strong>
                        <span className="resume-project-links">
                          {p.liveUrl?.trim() && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="resume-link-icon">Live</a>}
                          {p.githubUrl?.trim() && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="resume-link-icon">GitHub</a>}
                        </span>
                      </div>
                      {p.description && <p className="resume-block-desc">{p.description}</p>}
                      {p.techStack?.length > 0 && (
                        <div className="resume-project-pills">
                          {p.techStack.map((t, i) => (
                            <span key={`${t}-${i}`} className="resume-pill">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
        {!personal.name && !summary && education.length === 0 && experience.length === 0 && projects.length === 0 && !hasAnySkill && !github?.trim() && !linkedin?.trim() && (
          <div className="resume-placeholder">
            <p>Your resume preview will appear here.</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={className} style={style}>
      <header className="resume-header">
        <h1 className="resume-name">{personal.name || 'Your Name'}</h1>
        {contactBlock}
      </header>

      {summary && (
        <section className="resume-section">
          <h2 className="resume-section-title">Summary</h2>
          <p className="resume-summary">{summary}</p>
        </section>
      )}

      {education.length > 0 && (
        <section className="resume-section">
          <h2 className="resume-section-title">Education</h2>
          {education.map((e) => (
            <div key={e.id} className="resume-block">
              <div className="resume-block-head">
                <strong>{e.school || 'School'}</strong>
                <span className="resume-date">{e.start}{e.end ? ` – ${e.end}` : ''}</span>
              </div>
              <div className="resume-block-sub">
                {[e.degree, e.field].filter(Boolean).join(' · ')}
              </div>
            </div>
          ))}
        </section>
      )}

      {experience.length > 0 && (
        <section className="resume-section">
          <h2 className="resume-section-title">Experience</h2>
          {experience.map((e) => (
            <div key={e.id} className="resume-block">
              <div className="resume-block-head">
                <strong>{e.role || 'Role'}</strong>
                <span className="resume-date">{e.start}{e.end ? ` – ${e.end}` : ''}</span>
              </div>
              <div className="resume-block-sub">{e.company || 'Company'}</div>
              {e.description && <p className="resume-block-desc">{e.description}</p>}
            </div>
          ))}
        </section>
      )}

      {projects.length > 0 && (
        <section className="resume-section">
          <h2 className="resume-section-title">Projects</h2>
          <div className="resume-projects-cards">
            {projects.map((p) => (
              <div key={p.id} className="resume-project-card">
                <div className="resume-project-card-head">
                  <strong>{p.name || 'Project'}</strong>
                  <span className="resume-project-links">
                    {p.liveUrl?.trim() && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="resume-link-icon">Live</a>
                    )}
                    {p.githubUrl?.trim() && (
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="resume-link-icon">GitHub</a>
                    )}
                  </span>
                </div>
                {p.description && <p className="resume-block-desc">{p.description}</p>}
                {p.techStack?.length > 0 && (
                  <div className="resume-project-pills">
                    {p.techStack.map((t, i) => (
                      <span key={`${t}-${i}`} className="resume-pill">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {hasAnySkill && skillsBlock}

      {(github?.trim() || linkedin?.trim()) && (
        <section className="resume-section">
          <h2 className="resume-section-title">Links</h2>
          <div className="resume-links-list">
            {github?.trim() && <a href={github} target="_blank" rel="noopener noreferrer">GitHub</a>}
            {linkedin?.trim() && <a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          </div>
        </section>
      )}

      {!personal.name && !summary && education.length === 0 && experience.length === 0 && projects.length === 0 && !hasAnySkill && !github?.trim() && !linkedin?.trim() && (
        <div className="resume-placeholder">
          <p>Your resume preview will appear here.</p>
          <p className="resume-placeholder-hint">Fill the form to see it update live.</p>
        </div>
      )}
    </div>
  )
}
