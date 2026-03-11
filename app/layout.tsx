import { DM_Serif_Display, Lora } from 'next/font/google'
import './globals.css'

const serif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
})

const lora = Lora({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-body',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${lora.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-cream text-ink">
        {children}
      </body>
    </html>
  )
}