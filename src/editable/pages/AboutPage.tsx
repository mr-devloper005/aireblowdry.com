import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#f3efec] px-4 py-14 text-[#2b2220] sm:px-6 lg:px-8">
        <section className="mx-auto max-w-6xl">
          <div className="rounded-[2.6rem] border border-[#d7ccc5] bg-white p-8 shadow-sm sm:p-12">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#5C766D]">{pagesContent.about.badge}</p>
            <h1 className="mt-4 text-5xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-6xl">About {SITE_CONFIG.name}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#5C4F4A]">{pagesContent.about.description}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {pagesContent.about.paragraphs.map((paragraph) => (
                <div key={paragraph} className="rounded-2xl border border-[#d7ccc5] bg-[#efe4d8] p-5 text-sm leading-7 text-[#5C4F4A]">
                  {paragraph}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-8 grid max-w-6xl gap-4 md:grid-cols-3">
          {pagesContent.about.values.map((value) => (
            <article key={value.title} className="rounded-[2rem] border border-[#d7ccc5] bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold leading-tight text-[#2b2220]">{value.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#5C4F4A]">{value.description}</p>
            </article>
          ))}
        </section>

        <section className="mx-auto mt-8 max-w-6xl rounded-[2.2rem] bg-[#5C4F4A] px-8 py-12 text-center text-white">
          <h2 className="text-4xl font-semibold leading-tight">Built for discovery with a premium reading flow</h2>
          <p className="mx-auto mt-3 max-w-3xl text-white/80">
            We focus on clarity, visual rhythm, and structured browsing so every section feels cohesive across the website.
          </p>
          <Link href="/contact" className="mt-7 inline-flex rounded-full bg-white px-8 py-3 text-sm font-bold text-[#5C4F4A]">
            Contact us
          </Link>
        </section>
      </main>
    </EditableSiteShell>
  )
}
