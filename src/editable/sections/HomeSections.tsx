import Link from 'next/link'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const dummyTiles = [
  { name: 'Aurora Motion', image: 'https://picsum.photos/seed/aurora-motion/900/1100' },
  { name: 'Noon Labs', image: 'https://picsum.photos/seed/noon-labs/900/1100' },
  { name: 'Neon Forest', image: 'https://picsum.photos/seed/neon-forest/900/1100' },
  { name: 'Paper Icons', image: 'https://picsum.photos/seed/paper-icons/900/1100' },
  { name: 'Future Type', image: 'https://picsum.photos/seed/future-type/900/1100' },
  { name: 'Color Vault', image: 'https://picsum.photos/seed/color-vault/900/1100' },
  { name: 'Studio Echo', image: 'https://picsum.photos/seed/studio-echo/900/1100' },
  { name: 'Mono Pulse', image: 'https://picsum.photos/seed/mono-pulse/900/1100' },
  { name: 'Soft Grid', image: 'https://picsum.photos/seed/soft-grid/900/1100' },
  { name: 'Frame Index', image: 'https://picsum.photos/seed/frame-index/900/1100' },
]

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const image = typeof content.image === 'string' ? content.image : ''
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || image || logo || '/placeholder.svg?height=900&width=1200'
}

export function EditableHomeHero({ primaryTask, primaryRoute }: HomeSectionProps) {
  return (
    <section className="px-4 pt-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <h1 className="text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-8xl">Designers&apos; Secret Source</h1>
        <p className="mx-auto mt-6 max-w-3xl text-xl text-black/75">A premium wall of curated visuals and profiles for daily inspiration.</p>
        <Link href={primaryRoute} className="mt-10 inline-flex rounded-full bg-[#3559ff] px-10 py-4 text-xl font-bold text-white">Explore {primaryTask}</Link>
      </div>
    </section>
  )
}

export function EditableStoryRail(_: HomeSectionProps) {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-5">
        {dummyTiles.slice(0, 8).map((tile, i) => (
          <article key={tile.name} className="grid items-center gap-5 md:grid-cols-2">
            <div className={`${i % 2 ? 'md:order-2' : 'md:order-1'} overflow-hidden rounded-2xl bg-white shadow-sm`}>
              <img src={tile.image} alt={tile.name} className="aspect-[5/4] w-full object-cover" />
            </div>
            <div className={`${i % 2 ? 'md:order-1 md:text-right' : 'md:order-2'} px-2`}>
              <h3 className="text-2xl font-bold">{tile.name}</h3>
              <p className="mt-2 text-sm leading-7 text-black/65">
                A curated visual direction with strong color, mood, and layout ideas for premium creative browsing.
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const picked = posts.slice(0, 3)
  const lead = picked[0]
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
        {lead ? (
          <Link href={`${primaryRoute}/${lead.slug}`} className="overflow-hidden rounded-[2rem] border border-black/10 bg-white p-3 shadow-sm">
            <img src={getPostImage(lead)} alt={lead.title} className="aspect-[16/10] w-full rounded-[1.5rem] object-cover" />
            <h3 className="mt-5 text-4xl font-semibold leading-tight">Creativity by Users</h3>
            <p className="mt-3 text-black/70">Fresh uploaded visuals from your live content stream, highlighted in a premium navigation block.</p>
          </Link>
        ) : null}
        <div className="flex flex-col gap-4">
          {picked.slice(1, 3).map((post, i) => (
            <Link key={post.id || post.slug || i} href={`${primaryRoute}/${post.slug}`} className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm transition hover:-translate-y-0.5">
              <div className="grid items-center gap-4 grid-cols-[88px_1fr] sm:grid-cols-[104px_1fr]">
                <img src={getPostImage(post)} alt={post.title} className="h-[88px] w-[88px] rounded-2xl object-cover sm:h-[104px] sm:w-[104px]" />
                <div className="min-w-0">
                  <h4 className="line-clamp-2 text-2xl font-bold leading-tight sm:text-[2rem]">{post.title}</h4>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-black/65">Shortlisted from uploaded content for visual balance and editorial mood.</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const wall = posts.slice(3, 9)
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto mb-8 max-w-6xl">
        <h2 className="text-4xl font-semibold leading-tight">User Upload Navigation</h2>
        <p className="mt-2 text-black/70">Browse directly into uploaded image posts from the homepage.</p>
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
        {wall.map((post, i) => (
          <Link key={post.id || post.slug || i} href={`${primaryRoute}/${post.slug}`} className={`rounded-[2rem] p-6 ${i % 2 ? 'border border-black/10 bg-white' : 'bg-[#efe4d8]'}`}>
            <div className="grid gap-4 sm:grid-cols-[120px_1fr] sm:items-center">
              <img src={getPostImage(post)} alt={post.title} className="aspect-square w-full rounded-2xl object-cover" />
              <div>
                <h3 className="line-clamp-2 text-2xl font-semibold leading-tight">{post.title}</h3>
                <p className="mt-2 text-black/70">Open this uploaded visual from the {primaryTask} feed.</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="px-4 pb-8 pt-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[2.2rem] bg-[#5C4F4A] px-8 py-14 text-center text-white">
        <h2 className="text-4xl leading-tight sm:text-5xl">Join top creatives who browse daily</h2>
        <p className="mx-auto mt-4 max-w-3xl text-white/80">Fresh visual references, cleaner browsing, and premium presentation.</p>
        <Link href="/contact" className="mt-8 inline-flex rounded-full bg-white px-8 py-3 text-base font-bold text-[#5C4F4A]">Contact us</Link>
      </div>
    </section>
  )
}
