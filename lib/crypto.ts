import crypto from 'crypto'

export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

export function buildUrl(path: string, params: Record<string, string>): string {
  const base = process.env.NEXT_PUBLIC_APP_URL
  const url = new URL(path, base)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  return url.toString()
}