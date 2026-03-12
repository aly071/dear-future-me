'use client'
import { useLetterStore } from '@/store/letterStore'
import { EnvelopePreview } from './EnvelopePreview'
import Image from 'next/image'
import type { FontChoice, SealChoice, EnvelopeChoice } from '@/types/letter'

const ENVELOPES: { id: EnvelopeChoice; label: string }[] = [
  { id: 'handmade', label: 'Handmade' },
  { id: 'classic',  label: 'Classic'  },
  { id: 'blush',    label: 'Blush'    },
  { id: 'crimson',  label: 'Crimson'  },
  { id: 'teal',     label: 'Teal'     },
  { id: 'kraft',    label: 'Kraft'    },
  { id: 'silver',   label: 'Silver'   },
]

const FONTS: { id: FontChoice; label: string; preview: string }[] = [
  { id: 'caveat',   label: 'Handwritten', preview: 'font-handwriting' },
  { id: 'lora',     label: 'Lora serif',  preview: 'font-body'        },
  { id: 'playfair', label: 'Playfair',    preview: 'font-display italic' },
  { id: 'dm-serif', label: 'DM Serif',    preview: 'font-display'     },
]

const STICKERS = ['⭐','🌸','💫','🌙','🌿','💌','✨','🍃','🦋','☁️']

const SEALS: { id: SealChoice; label: string }[] = [
  { id: 'thistle', label: 'Thistle' },
  { id: 'bouquet', label: 'Bouquet' },
  { id: 'bow',     label: 'Bow'     },
  { id: 'rose',    label: 'Rose'    },
  { id: 'wreath',  label: 'Wreath'  },
  { id: 'daisy',   label: 'Daisy'   },
]

export function EnvelopeCustomizer() {
  const { envelope, font, stickers, seal, setEnvelope, setFont, toggleSticker, setSeal, setStep } = useLetterStore()

  return (
    <div>
      <h2 className="font-display italic text-3xl text-ink mb-2">Dress up your envelope</h2>
      <p className="font-body text-ink-light italic text-sm mb-8">Make it feel like yours.</p>

      <EnvelopePreview envelope={envelope} stickers={stickers} seal={seal} />

      <div className="grid grid-cols-2 gap-8 mt-10">

        {/* Envelope style */}
        <div className="col-span-2">
          <h3 className="font-display text-xl text-ink mb-1">Envelope style</h3>
          <p className="font-handwriting text-sm text-rose mb-4">choose your envelope</p>
          <div className="grid grid-cols-7 gap-3">
            {ENVELOPES.map((e) => (
              <button key={e.id} type="button" onClick={() => setEnvelope(e.id)}
                className={`flex flex-col items-center gap-2 p-2 border rounded-sm transition-all hover:bg-parchment
                  ${envelope === e.id
                    ? 'border-ink bg-parchment shadow-sm'
                    : 'border-dashed border-ink/15'}`}>
                <Image
                  src={`/envelopes/${e.id}.png`}
                  alt={e.label}
                  width={56}
                  height={40}
                  className="w-14 h-10 object-contain"
                />
                <span className="font-handwriting text-xs text-ink-light">{e.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Fonts */}
        <div>
          <h3 className="font-display text-xl text-ink mb-4">Letter font</h3>
          <div className="flex flex-col gap-2">
            {FONTS.map((f) => (
              <button key={f.id} type="button" onClick={() => setFont(f.id)}
                className={`text-left px-4 py-2 border rounded-sm transition-all text-base ${f.preview}
                  ${font === f.id
                    ? 'bg-ink text-cream border-ink'
                    : 'bg-transparent border-dashed border-ink/20 text-ink hover:bg-parchment'
                  }`}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Wax Seal */}
        <div>
          <h3 className="font-display text-xl text-ink mb-1">Wax seal</h3>
          <p className="font-handwriting text-sm text-rose mb-4">choose your seal</p>
          <div className="grid grid-cols-4 gap-3">
            {SEALS.map((s) => (
              <button key={s.id} type="button" onClick={() => setSeal(s.id)}
                className={`flex flex-col items-center gap-2 p-2 border rounded-sm transition-all hover:bg-parchment
                  ${seal === s.id
                    ? 'border-ink bg-parchment shadow-sm'
                    : 'border-dashed border-ink/15'}`}>
                {s.id === 'none' ? (
                  <div className="w-10 h-10 rounded-full bg-[#e8c06c] border-2 border-[#c8962c]
                    flex items-center justify-center text-sm shadow-sm">
                    ✦
                  </div>
                ) : (
                  <Image
                    src={`/seals/${s.id}.png`}
                    alt={s.label}
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                  />
                )}
                <span className="font-handwriting text-xs text-ink-light">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stickers */}
        <div className="col-span-2">
          <h3 className="font-display text-xl text-ink mb-1">Add stickers</h3>
          <p className="font-handwriting text-sm text-rose mb-3">tap to toggle · max 5</p>
          <div className="grid grid-cols-10 gap-2">
            {STICKERS.map((s) => (
              <button key={s} type="button" onClick={() => toggleSticker(s)}
                className={`aspect-square text-2xl rounded-lg border transition-all hover:scale-110
                  ${stickers.includes(s)
                    ? 'border-rose bg-parchment shadow-sm'
                    : 'border-dashed border-ink/15 hover:bg-parchment'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-10">
        <button type="button" onClick={() => setStep(1)}
          className="font-handwriting text-lg px-6 py-2 border border-dashed border-ink/30 rounded-sm hover:bg-parchment transition-all">
          ← Back
        </button>
        <button type="button" onClick={() => setStep(3)}
          className="bg-ink text-cream font-handwriting text-lg px-8 py-3 rounded-sm shadow-md hover:-translate-y-0.5 transition-all">
          Preview letter →
        </button>
      </div>
    </div>
  )
}