'use client'
import { AnimatePresence, motion } from 'framer-motion'

export function WizardShell({ step, children }: { step: number; children: React.ReactNode }) {
  return (
    <div className="max-w-2xl mx-auto px-5 pb-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}