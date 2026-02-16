import { useResume } from '../store/ResumeStore'
import { useTemplate } from '../store/TemplateStore'
import ResumePreview from '../components/ResumePreview'
import ATSScore from '../components/ATSScore'
import ImprovementPanel from '../components/ImprovementPanel'
import TemplatePicker from '../components/TemplatePicker'
import ColorThemePicker from '../components/ColorThemePicker'
import BulletGuidance from '../components/BulletGuidance'
import SkillsSection from '../components/SkillsSection'
import ProjectCard from '../components/ProjectCard'

export default function Builder() {
  const { data, setPersonal, setSummary, addEducation, removeEducation, updateEducation, addExperience, removeExperience, updateExperience, addProject, removeProject, updateProject, setLinks, loadSampleData } = useResume()
  const { template, accentHsl } = useTemplate()

  return (
    <div className="builder-page">
      <div className="builder-form-col">
        <div className="builder-form-header">
          <h2>Resume details</h2>
          <button type="button" className="btn btn-secondary" onClick={loadSampleData}>
            Load Sample Data
          </button>
        </div>

        <section className="form-section">
          <h3 className="form-section-title">Personal Info</h3>
          <div className="form-grid">
            <label>
              <span>Name</span>
              <input type="text" value={data.personal.name} onChange={(e) => setPersonal({ name: e.target.value })} placeholder="Full name" />
            </label>
            <label>
              <span>Email</span>
              <input type="email" value={data.personal.email} onChange={(e) => setPersonal({ email: e.target.value })} placeholder="email@example.com" />
            </label>
            <label>
              <span>Phone</span>
              <input type="text" value={data.personal.phone} onChange={(e) => setPersonal({ phone: e.target.value })} placeholder="+1 (555) 000-0000" />
            </label>
            <label>
              <span>Location</span>
              <input type="text" value={data.personal.location} onChange={(e) => setPersonal({ location: e.target.value })} placeholder="City, State" />
            </label>
          </div>
        </section>

        <section className="form-section">
          <h3 className="form-section-title">Summary</h3>
          <textarea value={data.summary} onChange={(e) => setSummary(e.target.value)} placeholder="Brief professional summary..." rows={4} className="form-textarea" />
        </section>

        <section className="form-section">
          <div className="form-section-head">
            <h3 className="form-section-title">Education</h3>
            <button type="button" className="btn btn-secondary btn-sm" onClick={addEducation}>Add entry</button>
          </div>
          {data.education.map((e) => (
            <div key={e.id} className="form-card">
              <div className="form-grid">
                <label>
                  <span>School</span>
                  <input type="text" value={e.school} onChange={(ev) => updateEducation(e.id, { school: ev.target.value })} placeholder="University name" />
                </label>
                <label>
                  <span>Degree</span>
                  <input type="text" value={e.degree} onChange={(ev) => updateEducation(e.id, { degree: ev.target.value })} placeholder="B.S., M.A." />
                </label>
                <label>
                  <span>Field</span>
                  <input type="text" value={e.field} onChange={(ev) => updateEducation(e.id, { field: ev.target.value })} placeholder="Computer Science" />
                </label>
                <label>
                  <span>Start</span>
                  <input type="text" value={e.start} onChange={(ev) => updateEducation(e.id, { start: ev.target.value })} placeholder="2018" />
                </label>
                <label>
                  <span>End</span>
                  <input type="text" value={e.end} onChange={(ev) => updateEducation(e.id, { end: ev.target.value })} placeholder="2022" />
                </label>
              </div>
              <button type="button" className="btn-remove" onClick={() => removeEducation(e.id)}>Remove</button>
            </div>
          ))}
        </section>

        <section className="form-section">
          <div className="form-section-head">
            <h3 className="form-section-title">Experience</h3>
            <button type="button" className="btn btn-secondary btn-sm" onClick={addExperience}>Add entry</button>
          </div>
          {data.experience.map((e) => (
            <div key={e.id} className="form-card">
              <div className="form-grid">
                <label>
                  <span>Company</span>
                  <input type="text" value={e.company} onChange={(ev) => updateExperience(e.id, { company: ev.target.value })} placeholder="Company name" />
                </label>
                <label>
                  <span>Role</span>
                  <input type="text" value={e.role} onChange={(ev) => updateExperience(e.id, { role: ev.target.value })} placeholder="Job title" />
                </label>
                <label>
                  <span>Start</span>
                  <input type="text" value={e.start} onChange={(ev) => updateExperience(e.id, { start: ev.target.value })} placeholder="2020" />
                </label>
                <label>
                  <span>End</span>
                  <input type="text" value={e.end} onChange={(ev) => updateExperience(e.id, { end: ev.target.value })} placeholder="Present" />
                </label>
              </div>
              <label className="form-full">
                <span>Description</span>
                <textarea value={e.description} onChange={(ev) => updateExperience(e.id, { description: ev.target.value })} placeholder="One bullet per line. Start with action verbs (Built, Led, etc.). Add numbers where possible." rows={3} className="form-textarea" />
                <BulletGuidance description={e.description ?? ''} />
              </label>
              <button type="button" className="btn-remove" onClick={() => removeExperience(e.id)}>Remove</button>
            </div>
          ))}
        </section>

        <section className="form-section">
          <div className="form-section-head">
            <h3 className="form-section-title">Projects</h3>
            <button type="button" className="btn btn-secondary btn-sm" onClick={addProject}>Add Project</button>
          </div>
          {data.projects.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              onUpdate={(patch) => updateProject(p.id, patch)}
              onRemove={() => removeProject(p.id)}
            />
          ))}
        </section>

        <SkillsSection />

        <section className="form-section">
          <h3 className="form-section-title">Links</h3>
          <div className="form-grid">
            <label>
              <span>GitHub</span>
              <input type="url" value={data.github} onChange={(e) => setLinks({ github: e.target.value })} placeholder="https://github.com/..." />
            </label>
            <label>
              <span>LinkedIn</span>
              <input type="url" value={data.linkedin} onChange={(e) => setLinks({ linkedin: e.target.value })} placeholder="https://linkedin.com/in/..." />
            </label>
          </div>
        </section>
      </div>

      <aside className="builder-preview-col">
        <TemplatePicker />
        <ColorThemePicker />
        <ATSScore />
        <ImprovementPanel />
        <div className="builder-preview-header">Live preview</div>
        <ResumePreview data={data} variant="live" template={template} accentHsl={accentHsl} />
      </aside>
    </div>
  )
}
