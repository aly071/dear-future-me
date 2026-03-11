'use client'

const STEPS = ['Write', 'Decorate', 'Preview', 'Send']

export function WizardStepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-0 py-10">
      {STEPS.map((label, i) => {
        const n = i + 1
        const isActive = n === currentStep
        const isDone = n < currentStep
        return (
          <div key={n} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center
                font-handwriting text-sm transition-all
                ${isActive ? 'bg-ink text-cream border-ink' :
                  isDone   ? 'bg-sage text-cream border-sage' :
                             'border-ink-light text-ink-light opacity-40'}`}>
                {isDone ? '✓' : n}
              </div>
              <span className="font-handwriting text-xs text-ink-light">{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="w-14 border-t border-dashed border-blush mb-5" />
            )}
          </div>
        )
      })}
    </div>
  )
}