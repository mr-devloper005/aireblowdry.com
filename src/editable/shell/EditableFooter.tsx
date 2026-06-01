import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const links = SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile' && task.key !== 'image')
  return (
    <footer className="mt-10 border-t border-black/5 bg-[#dfe1ed]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img src="/favico.png" alt={SITE_CONFIG.name} className="h-12 w-12 object-contain" />
            <p className="text-2xl font-bold tracking-tight text-[#2b2220]">{SITE_CONFIG.name}</p>
          </div>
          <p className="mt-4 max-w-md text-base leading-8 text-black/70">
            Curated visuals and profiles updated regularly to help you discover standout ideas without the clutter.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold"></h3>
          <div className="mt-4 grid gap-2">
            {links.slice(0, 5).map((task) => (
              <Link key={task.key} href={task.route} className="text-black/70 hover:text-black">{task.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Company</h3>
          <div className="mt-4 grid gap-2">
            <Link href="/about" className="text-black/70 hover:text-black">About</Link>
            <Link href="/contact" className="text-black/70 hover:text-black">Contact</Link>
            <Link href="/search" className="text-black/70 hover:text-black">Search</Link>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Reach Us</h3>
          <p className="mt-4 text-black/70">For submissions and partnerships, use the contact page.</p>
        </div>
      </div>
      <div className="border-t border-black/10 px-4 py-4 text-center text-sm text-black/60">© {year} {SITE_CONFIG.name}. All rights reserved.</div>
    </footer>
  )
}
