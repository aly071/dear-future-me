'use client'
import { useLetterStore } from '@/store/letterStore'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import type { PaperChoice, FontChoice } from '@/types/letter'

const schema = z.object({
  email:        z.string().email('Please enter a valid email'),
  nickname:     z.string().optional(),
  title:        z.string().optional(),
  message:      z.string().min(10, 'Your letter needs at least 10 characters'),
  deliveryDate: z.string().min(1, 'Please pick a delivery date'),
})

type FormData = z.infer<typeof schema>

const PAPERS: { id: PaperChoice; label: string }[] = [
  { id: 'parchment',  label: 'Parchment'  },
  { id: 'watercolor', label: 'Watercolor' },
  { id: 'botanical',  label: 'Botanical'  },
  { id: 'floral',     label: 'Floral'     },
  { id: 'butterfly',  label: 'Butterfly'  },
  { id: 'collage',    label: 'Collage'    },
  { id: 'gridleaf',   label: 'Grid Leaf'  },
  { id: 'vintage',    label: 'Vintage'    },
]

const FONTS: { id: FontChoice; label: string; preview: string }[] = [
  { id: 'caveat',   label: 'Handwritten', preview: 'font-handwriting'    },
  { id: 'lora',     label: 'Lora serif',  preview: 'font-body'           },
  { id: 'playfair', label: 'Playfair',    preview: 'font-display italic' },
  { id: 'dm-serif', label: 'DM Serif',    preview: 'font-display'        },
]

const fontMap: Record<string, string> = {
  caveat:     'font-handwriting',
  lora:       'font-body',
  playfair:   'font-display italic',
  'dm-serif': 'font-display',
}

const QUICK_DATES = [
  { label: '3 months', months: 3  },
  { label: '6 months', months: 6  },
  { label: '1 year',   months: 12 },
]

export function LetterEditor() {
  const store = useLetterStore()
  const fontClass = fontMap[store.font] || 'font-handwriting'

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email:        store.email,
      nickname:     store.nickname,
      title:        store.title,
      message:      store.message,
      deliveryDate: store.deliveryDate,
    },
  })

  const minDate = new Date()
  minDate.setMonth(minDate.getMonth() + 1)
  const minDateStr = minDate.toISOString().split('T')[0]

  function onSubmit(data: FormData) {
    store.setField('email',        data.email)
    store.setField('nickname',     data.nickname || '')
    store.setField('title',        data.title || '')
    store.setField('message',      data.message)
    store.setField('deliveryDate', data.deliveryDate)
    store.setStep(2)
  }

  return (
    <div>
      <h2 className="font-display italic text-3xl text-ink mb-2">Write your letter</h2>
      <p className="font-body text-ink-light italic text-sm mb-6">Pick your paper, then pour your heart out.</p>

      {/* Paper picker */}
      <div className="mb-4">
        <p className="font-handwriting text-sm text-rose mb-3">choose your paper ↓</p>
        <div className="grid grid-cols-8 gap-2">
          {PAPERS.map((p) => (
            <button key={p.id} type="button" onClick={() => store.setPaper(p.id)}
              className={`flex flex-col items-center gap-1 p-1.5 border rounded-sm transition-all hover:bg-parchment
                ${store.paper === p.id
                  ? 'border-ink bg-parchment shadow-sm'
                  : 'border-dashed border-ink/15'}`}>
              <Image
                src={`/papers/${p.id}.png`}
                alt={p.label}
                width={48}
                height={64}
                className="w-12 h-16 object-cover rounded-sm"
              />
              <span className="font-handwriting text-[10px] text-ink-light leading-tight text-center">{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Font picker */}
      <div className="mb-6">
        <p className="font-handwriting text-sm text-rose mb-3">choose your font ↓</p>
        <div className="flex gap-3 flex-wrap">
          {FONTS.map((f) => (
            <button key={f.id} type="button" onClick={() => store.setFont(f.id)}
              className={`px-5 py-2 border rounded-sm transition-all text-base ${f.preview}
                ${store.font === f.id
                  ? 'bg-ink text-cream border-ink'
                  : 'border-dashed border-ink/20 text-ink hover:bg-parchment'}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Details row */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="font-handwriting text-sm text-ink-light block mb-1">Your email *</label>
            <input {...register('email')} type="email" placeholder="you@example.com"
              className="w-full border-b border-dashed border-ink/30 bg-transparent font-body text-sm text-ink py-1 outline-none focus:border-ink transition-all" />
            {errors.email && <p className="text-rose text-xs mt-1 font-handwriting">{errors.email.message}</p>}
          </div>

          <div>
            <label className="font-handwriting text-sm text-ink-light block mb-1">Nickname (optional)</label>
            <input {...register('nickname')} placeholder="what do you call yourself?"
              className="w-full border-b border-dashed border-ink/30 bg-transparent font-body text-sm text-ink py-1 outline-none focus:border-ink transition-all" />
          </div>

          <div>
            <label className="font-handwriting text-sm text-ink-light block mb-1">Letter title (optional)</label>
            <input {...register('title')} placeholder="e.g. Hey future me..."
              className="w-full border-b border-dashed border-ink/30 bg-transparent font-body text-sm text-ink py-1 outline-none focus:border-ink transition-all" />
          </div>

          <div>
          <div className="flex items-center gap-3 mb-1 flex-wrap">
              <label className="font-handwriting text-sm text-ink-light">Deliver on *</label>
              <div className="flex gap-2">
                {QUICK_DATES.map(({ label, months }) => {
                  const d = new Date()
                  d.setMonth(d.getMonth() + months)
                  const val = d.toISOString().split('T')[0]
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        setValue('deliveryDate', val)
                        store.setField('deliveryDate', val)
                      }}
                      className="font-handwriting text-xs px-3 py-1 border border-dashed border-ink/30 rounded-full hover:bg-parchment hover:border-ink transition-all text-ink-light"
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <input {...register('deliveryDate')} type="date" min={minDateStr}
                className="border-b border-dashed border-ink/30 bg-transparent font-body text-sm text-ink py-1 outline-none focus:border-ink transition-all" />
              
            </div>
            {errors.deliveryDate && <p className="text-rose text-xs mt-1 font-handwriting">{errors.deliveryDate.message}</p>}
          </div>
        </div>

        {/* Letter writing area with paper background */}
        <div className="relative rounded-sm overflow-hidden shadow-lg mb-6" style={{ minHeight: '340px' }}>
          <Image
            src={`/papers/${store.paper}.png`}
            alt="paper"
            fill
            className="object-cover"
          />
          <div className="relative z-10 p-6">
            <p className={`text-ink/50 text-sm mb-2 ${fontClass}`}>
              Dear future {store.nickname || 'me'},
            </p>
            <textarea
              {...register('message')}
              placeholder="What do you want to tell yourself?"
              rows={10}
              className={`w-full bg-transparent outline-none resize-none text-ink text-base leading-9 ${fontClass}`}
              style={{ caretColor: '#2c1a0e' }}
            />
            {errors.message && <p className="text-rose text-xs font-handwriting">{errors.message.message}</p>}
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit"
            className="bg-ink text-cream font-handwriting text-lg px-8 py-3 rounded-sm shadow-md hover:-translate-y-0.5 transition-all">
            Next — decorate →
          </button>
        </div>
      </form>
    </div>
  )
}