'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useLetterStore } from '@/store/letterStore'

const schema = z.object({
  email:        z.string().email('Enter a valid email'),
  nickname:     z.string().max(50).optional(),
  title:        z.string().max(100).optional(),
  message:      z.string().min(10, 'Write at least a few words').max(2000),
  deliveryDate: z.string().min(1, 'Pick a delivery date'),
})

type FormData = z.infer<typeof schema>

export function LetterEditor() {
  const store = useLetterStore()
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email:        store.email,
      nickname:     store.nickname,
      title:        store.title,
      message:      store.message,
      deliveryDate: store.deliveryDate,
    },
  })

  const message = watch('message', '')
  const nickname = watch('nickname', '')

  const onSubmit = (data: FormData) => {
    Object.entries(data).forEach(([k, v]) => store.setField(k, v ?? ''))
    store.setStep(2)
  }

  const setMilestone = (months: number) => {
    const d = new Date()
    d.setMonth(d.getMonth() + months)
    setValue('deliveryDate', d.toISOString().split('T')[0])
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative bg-[#fffdf7] shadow-lg rounded-sm p-10 mb-8"
        style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(168,130,90,0.1) 27px, rgba(168,130,90,0.1) 28px)' }}>

        {/* Paper corner fold */}
        <div className="absolute top-0 right-0 w-0 h-0"
          style={{ borderStyle: 'solid', borderWidth: '0 32px 32px 0', borderColor: 'transparent #f5e6c8 transparent transparent' }} />

        {/* Email + Nickname row */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label className="font-handwriting text-sm text-ink-light block mb-1">To (your email)</label>
            <input {...register('email')} type="email" placeholder="your@email.com"
              className="w-full bg-transparent border-b border-dashed border-ink/20 font-handwriting text-lg pb-1 outline-none focus:border-rose transition-colors" />
            {errors.email && <p className="text-rose text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="font-handwriting text-sm text-ink-light block mb-1">Your nickname (optional)</label>
            <input {...register('nickname')} placeholder="Future Camille..."
              className="w-full bg-transparent border-b border-dashed border-ink/20 font-handwriting text-lg pb-1 outline-none focus:border-rose transition-colors" />
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <label className="font-handwriting text-sm text-ink-light block mb-1">Letter title (optional)</label>
          <input {...register('title')} placeholder="Things I want you to remember..."
            className="w-full bg-transparent border-b border-dashed border-ink/20 font-handwriting text-lg pb-1 outline-none focus:border-rose transition-colors" />
        </div>

        {/* Salutation */}
        <div className="font-handwriting text-xl text-ink-light mb-3">
          Dear future {nickname || 'me'},
        </div>

        {/* Message */}
        <div className="mb-6">
          <textarea {...register('message')} rows={8} placeholder="Write freely. No one else will read this. Tell yourself about today..."
            className="w-full bg-transparent font-handwriting text-lg leading-7 outline-none resize-none"
            style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(168,130,90,0.08) 27px, rgba(168,130,90,0.08) 28px)' }} />
          <div className="text-right font-handwriting text-xs text-rose">{message.length} / 2000</div>
          {errors.message && <p className="text-rose text-xs">{errors.message.message}</p>}
        </div>

        {/* Delivery date */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="font-handwriting text-sm text-ink-light block mb-1">Deliver this letter on</label>
            <input {...register('deliveryDate')} type="date" min={minDate}
              className="w-full bg-transparent border-b border-dashed border-ink/20 font-handwriting text-lg pb-1 outline-none focus:border-rose transition-colors" />
            {errors.deliveryDate && <p className="text-rose text-xs mt-1">{errors.deliveryDate.message}</p>}
          </div>
          <div>
            <label className="font-handwriting text-sm text-ink-light block mb-1">Or pick a milestone</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {[['3mo', 3], ['6mo', 6], ['1yr', 12], ['2yr', 24]].map(([label, months]) => (
                <button key={label} type="button" onClick={() => setMilestone(Number(months))}
                  className="font-handwriting text-sm px-3 py-1 border border-dashed border-blush rounded-sm hover:bg-parchment transition-colors">
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sign off */}
      <div className="font-handwriting text-lg text-ink-light italic mb-8 px-2">
        With love, your past self ✦
      </div>

      {/* Next button */}
      <div className="flex justify-end">
        <button type="submit"
          className="bg-ink text-cream font-handwriting text-lg px-8 py-3 rounded-sm shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all">
          Decorate envelope →
        </button>
      </div>
    </form>
  )
}