import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: 'Local signup page for this public site.' })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#f3efec] text-[#2b2220]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1fr] lg:px-8">
          <div className="rounded-[2rem] border border-[#d7ccc5] bg-white p-6 shadow-sm sm:p-8">
            <h1 className="text-3xl font-black tracking-[-0.05em]">Create account</h1>
            <EditableLocalSignupForm />
            <p className="mt-5 text-sm text-[#5C4F4A]">Already have an account? <Link href="/login" className="font-black text-[#2b2220] underline-offset-4 hover:underline">Login</Link></p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#5C766D]">Site access</p>
            <h2 className="mt-5 max-w-xl text-5xl font-black leading-[0.98] tracking-[-0.07em] sm:text-6xl">Register and start exploring instantly.</h2>
            <p className="mt-6 max-w-lg text-sm leading-8 text-[#5C4F4A]">Registration saves your account in local browser storage and signs you in right away before redirecting to homepage.</p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
