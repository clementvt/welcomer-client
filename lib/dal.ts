import 'server-only'
 
import { decrypt } from '@/lib/session'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import prisma from './prisma'
 
export const verifySession = cache(async () => {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)
 
  if (!session?.userId) {
    redirect('/login')
  }
 
  return { isAuth: true, userId: session.userId }
})

export const getUser = cache(async () => {
  const session = await verifySession()
  if (!session) return null
 
  try {
      const userId = await prisma.session.findUnique({
          where: { id: session.userId.toString() },
          //   returns only the name and email fields
          select: {
                userId: true,
            },
      })
 
    return userId
  } catch (error) {
    console.log('Failed to fetch user')
    return null
  }
})



