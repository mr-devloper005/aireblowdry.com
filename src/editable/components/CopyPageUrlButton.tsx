'use client'

import { useState } from 'react'
import { Share2 } from 'lucide-react'

export function CopyPageUrlButton() {
  const [copied, setCopied] = useState(false)

  const onShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={onShare}
      className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-[var(--slot4-surface-bg)] px-4 py-2 text-sm font-extrabold text-[var(--slot4-page-text)] hover:bg-[var(--slot4-accent-soft)]"
    >
      <Share2 className="h-4 w-4" />
      {copied ? 'Copied' : 'Share'}
    </button>
  )
}
