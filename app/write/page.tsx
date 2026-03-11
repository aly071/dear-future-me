'use client'
import { useLetterStore } from '@/store/letterStore'
import { WizardStepper } from '@/components/wizard/WizardStepper'
import { WizardShell } from '@/components/wizard/WizardShell'

export default function WritePage() {
  const step = useLetterStore((s) => s.step)

  return (
    <main className="min-h-screen bg-cream">
      <WizardStepper currentStep={step} />
      <WizardShell step={step}>
        {step === 1 && <div className="font-handwriting text-2xl text-ink">Step 1 — Write your letter</div>}
        {step === 2 && <div className="font-handwriting text-2xl text-ink">Step 2 — Decorate</div>}
        {step === 3 && <div className="font-handwriting text-2xl text-ink">Step 3 — Preview</div>}
        {step === 4 && <div className="font-handwriting text-2xl text-ink">Step 4 — Confirm</div>}
      </WizardShell>
    </main>
  )
}