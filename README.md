💌 Dear Future Me

Dear Future Me is a heartfelt web app that lets you write a letter to your future self. Pick a date, write your thoughts, decorate your envelope, and it will be delivered straight to your inbox at the time you choose.

🌐 Live site: https://dear-future-me-five.vercel.app

✨ Features
📝 Write a personal letter — capture your thoughts, goals, or reflections
🎨 Customize your envelope — choose colors, fonts, and stickers
📅 Schedule delivery — pick any future date or milestone like 6 months / 1 year
✉️ Automatic email delivery — your letter is sent to your inbox at the chosen time
👀 Preview your letter — see exactly how it will look before sending

🛠️ Tech Stack
Next.js 16 — App Router + API Routes
Tailwind CSS v4 — modern styling
Framer Motion — smooth animations
Zustand — state management
Prisma v5 + Supabase — database & backend
Resend + React Email — reliable email delivery
Vercel + Vercel Cron — deployment & scheduling

📁 Project Structure
dear-future-me/
├── app/                  # Next.js App Router
│   ├── api/              # API routes (letters, verify, cron)
│   ├── write/            # 4-step letter wizard page
│   └── confirmed/        # Post-verification page
├── components/
│   ├── editor/           # Step 1 — Write your letter
│   ├── customize/        # Step 2 — Decorate your envelope
│   ├── preview/          # Step 3 — Preview your letter
│   ├── confirm/          # Step 4 — Confirm & send
│   └── wizard/           # Wizard shell & stepper
├── emails/               # React Email templates
├── lib/                  # Prisma, Resend, scheduler, crypto helpers
├── prisma/               # Database schema & migrations
├── store/                # Zustand letter store
└── types/                # TypeScript types

🙋‍♀️ Connect with Me
🌐 Portfolio: nxahlyv2.vercel.app
💼 LinkedIn: Nathaly Pearl S
🐙 GitHub: aly071
📧 Email: salanatinnathaly@gmail.com
📄 License

Open for inspiration and learning. Please don’t copy the design directly. ✦

✨ Try it now: https://dear-future-me-five.vercel.app
 and write a letter to your future self today!