import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

import prisma from "./prisma";

import { SessionPayload } from "@/types";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch {
    return null;
  }
}

export async function createSession(id: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const data = await prisma.session.upsert({
    where: { id },
    update: {},
    create: {
      userId: id,
      expiresAt,
    },
  });

  const sessionId = data.id;

  const session = await encrypt({ sessionId: sessionId, expiresAt });

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const session = getSession();
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }
  // refresh the user session with refresh token
  // TODO: implement refresh token logic

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export function getSession() {
  return cookies().get("session")?.value;
}

export async function deleteSession() {
  const session = getSession();

  cookies().delete("session");

  if (!session) return null;
  const payload = await decrypt(session);

  if (!payload) return null;

  await prisma.session.delete({
    where: {
      id: payload.sessionId as string,
    },
  });
}

export async function getUserSession(sessionId: string) {
  return await prisma.session.findFirst({
    where: { id: sessionId.toString() },
  });
}