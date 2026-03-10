# 💌 Dear Future Me

A cute and interactive web application that lets you write a letter to your future self. Your letter gets delivered to your email on a chosen future date — sealed with a custom envelope, fonts, and stickers.

## ✨ Features

- 📝 Write a letter to your future self
- 🎨 Customize your envelope — colors, fonts, and stickers
- 📅 Choose a delivery date (3 months, 1 year, or any custom date)
- ✉️ Automatic email delivery on the scheduled date
- 👀 Preview your letter before sending

## 🛠️ Tech Stack

- **Frontend** — Next.js 14, Tailwind CSS v4, Framer Motion
- **Backend** — Next.js API Routes, Prisma v5, PostgreSQL
- **Database** — Supabase (PostgreSQL)
- **Email** — Resend + React Email
- **Deployment** — Vercel + Vercel Cron

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/aly071/dear-future-me.git
cd dear-future-me
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.local.example .env.local
```
Fill in your Supabase, Resend, and secret token values.

### 4. Run database migration
```bash
npx prisma migrate dev --name init
```

### 5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure
```
dear-future-me/
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   ├── write/            # 4-step wizard page
│   └── letter/[id]/      # Letter web view
├── components/           # React components
│   ├── editor/           # Step 1 - Write
│   ├── customize/        # Step 2 - Decorate
│   ├── preview/          # Step 3 - Preview
│   ├── confirm/          # Step 4 - Confirm
│   └── wizard/           # Wizard shell & stepper
├── emails/               # React Email templates
├── lib/                  # Prisma, Resend, helpers
├── prisma/               # Database schema
├── store/                # Zustand state
└── types/                # TypeScript types
```

## 🌍 Deployment

Deployed on [Vercel](https://vercel.com). Letters are delivered daily via Vercel Cron at 08:00 UTC.

## 📄 License

MIT
