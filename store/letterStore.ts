import { create } from 'zustand'
import type { FontChoice, SealChoice } from '@/types/letter'

interface LetterStore {
  step: 1 | 2 | 3 | 4
  setStep: (step: 1 | 2 | 3 | 4) => void

  email:        string
  nickname:     string
  title:        string
  message:      string
  deliveryDate: string

  color:    string
  font:     FontChoice
  stickers: string[]
  seal:     SealChoice

  setField:      (key: string, value: string) => void
  toggleSticker: (emoji: string) => void
  setColor:      (color: string) => void
  setFont:       (font: FontChoice) => void
  setSeal:       (seal: SealChoice) => void
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
  seal:         'none' as SealChoice,
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
  setSeal:  (seal)  => set({ seal }),
  reset:    ()      => set(defaults),
}))