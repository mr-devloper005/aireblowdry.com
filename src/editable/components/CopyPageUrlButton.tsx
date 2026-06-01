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
      className="inline-flex items-center gap-2 rounded-full border border-[#d7ccc5] bg-white px-4 py-2 text-sm font-black text-[#2b2220] hover:bg-[#efe4d8]"
    >
      <Share2 className="h-4 w-4" />
      {copied ? 'Copied' : 'Share'}
    </button>
  )
}
