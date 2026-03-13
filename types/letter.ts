export type FontChoice = 'caveat' | 'lora' | 'playfair' | 'dm-serif'
export type SealChoice = 'thistle' | 'bouquet' | 'bow' | 'rose' | 'wreath' | 'daisy' | 'none'
export type EnvelopeChoice = 'handmade' | 'classic' | 'blush' | 'crimson' | 'teal' | 'kraft' | 'silver'
export type PaperChoice = 'parchment' | 'watercolor' | 'botanical' | 'floral' | 'butterfly' | 'collage' | 'gridleaf' | 'vintage'

export interface DesignSettings {
  color:    string
  font:     FontChoice
  stickers: string[]
  seal:     SealChoice
  envelope: EnvelopeChoice
  paper:    PaperChoice
}

export interface LetterDraft {
  email:        string
  nickname?:    string
  title?:       string
  message:      string
  deliveryDate: string
  design:       DesignSettings
}