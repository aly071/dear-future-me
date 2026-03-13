'use client'
import { useLetterStore } from '@/store/letterStore'
import { EnvelopePreview } from './EnvelopePreview'
import Image from 'next/image'
import type { FontChoice, SealChoice, EnvelopeChoice } from '@/types/letter'

const ENVELOPES: { id: EnvelopeChoice; label: string }[] = [
  { id: 'classic',  label: 'Classic'  },
  { id: 'blush',    label: 'Blush'    },
  { id: 'crimson',  label: 'Crimson'  },
  { id: 'teal',     label: 'Teal'     },
  { id: 'kraft',    label: 'Kraft'    },
  { id: 'silver',   label: 'Silver'   },
]

const SEALS: { id: SealChoice; label: string }[] = [
  { id: 'thistle', label: 'Thistle' },
  { id: 'bouquet', label: 'Bouquet' },
  { id: 'bow',     label: 'Bow'     },
  { id: 'rose',    label: 'Rose'    },
  { id: 'wreath',  label: 'Wreath'  },
  { id: 'daisy',   label: 'Daisy'   },
]

export function EnvelopeCustomizer() {
  const { envelope, font, seal, setEnvelope, setFont, setSeal, setStep } = useLetterStore()

  return (
    <div>
      <h2 className="font-display italic text-3xl text-ink mb-2">Dress up your envelope</h2>
      <p className="font-body text-ink-light italic text-sm mb-8">Make it feel like yours.</p>

      <EnvelopePreview envelope={envelope} seal={seal} />

      <div className="grid grid-cols-2 gap-8 mt-10">

        {/* Envelope style */}
        <div className="col-span-2">
          <h3 className="font-display text-xl text-ink mb-1">Envelope style</h3>
          <p className="font-handwriting text-sm text-rose mb-4">choose your envelope</p>
          <div className="grid grid-cols-6 gap-3">
            {ENVELOPES.map((e) => (
              <button key={e.id} type="button" onClick={() => setEnvelope(e.id)}
                className={`flex flex-col items-center gap-2 p-2 border rounded-sm transition-all hover:bg-parchment
                  ${envelope === e.id
                    ? 'border-ink bg-parchment shadow-sm'
                    : 'border-dashed border-ink/15'}`}>
                <Image
                  src={`/envelopes/${e.id}.png`}
                  alt={e.label}
                  width={80}
                  height={56}
                  className="w-20 h-14 object-contain"
                />
                <span className="font-handwriting text-xs text-ink-light">{e.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Wax Seal */}
        <div className="col-span-2">
          <h3 className="font-display text-xl text-ink mb-1">Wax seal</h3>
          <p className="font-handwriting text-sm text-rose mb-4">choose your seal</p>
          <div className="grid grid-cols-6 gap-3">
            {SEALS.map((s) => (
              <button key={s.id} type="button" onClick={() => setSeal(s.id)}
              className={`flex flex-col items-center gap-2 p-3 border rounded-sm transition-all hover:bg-parchment
                ${seal === s.id
                  ? 'border-ink bg-parchment shadow-sm'
                  : 'border-dashed border-ink/15'}`}>
              <div className="w-20 h-14 flex items-center justify-center">
                <Image
                  src={`/seals/${s.id}.png`}
                  alt={s.label}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-handwriting text-xs text-ink-light">{s.label}</span>
            </button>
            ))}
          </div>
        </div>

      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-10">
        <button type="button" onClick={() => setStep(1)}
          className="font-handwriting text-lg px-6 py-2 border border-dashed border-ink/30 rounded-sm hover:bg-parchment transition-all">
          Back
        </button>
        <button type="button" onClick={() => setStep(3)}
          className="bg-ink text-cream font-handwriting text-lg px-8 py-3 rounded-sm shadow-md hover:-translate-y-0.5 transition-all">
          Preview letter →
        </button>
      </div>
    </div>
  )
}