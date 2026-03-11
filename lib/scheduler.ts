import { prisma } from '@/lib/prisma'
import { sendLetterEmail } from '@/lib/resend'
import { buildUrl } from '@/lib/crypto'

export async function deliverDueLetters() {
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const endOfDay   = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

  // Find all scheduled letters due today
  const letters = await prisma.letter.findMany({
    where: {
      status:      'SCHEDULED',
      deliveryDate: {
        gte: startOfDay,
        lt:  endOfDay,
      },
    },
  })

  console.log(`📬 Found ${letters.length} letters to deliver`)

  const results = await Promise.allSettled(
    letters.map(async (letter) => {
      try {
        const design   = letter.design as { color: string; font: string; stickers: string[] }
        const viewUrl  = buildUrl('/letter/' + letter.id, { token: letter.viewToken })
        const writtenDate = letter.createdAt.toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric'
        })

        await sendLetterEmail({
          to:          letter.email,
          message:     letter.message,
          nickname:    letter.nickname ?? undefined,
          title:       letter.title ?? undefined,
          color:       design.color,
          stickers:    design.stickers,
          writtenDate,
          viewUrl,
        })

        await prisma.letter.update({
          where: { id: letter.id },
          data:  { status: 'SENT', sentAt: new Date() },
        })

        console.log(`✅ Delivered letter ${letter.id} to ${letter.email}`)
      } catch (error) {
        console.error(`❌ Failed to deliver letter ${letter.id}:`, error)

        await prisma.letter.update({
          where: { id: letter.id },
          data:  { status: 'FAILED' },
        })
      }
    })
  )

  const succeeded = results.filter((r) => r.status === 'fulfilled').length
  const failed    = results.filter((r) => r.status === 'rejected').length

  return { total: letters.length, succeeded, failed }
}