import { create } from 'zustand'
import type { FontChoice } from '@/types/letter'

interface LetterStore {
  // Navigation
  step: 1 | 2 | 3 | 4
  setStep: (step: 1 | 2 | 3 | 4) => void

  // Step 1 — letter content
  email:        string
  nickname:     string
  title:        string
  message:      string
  deliveryDate: string

  // Step 2 — design
  color:    string
  font:     FontChoice
  stickers: string[]

  // Actions
  setField:      (key: string, value: string) => void
  toggleSticker: (emoji: string) => void
  setColor:      (color: string) => void
  setFont:       (font: FontChoice) => void
  reset:         () => void
}

const defaults = {
  step:         1 as const,
  email:        '',
  nickname:     '',
  title:        '',
  message:      '',
  deliveryDate: '',
  color:        '#e8c4b4',
  font:         'caveat' as FontChoice,
  stickers:     [] as string[],
}

export const useLetterStore = create<LetterStore>((set) => ({
  ...defaults,

  setStep: (step) => set({ step }),

  setField: (key, value) => set({ [key]: value } as any),

  toggleSticker: (emoji) => set((state) => ({
    stickers: state.stickers.includes(emoji)
      ? state.stickers.filter((s) => s !== emoji)
      : state.stickers.length < 5
        ? [...state.stickers, emoji]
        : state.stickers,
  })),

  setColor: (color) => set({ color }),
  setFont:  (font)  => set({ font }),
  reset:    ()      => set(defaults),
}))