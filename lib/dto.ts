import { getUser } from '@/lib/dal'
import { APIGuild, APIUser } from 'discord-api-types/v10'
import 'server-only'

export async function getUserData(): Promise<APIUser | null> {
    try {
        const user = await getUser()
        if (!user) return null
        
        const response = await fetch('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        })
        
        return response.json()
    }
    catch (error) {
        console.log('Failed to fetch user data')
        return null
    }
}

export async function getUserGuilds(): Promise<APIGuild|null> {
    try {
        const user = await getUser()
        if (!user) return null
        
        const response = await fetch('https://discord.com/api/users/@me/guilds', {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        })
        
        return response.json()
    }
    catch (error) {
        console.log('Failed to fetch user guilds')
        return null
    }
}