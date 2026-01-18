import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    cookies().set('admin-auth', 'true', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 8 // 8 hours
    })

    return NextResponse.json({ success: true })
  }

  return NextResponse.json(
    { error: 'Invalid credentials' },
    { status: 401 }
  )
}
