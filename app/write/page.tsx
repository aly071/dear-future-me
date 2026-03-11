'use client'
import { useLetterStore } from '@/store/letterStore'
import { WizardStepper } from '@/components/wizard/WizardStepper'
import { WizardShell } from '@/components/wizard/WizardShell'
import { LetterEditor } from '@/components/editor/LetterEditor'
import { EnvelopeCustomizer } from '@/components/customize/EnvelopeCustomizer'
import { LetterPreview } from '@/components/preview/LetterPreview'
import { ConfirmScreen } from '@/components/confirm/ConfirmScreen'

export default function WritePage() {
  const step = useLetterStore((s) => s.step)

  return (
    <main className="min-h-screen bg-cream">
      <WizardStepper currentStep={step} />
      <WizardShell step={step}>
        {step === 1 && <LetterEditor />}
        {step === 2 && <EnvelopeCustomizer />}
        {step === 3 && <LetterPreview />}
        {step === 4 && <ConfirmScreen />}
      </WizardShell>
    </main>
  )
}