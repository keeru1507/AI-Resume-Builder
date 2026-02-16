import { getBulletTips } from '../utils/bulletGuidance'

interface BulletGuidanceProps {
  description: string
}

export default function BulletGuidance({ description }: BulletGuidanceProps) {
  const tips = getBulletTips(description)
  if (tips.length === 0) return null

  const withTips = tips.filter((t) => t.needsActionVerb || t.needsNumber)
  if (withTips.length === 0) return null

  return (
    <div className="bullet-guidance">
      {withTips.map((t) => (
        <div key={t.index} className="bullet-guidance-item">
          <span className="bullet-guidance-label">Bullet {t.index}:</span>
          {t.needsActionVerb && (
            <span className="bullet-guidance-tip">Start with a strong action verb.</span>
          )}
          {t.needsActionVerb && t.needsNumber && ' '}
          {t.needsNumber && (
            <span className="bullet-guidance-tip">Add measurable impact (numbers).</span>
          )}
        </div>
      ))}
    </div>
  )
}
