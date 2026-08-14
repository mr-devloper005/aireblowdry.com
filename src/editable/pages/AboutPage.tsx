import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-warm)] px-4 py-14 text-[var(--slot4-page-text)] sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl">
          <div className="rounded-[2.6rem] border border-black/[0.06] bg-[var(--slot4-surface-bg)] p-8 shadow-sm sm:p-12">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[var(--slot4-accent-fill)]">{pagesContent.about.badge}</p>
            <h1 className="mt-4 text-5xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-6xl">About {SITE_CONFIG.name}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.about.description}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {pagesContent.about.paragraphs.map((paragraph) => (
                <div key={paragraph} className="rounded-2xl border border-black/[0.06] bg-[var(--slot4-accent-soft)] p-5 text-sm leading-7 text-[var(--slot4-muted-text)]">
                  {paragraph}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-8 grid max-w-7xl gap-4 md:grid-cols-3">
          {pagesContent.about.values.map((value) => (
            <article key={value.title} className="rounded-[2rem] border border-black/[0.06] bg-[var(--slot4-surface-bg)] p-6 shadow-sm">
              <h2 className="text-2xl font-semibold leading-tight text-[var(--slot4-page-text)]">{value.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
            </article>
          ))}
        </section>

        <section className="mx-auto mt-8 max-w-7xl rounded-[2.2rem] bg-[var(--slot4-dark-bg)] px-8 py-12 text-center text-[var(--slot4-dark-text)]">
          <h2 className="text-4xl font-semibold leading-tight">Built for discovery with a premium reading flow</h2>
          <p className="mx-auto mt-3 max-w-3xl text-white/80">
            We focus on clarity, visual rhythm, and structured browsing so every section feels cohesive across the website.
          </p>
          <Link href="/contact" className="mt-7 inline-flex rounded-full bg-[var(--slot4-surface-bg)] px-8 py-3 text-sm font-bold text-[var(--slot4-muted-text)]">
            Contact us
          </Link>
        </section>
      </main>
    </EditableSiteShell>
  )
}
