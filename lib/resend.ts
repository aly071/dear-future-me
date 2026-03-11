import { Resend } from 'resend'
import { render } from '@react-email/render'
import VerificationEmail from '@/emails/VerificationEmail'
import LetterDelivery from '@/emails/LetterDelivery'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.FROM_EMAIL!

export async function sendVerificationEmail(opts: {
  to:           string
  verifyUrl:    string
  cancelUrl:    string
  deliveryDate: string
}) {
  const html = await render(VerificationEmail({
    verifyUrl:    opts.verifyUrl,
    cancelUrl:    opts.cancelUrl,
    deliveryDate: opts.deliveryDate,
  }))

  return resend.emails.send({
    from:    FROM,
    to:      opts.to,
    subject: '✉️ Confirm your letter — Dear Future Me',
    html,
  })
}

export async function sendLetterEmail(opts: {
  to:          string
  message:     string
  nickname?:   string
  title?:      string
  color:       string
  stickers:    string[]
  writtenDate: string
  viewUrl:     string
}) {
  const html = await render(LetterDelivery({
    message:     opts.message,
    nickname:    opts.nickname,
    title:       opts.title,
    color:       opts.color,
    stickers:    opts.stickers,
    writtenDate: opts.writtenDate,
    viewUrl:     opts.viewUrl,
  }))

  return resend.emails.send({
    from:    FROM,
    to:      opts.to,
    subject: opts.title ? `✉️ ${opts.title}` : '✉️ A Letter From Your Past Self',
    html,
  })
}