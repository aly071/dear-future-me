export default async function ConfirmedPage({
    searchParams,
  }: {
    searchParams: Promise<{ date?: string }>
  }) {
    const { date } = await searchParams
  
    const formatted = date
      ? new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric',
        })
      : ''
  
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="text-7xl mb-8">✉️</div>
          <h1 className="font-display italic text-4xl text-ink mb-4">
            Your letter is sealed!
          </h1>
          <p className="font-body text-ink-light text-lg leading-8 mb-6">
            It will arrive on{' '}
            <strong className="text-rose">{formatted}</strong>.
            <br />
            We'll deliver it straight to your inbox.
          </p>
          <a href="/write"
            className="inline-block bg-ink text-cream font-handwriting text-lg px-8 py-3 rounded-sm shadow-md hover:-translate-y-0.5 transition-all">
            Write another letter ✦
          </a>
        </div>
      </main>
    )
  }