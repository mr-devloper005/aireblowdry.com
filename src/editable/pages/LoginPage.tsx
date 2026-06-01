import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: 'Local login page for this public site.' })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#f3efec] text-[#2b2220]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#5C766D]">Member access</p>
            <h1 className="mt-5 max-w-xl text-5xl font-black leading-[0.98] tracking-[-0.07em] sm:text-6xl">Welcome back to your creative workspace.</h1>
            <p className="mt-6 max-w-lg text-sm leading-8 text-[#5C4F4A]">Sign in to continue with your account. Your session is stored in the browser and redirected to homepage after submit.</p>
          </div>
          <div className="rounded-[2rem] border border-[#d7ccc5] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-black tracking-[-0.04em]">Login</h2>
            <EditableLocalLoginForm />
            <p className="mt-5 text-sm text-[#5C4F4A]">New here? <Link href="/signup" className="font-black text-[#2b2220] underline-offset-4 hover:underline">Create an account</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
