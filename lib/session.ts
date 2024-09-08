import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from '@/types'
import { cookies } from 'next/headers'
import prisma from './prisma'
 
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
 
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}
 
export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}

export async function createSession(id: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    
    const data = await prisma.session.create({
        data: {
            userId: id,
            expiresAt,
        },
    })

    const sessionId = data.id

    const session = await encrypt({ id: sessionId, expiresAt })
 
  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function updateSession() {
  const session = cookies().get('session')?.value
  const payload = await decrypt(session)
 
  if (!session || !payload) {
    return null
  }
    // refresh the user session with refresh token
    // TODO: implement refresh token logic    
 
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}

export function deleteSession() {
  cookies().delete('session')
}