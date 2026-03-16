const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function rateLimit(ip: string, limit = 5, windowMs = 60_000): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true // allowed
  }

  if (entry.count >= limit) {
    return false // blocked
  }

  entry.count++
  return true // allowed
}