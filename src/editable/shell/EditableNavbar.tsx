'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, User, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = useMemo(
    () =>
      SITE_CONFIG.tasks
        .filter((task) => task.enabled && task.key !== 'profile' && task.key !== 'image')
        .slice(0, 5)
        .map((task) => ({ label: task.label, href: task.route })),
    []
  )

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[var(--slot4-page-bg)]/95 backdrop-blur">
      <nav className="mx-auto flex h-20 w-full max-w-[1440px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <img src="/favico.png" alt={SITE_CONFIG.name} className="h-11 w-11 object-contain" />
          <span className="text-lg font-bold tracking-tight">{SITE_CONFIG.name}</span>
        </Link>

        <div className="ml-auto hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`text-base font-medium ${pathname?.startsWith(item.href) ? 'text-black' : 'text-black/55 hover:text-black'}`}>
              {item.label}
            </Link>
          ))}
        </div>

        <form action="/search" className="ml-auto hidden w-full max-w-xs items-center rounded-full border border-black/10 bg-white px-4 py-2 lg:flex">
          <Search className="h-4 w-4 text-black/50" />
          <input name="q" placeholder="Search" className="w-full bg-transparent px-3 text-sm outline-none placeholder:text-black/45" />
        </form>

        <div className="flex items-center gap-2">
          {session ? (
            <button
              type="button"
              onClick={logout}
              className="rounded-full bg-[#5C4F4A] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#4e433f]"
            >
              Sign out
            </button>
          ) : (
            <>
              <Link href="/login" className="hidden h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white sm:inline-flex">
                <User className="h-4 w-4" />
              </Link>
              <Link href="/signup" className="rounded-full bg-[#3559ff] px-5 py-2.5 text-sm font-bold text-white">Get Access</Link>
            </>
          )}
          <button className="rounded-full border border-black/10 bg-white p-2 lg:hidden" onClick={() => setOpen((v) => !v)} type="button">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {open ? (
        <div className="border-t border-black/10 bg-[var(--slot4-page-bg)] p-4 lg:hidden">
          <div className="grid gap-2">
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'Contact', href: '/contact' }].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl border border-black/10 bg-white px-4 py-3 font-semibold">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
