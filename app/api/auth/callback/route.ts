import connectDb from '@/lib/db';
import prisma from '@/lib/prisma';
import { createSession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID!;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET!;
const REDIRECT_URI = process.env.REDIRECT_URI!;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect('/login?error=no_code');
  }

  try {
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return NextResponse.json({ error: tokenData.error });
    }

    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        authorization: `${tokenData.token_type} ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();
    if (!userData.id) {
      return NextResponse.json({ error: 'No user ID found' });
    }

    const user = await prisma.user.upsert({
      where: { id: userData.id },
      update: {
        name: userData.username,
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
      },
      create: {
        id: userData.id,  
        name: userData.username,
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
      },
    });

    await createSession(user.id);

    return NextResponse.json({ user });
    // const response = NextResponse.redirect('/dashboard');
    // response.cookies.set('user_id', userData.id, { httpOnly: true, secure: true });
    // return response;
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json({ error });
  }
}
