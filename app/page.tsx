import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 text-center">

      {/* Floating envelope */}
      <div className="text-6xl mb-8 animate-bounce">✉️</div>

      {/* Tagline */}
      <p className="font-handwriting text-rose text-lg tracking-widest mb-4">
        a little time capsule ✦
      </p>

      {/* Title */}
      <h1 className="font-display italic text-6xl text-ink mb-6 leading-tight">
        Dear Future Me
      </h1>

      {/* Description */}
      <p className="font-body text-ink-light text-xl leading-9 max-w-md mb-12 italic">
        Write a letter. Seal it with care.<br />
        Let it find you when you need it most.
      </p>

      {/* CTA Button */}
      <Link href="/write"
        className="bg-ink text-cream font-handwriting text-xl px-10 py-4 rounded-sm shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
        Begin writing ↓
      </Link>

      {/* Footer */}
      <p className="font-handwriting text-ink-light text-sm mt-16 opacity-50">
        your words, delivered to your future self ✦
      </p>

    </main>
  )
}