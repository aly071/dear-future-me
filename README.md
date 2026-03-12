# 💌 Dear Future Me

Dear Future Me is a heartfelt little web app I built where you can write a letter to your future self. You pick a date, write your letter, decorate your envelope, and it gets delivered straight to your inbox when the time comes.

Live site: **https://dear-future-me-five.vercel.app**

## ✨ What it does

- 📝 Write a personal letter to your future self
- 🎨 Customize your envelope with colors, fonts, and stickers
- 📅 Choose any future delivery date — or pick a milestone like 6 months or 1 year
- ✉️ Automatic email delivery on your chosen date
- 👀 Preview your letter before sealing it

## 🛠️ Built with

- **Next.js 16** — App Router + API Routes
- **Tailwind CSS v4** — styling
- **Framer Motion** — animations
- **Zustand** — state management
- **Prisma v5 + Supabase** — database
- **Resend + React Email** — email delivery
- **Vercel + Vercel Cron** — deployment and scheduling

## 📁 Project structure
```
dear-future-me/
├── app/                  # Next.js App Router
│   ├── api/              # API routes (letters, verify, cron)
│   ├── write/            # 4-step wizard page
│   └── confirmed/        # Post-verification page
├── components/
│   ├── editor/           # Step 1 — Write your letter
│   ├── customize/        # Step 2 — Decorate your envelope
│   ├── preview/          # Step 3 — Preview
│   ├── confirm/          # Step 4 — Confirm & send
│   └── wizard/           # Wizard shell & stepper
├── emails/               # React Email templates
├── lib/                  # Prisma, Resend, scheduler, crypto helpers
├── prisma/               # Database schema & migrations
├── store/                # Zustand letter store
└── types/                # TypeScript types
```

## 🙋‍♀️ Connect with me

I'd love to hear what you think of this project!

- 🌐 Portfolio — [nxahlyv2.vercel.app](https://nxahlyv2.vercel.app)
- 💼 LinkedIn — [nathaly-pearl-s](https://www.linkedin.com/in/nathaly-pearl-s-08396a347/)
- 🐙 GitHub — [aly071](https://github.com/aly071)
- 📧 Email — salanatinnathaly@gmail.com

## 📄 License

Open for inspiration and learning. Please don't copy the design directly. ✦