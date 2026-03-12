'use client'
import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useLetterStore } from '@/store/letterStore'

export function ConfirmScreen() {
  const store = useLetterStore()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const submitted = useRef(false)

  const deliveryDate = store.deliveryDate
    ? new Date(store.deliveryDate + 'T00:00:00').toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    : ''

  useEffect(() => {
    if (submitted.current) return
    submitted.current = true

    const submit = async () => {
      try {
        const res = await fetch('/api/letters', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email:        store.email,
            nickname:     store.nickname,
            title:        store.title,
            message:      store.message,
            deliveryDate: store.deliveryDate,
            design: {
              color:    store.color,
              font:     store.font,
              stickers: store.stickers,
              seal:     store.seal,
              envelope: store.envelope,
            },
          }),
        })
        if (res.ok) {
          setStatus('success')
        } else {
          setStatus('error')
        }
      } catch {
        setStatus('error')
      }
    }

    submit()
  }, [])

  if (status === 'loading') {
    return (
      <div className="text-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="text-5xl mb-6 inline-block"
        >
          ✦
        </motion.div>
        <p className="font-handwriting text-xl text-ink-light">Sealing your letter...</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-6">✉️</div>
        <h2 className="font-display italic text-3xl text-ink mb-4">Something went wrong</h2>
        <p className="font-body text-ink-light mb-8">We couldn't send your letter. Please try again.</p>
        <button
          onClick={() => { setStatus('loading'); submitted.current = false }}
          className="bg-ink text-cream font-handwriting text-lg px-8 py-3 rounded-sm"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="text-center py-12">

      {/* Flying envelope */}
      <motion.div
        className="text-7xl mb-8 inline-block"
        animate={{ y: [0, -20, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        ✉️
      </motion.div>

      <h2 className="font-display italic text-4xl text-ink mb-4">
        Your letter is on its way.
      </h2>

      <p className="font-body text-ink-light text-lg leading-8 max-w-md mx-auto mb-8">
        You've written something beautiful.<br />
        It'll find you exactly when you need it.
      </p>

      {/* Delivery badge */}
      <div className="inline-block border border-dashed border-blush bg-parchment px-8 py-4 rounded-sm font-handwriting text-lg text-ink mb-10">
        📅 Arriving on: <span className="text-rose font-semibold">{deliveryDate}</span>
      </div>

      <p className="font-handwriting text-sm text-ink-light mb-2">
        Check <span className="text-rose">{store.email}</span> for a confirmation email.
      </p>

      {/* Write another */}
      <div className="mt-10">
        <button
          onClick={() => store.reset()}
          className="bg-ink text-cream font-handwriting text-lg px-8 py-3 rounded-sm shadow-md hover:-translate-y-0.5 transition-all"
        >
          Write another letter ✦
        </button>
      </div>

    </div>
  )
}