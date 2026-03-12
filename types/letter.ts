export type FontChoice = 'caveat' | 'lora' | 'playfair' | 'dm-serif'

export type SealChoice = 'thistle' | 'bouquet' | 'bow' | 'rose' | 'wreath' | 'daisy' | 'none'

export interface DesignSettings {
  color:    string
  font:     FontChoice
  stickers: string[]
  seal:     SealChoice
}

export interface LetterDraft {
  email:        string
  nickname?:    string
  title?:       string
  message:      string
  deliveryDate: string
  design:       DesignSettings
}