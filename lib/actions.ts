"use server"

import { redirect } from "next/navigation";
import { deleteSession } from "./session";


export async function signIn() {
     redirect("/api/auth/login")
}

export async function signOut() {
     deleteSession();
     redirect("/")
}