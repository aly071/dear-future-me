export type FontChoice = 'caveat' | 'lora' | 'playfair' | 'dm-serif'

export interface DesignSettings {
  color:    string
  font:     FontChoice
  stickers: string[]
}

export interface LetterDraft {
  email:        string
  nickname?:    string
  title?:       string
  message:      string
  deliveryDate: string
  design:       DesignSettings
}