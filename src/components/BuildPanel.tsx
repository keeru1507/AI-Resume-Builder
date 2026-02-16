import { useState, useRef } from 'react'
import { useArtifacts, type StepKey } from '../store/ArtifactStore'

const LOVABLE_URL = 'https://lovable.dev'

interface BuildPanelProps {
  stepNum: number
  stepKey: StepKey
}

export default function BuildPanel({ stepKey }: BuildPanelProps) {
  const { getArtifact, setArtifact, setArtifactStatus } = useArtifacts()
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const artifact = getArtifact(stepKey) ?? { value: '', status: 'pending' as const }

  const handleCopy = () => {
    const text = artifact.value || ''
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  const handleLovable = () => {
    window.open(LOVABLE_URL, '_blank')
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const url = typeof reader.result === 'string' ? reader.result : ''
      setArtifactStatus(stepKey, 'screenshot', url)
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  return (
    <div className="build-panel">
      <label className="panel-label">Copy This Into Lovable</label>
      <textarea
        className="panel-textarea"
        placeholder="Paste or type content to copy into Lovable..."
        value={artifact.value}
        onChange={(e) => setArtifact(stepKey, e.target.value)}
        rows={8}
      />
      <div className="panel-actions">
        <button type="button" className="btn btn-secondary" onClick={handleCopy} disabled={!artifact.value?.trim()}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <a
          href={LOVABLE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault()
            handleLovable()
          }}
        >
          Build in Lovable
        </a>
      </div>
      <div className="panel-feedback">
        <span className="feedback-label">Result:</span>
        <div className="feedback-buttons">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => setArtifactStatus(stepKey, 'worked')}
          >
            It Worked
          </button>
          <button
            type="button"
            className="btn btn-error"
            onClick={() => setArtifactStatus(stepKey, 'error')}
          >
            Error
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => fileInputRef.current?.click()}
          >
            Add Screenshot
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden-input"
            onChange={handleFileChange}
            aria-hidden
          />
        </div>
      </div>
    </div>
  )
}
