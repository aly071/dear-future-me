import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.redirect(
        new URL('/error?reason=missing-token', process.env.NEXT_PUBLIC_APP_URL)
      )
    }

    const letter = await prisma.letter.findUnique({
      where: { verifyToken: token },
    })

    if (!letter || letter.status !== 'PENDING_VERIFY') {
      return NextResponse.redirect(
        new URL('/error?reason=invalid-token', process.env.NEXT_PUBLIC_APP_URL)
      )
    }

    // Update status to SCHEDULED and clear the verify token
    await prisma.letter.update({
      where: { id: letter.id },
      data: {
        status:      'SCHEDULED',
        verifyToken: null,
      },
    })

    // Redirect to confirmed page
    const deliveryDate = letter.deliveryDate.toISOString().split('T')[0]
    return NextResponse.redirect(
      new URL(`/confirmed?date=${deliveryDate}`, process.env.NEXT_PUBLIC_APP_URL)
    )

  } catch (error) {
    console.error('Error verifying letter:', error)
    return NextResponse.redirect(
      new URL('/error?reason=server-error', process.env.NEXT_PUBLIC_APP_URL)
    )
  }
}