'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Lock, Send } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const fieldClass = 'w-full rounded-2xl border border-black/[0.06] bg-[var(--slot4-surface-bg)] px-4 py-3 text-sm font-bold text-[var(--slot4-page-text)] outline-none transition placeholder:text-current/35 focus:border-current'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile'), [])
  const task = (enabledTasks[0]?.key || 'article') as TaskKey
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen bg-[var(--slot4-page-bg)] px-4 py-16 text-[var(--slot4-page-text)] sm:px-6 lg:px-8">
          <section className="mx-auto max-w-xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--slot4-page-text)] text-[var(--slot4-page-bg)]">
              <Lock className="h-9 w-9" />
            </div>
            <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.28em] opacity-55">{pagesContent.create.locked.badge}</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[0.95] tracking-[-0.06em] sm:text-5xl">{pagesContent.create.locked.title}</h1>
            <p className="mt-5 text-base font-semibold leading-8 opacity-70">{pagesContent.create.locked.description}</p>
            <div className="mt-8 flex justify-center gap-3">
              <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-page-text)] px-6 py-3 text-sm font-extrabold text-[var(--slot4-page-bg)]">Login <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/signup" className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-[var(--slot4-surface-bg)] px-6 py-3 text-sm font-extrabold">Sign up</Link>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.28em] opacity-55">{pagesContent.create.hero.badge}</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-[0.95] tracking-[-0.06em] sm:text-5xl">{pagesContent.create.hero.title}</h1>
                <p className="mt-4 max-w-lg text-base font-semibold leading-8 opacity-70">{pagesContent.create.hero.description}</p>
              </div>
              <span className="rounded-full bg-[var(--slot4-surface-bg)] border border-black/[0.06] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em]">{session.name}</span>
            </div>

            <form onSubmit={submit} className="mt-10 rounded-[2.2rem] border border-black/[0.06] bg-[var(--slot4-surface-bg)]/75 p-5 shadow-[0_30px_90px_rgba(15,23,42,0.06)] sm:p-7">
              <h2 className="text-2xl font-extrabold tracking-[-0.04em]">{pagesContent.create.formTitle}</h2>

              <div className="mt-6 grid gap-4">
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                <textarea className={`${fieldClass} min-h-24`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" required />
                <textarea className={`${fieldClass} min-h-48`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description" required />
              </div>

              {created ? (
                <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                  <p className="flex items-center gap-2 text-sm font-extrabold"><CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}</p>
                  <p className="mt-1 text-sm font-semibold opacity-80">{created.title}</p>
                </div>
              ) : null}

              <button type="submit" className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[var(--slot4-page-text)] px-6 text-sm font-extrabold uppercase tracking-[0.18em] text-[var(--slot4-page-bg)] transition hover:-translate-y-0.5">
                <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
