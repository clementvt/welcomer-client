import 'server-only'
import { getUser } from '@/lib/dal'
import prisma from './prisma'
import { APIGuild } from 'discord-api-types/v10'

export async function getUserGuilds(): Promise<APIGuild|null> {
    try {
        const user = await getUser()
        if (!user) return null
        const accessToken = await prisma.user.findUnique({
            where: { id: user.id },
            select: { accessToken: true },
        })

        if (!user) return null
        
        const response = await fetch('https://discord.com/api/users/@me/guilds', {
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        })
        
        return response.json()
    }
    catch (error) {
        console.log('Failed to fetch user guilds')
        return null
    }
}