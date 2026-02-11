"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { apiServer } from "@/lib/apiServer";
import { SESSION_COOKIE, statusCodes } from "@/lib/utils";
import { AuthResponse, User } from "@/types/auth";

export async function getServerUser(): Promise<User | null> {
  const response = await apiServer<AuthResponse>("/api/v1/me");

  if (response.status === statusCodes.unauthorized) {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
    return null;
  }

  if (response.status !== statusCodes.ok) {
    return null;
  }

  return response.data;
}

export async function serverLogout(): Promise<void> {
  await apiServer("/api/v1/logout", { method: "DELETE" });

  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);

  redirect("/login");
}
