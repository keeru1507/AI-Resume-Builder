const ACTION_VERBS = new Set([
  'built', 'developed', 'designed', 'implemented', 'led', 'improved',
  'created', 'optimized', 'automated',
])

function hasNumberInBullet(text: string): boolean {
  if (!text || !text.trim()) return false
  return /\d|%|\b(k|m|M)\b|[\d,]+/.test(text)
}

function firstWord(text: string): string {
  const trimmed = text.replace(/^[\s\-•*]+/, '').trim()
  const match = trimmed.match(/^\w+/)
  return match ? match[0].toLowerCase() : ''
}

export interface BulletTip {
  index: number
  line: string
  needsActionVerb: boolean
  needsNumber: boolean
}

export function getBulletTips(description: string): BulletTip[] {
  if (!description || !description.trim()) return []
  const lines = description.split(/\n/).map((l) => l.trim()).filter(Boolean)
  return lines.map((line, index) => {
    const word = firstWord(line)
    const startsWithVerb = word && ACTION_VERBS.has(word)
    return {
      index: index + 1,
      line,
      needsActionVerb: !startsWithVerb,
      needsNumber: !hasNumberInBullet(line),
    }
  })
}
