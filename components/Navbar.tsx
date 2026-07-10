import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span className="inline-block h-2 w-2 rounded-full bg-signal shadow-[0_0_10px_2px_rgba(0,217,163,0.6)]" />
          SIGNAL
        </Link>
        <nav className="flex items-center gap-6 font-mono text-sm text-white/70">
          <Link href="/" className="transition hover:text-signal">
            Listings
          </Link>
          <Link href="/post" className="transition hover:text-signal">
            Post a role
          </Link>
          <Link href="/applications" className="transition hover:text-signal">
            My applications
          </Link>
        </nav>
      </div>
    </header>
  );
}
