'use client'
import { useLetterStore } from '@/store/letterStore'
import Image from 'next/image'

const fontMap: Record<string, string> = {
  caveat:     'font-handwriting',
  lora:       'font-body',
  playfair:   'font-display italic',
  'dm-serif': 'font-display',
}

export function LetterPreview() {
  const { message, nickname, title, email, deliveryDate, font, stickers, seal, envelope, setStep } = useLetterStore()

  const fontClass = fontMap[font] || 'font-handwriting'

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })

  const dDate = deliveryDate
    ? new Date(deliveryDate + 'T00:00:00').toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    : ''

  return (
    <div>
      <h2 className="font-display italic text-3xl text-ink mb-2">Your letter, sealed</h2>
      <p className="font-body text-ink-light italic text-sm mb-10">Take a moment. Does it feel right?</p>

      {/* Envelope + Letter preview — like the photo */}
      <div className="relative mx-auto mb-10" style={{ width: 420, height: 480 }}>

        {/* Envelope behind — tilted slightly */}
        <div className="absolute bottom-0 left-4 w-full"
          style={{ transform: 'rotate(-4deg)', zIndex: 1 }}>
          <Image
            src={`/envelopes/${envelope}.png`}
            alt={envelope}
            width={400}
            height={280}
            className="w-full object-contain drop-shadow-xl"
          />

          {/* Wax seal on envelope */}
          {seal !== 'none' && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 z-10">
              <Image
                src={`/seals/${seal}.png`}
                alt={seal}
                width={64}
                height={64}
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
          )}
        </div>

        {/* Letter card in front — tilted opposite */}
        <div className="absolute top-0 right-0 w-72 z-20"
          style={{ transform: 'rotate(3deg)' }}>
          <div className="bg-[#fffdf7] rounded-sm shadow-2xl p-8 border border-parchment/60"
            style={{ minHeight: '320px' }}>

            {/* Stickers row */}
            {stickers.length > 0 && (
              <div className="flex gap-1 mb-4 text-lg">
                {stickers.map((s, i) => <span key={i}>{s}</span>)}
              </div>
            )}

            {/* Title / To line */}
            <p className={`text-xs tracking-widest text-ink-light uppercase mb-3 font-body`}>
              {title || 'Dear Future Me'}
            </p>

            {/* Message preview — first few lines */}
            <p className={`text-ink leading-7 text-sm mb-6 ${fontClass}`}
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 6,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
              Dear future {nickname || 'me'},<br /><br />
              {message}
            </p>

            {/* Sign off */}
            <p className={`text-sm text-ink-light italic ${fontClass}`}>
              xo,<br />
              your past self ✦
            </p>

            {/* Date stamp */}
            <p className="font-body text-xs text-ink-light/50 mt-4 text-right">
              {today}
            </p>
          </div>
        </div>

      </div>

      {/* Delivery info */}
      <div className="text-center font-handwriting text-sm text-ink-light mb-8">
        Delivering to{' '}
        <strong className="text-rose">{email}</strong>
        {' '}on{' '}
        <strong className="text-rose">{dDate}</strong>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button type="button" onClick={() => setStep(2)}
          className="font-handwriting text-lg px-6 py-2 border border-dashed border-ink/30 rounded-sm hover:bg-parchment transition-all">
          ← Back
        </button>
        <button type="button" onClick={() => setStep(4)}
          className="bg-ink text-cream font-handwriting text-lg px-8 py-3 rounded-sm shadow-md hover:-translate-y-0.5 transition-all">
          Seal & send ✦
        </button>
      </div>
    </div>
  )
}