'use client'
import { useLetterStore } from '@/store/letterStore'

const fontMap: Record<string, string> = {
  caveat:     'font-handwriting',
  lora:       'font-body',
  playfair:   'font-display italic',
  'dm-serif': 'font-display',
}

export function LetterPreview() {
  const { message, nickname, email, deliveryDate, color, font, stickers, setStep } = useLetterStore()

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
      <p className="font-body text-ink-light italic text-sm mb-8">Take a moment. Does it feel right?</p>

      {/* Letter paper */}
      <div className="relative bg-[#fffdf7] shadow-lg rounded-sm p-12 mb-6"
        style={{
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(168,130,90,0.1) 27px, rgba(168,130,90,0.1) 28px)',
          boxShadow: `0 4px 32px rgba(0,0,0,0.1), 4px 4px 0 ${color}`,
        }}>

        {/* Paper corner fold */}
        <div className="absolute top-0 right-0 w-0 h-0"
          style={{ borderStyle: 'solid', borderWidth: '0 32px 32px 0', borderColor: 'transparent #f5e6c8 transparent transparent' }} />

        {/* Stickers row */}
        {stickers.length > 0 && (
          <div className="flex gap-2 mb-6 text-2xl">
            {stickers.map((s, i) => <span key={i}>{s}</span>)}
          </div>
        )}

        {/* Date */}
        <div className={`text-right text-sm text-ink-light mb-8 ${fontClass}`}>
          Today, {today}
        </div>

        {/* Salutation */}
        <div className={`text-2xl text-ink mb-6 ${fontClass}`}>
          Dear future {nickname || 'me'},
        </div>

        {/* Message */}
        <div className={`text-lg text-ink leading-8 whitespace-pre-wrap mb-12 ${fontClass}`}>
          {message}
        </div>

        {/* Sign off */}
        <div className={`text-lg text-ink-light italic ${fontClass}`}>
          With love,<br />
          your past self ✦
        </div>
      </div>

      {/* Delivery info */}
      <div className="text-center font-handwriting text-sm text-ink-light mb-8">
        This letter will be delivered to{' '}
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