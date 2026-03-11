import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateToken, buildUrl } from '@/lib/crypto'
import { sendVerificationEmail } from '@/lib/resend'
import { z } from 'zod'

const schema = z.object({
  email:        z.string().email(),
  nickname:     z.string().max(50).optional(),
  title:        z.string().max(100).optional(),
  message:      z.string().min(10).max(2000),
  deliveryDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  design: z.object({
    color:    z.string().regex(/^#[0-9a-f]{6}$/i),
    font:     z.enum(['caveat', 'lora', 'playfair', 'dm-serif']),
    stickers: z.array(z.string()).max(5),
  }),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { email, nickname, title, message, deliveryDate, design } = parsed.data

    const dDate = new Date(deliveryDate + 'T00:00:00')
    if (dDate <= new Date()) {
      return NextResponse.json(
        { error: 'Delivery date must be in the future' },
        { status: 400 }
      )
    }

    const verifyToken = generateToken()
    const cancelToken = generateToken()
    const viewToken   = generateToken()

    const letter = await prisma.letter.create({
      data: {
        email,
        nickname,
        title,
        message,
        deliveryDate: dDate,
        design,
        verifyToken,
        cancelToken,
        viewToken,
      },
    })

    const verifyUrl = buildUrl('/api/verify', { token: verifyToken })
    const cancelUrl = buildUrl('/api/letters/' + letter.id + '/cancel', { token: cancelToken })

    await sendVerificationEmail({
      to:           email,
      verifyUrl,
      cancelUrl,
      deliveryDate: dDate.toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      }),
    })

    return NextResponse.json({
      id:           letter.id,
      status:       'PENDING_VERIFY',
      deliveryDate: deliveryDate,
      message:      'Check your email to confirm delivery.',
    })

  } catch (error) {
    console.error('Error creating letter:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}