// middleware.js (root of project)
import { NextResponse } from 'next/server'

export function middleware(req) {
  const url = req.nextUrl

  if (url.pathname === '/') {
    // redirect or block
    return NextResponse.redirect(new URL('/coming-soon', req.url))
  }

  return NextResponse.next()
}
