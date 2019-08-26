import { IncomingMessage } from 'http'
import { NextApiRequest } from 'next'
import { parse } from 'cookie'

export function parseCookies(req: IncomingMessage) {
  const { cookies } = req as NextApiRequest

  // API Routes
  if (cookies) return cookies

  // Pages
  const cookie = req && req.headers && req.headers.cookie
  const cookiesObj = parse(cookie || '')

  return cookiesObj
}
