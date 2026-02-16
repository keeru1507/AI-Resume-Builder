import { useState, useCallback } from 'react'
import { useResume } from '../store/ResumeStore'
import { useTemplate } from '../store/TemplateStore'
import ResumePreview from '../components/ResumePreview'
import TemplatePicker from '../components/TemplatePicker'
import ColorThemePicker from '../components/ColorThemePicker'
import ATSCircularScore from '../components/ATSCircularScore'
import { resumeToPlainText, isResumeIncomplete } from '../utils/exportResume'

export default function Preview() {
  const { data } = useResume()
  const { template, accentHsl } = useTemplate()
  const [incompleteWarning, setIncompleteWarning] = useState(false)
  const [copied, setCopied] = useState(false)
  const [pdfToast, setPdfToast] = useState(false)

  const handleDownloadPdf = useCallback(() => {
    if (isResumeIncomplete(data)) setIncompleteWarning(true)
    setPdfToast(true)
    setTimeout(() => setPdfToast(false), 3000)
  }, [data])

  const handleCopyText = useCallback(() => {
    if (isResumeIncomplete(data)) setIncompleteWarning(true)
    const text = resumeToPlainText(data)
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [data])

  return (
    <div className="preview-page">
      <div className="preview-export-bar no-print">
        <div className="preview-picker-row">
          <TemplatePicker />
          <ColorThemePicker />
        </div>
        <ATSCircularScore />
        <div className="preview-export-actions">
          <button type="button" className="btn btn-primary" onClick={handleDownloadPdf}>
            Download PDF
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCopyText}>
            {copied ? 'Copied!' : 'Copy Resume as Text'}
          </button>
        </div>
      </div>
      {incompleteWarning && (
        <div className="preview-incomplete-warning no-print" role="status">
          <p>Your resume may look incomplete.</p>
          <button type="button" className="btn-close-warning" onClick={() => setIncompleteWarning(false)} aria-label="Dismiss">×</button>
        </div>
      )}
      {pdfToast && (
        <div className="preview-toast no-print" role="status">
          PDF export ready! Check your downloads.
        </div>
      )}
      <div className="resume-print-area">
        <ResumePreview data={data} variant="preview" template={template} accentHsl={accentHsl} />
      </div>
    </div>
  )
}
