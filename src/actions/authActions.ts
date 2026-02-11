import { api } from "@/lib/api";
import { statusCodes } from "@/lib/utils";
import {
  AuthResponse,
  LoginCredentials,
  SignupCredentials,
} from "@/types/auth";
import { ApiResponse } from "@/types/general";

export async function login(
  credentials: LoginCredentials,
): Promise<ApiResponse<AuthResponse | null>> {
  const response = await api<AuthResponse>("/api/v1/login", {
    method: "POST",
    body: { user: credentials },
  });

  return {
    success: response.status === statusCodes.ok,
    data: response.data,
  };
}

export async function signup(
  credentials: SignupCredentials,
): Promise<ApiResponse<AuthResponse | null>> {
  const response = await api<AuthResponse>("/api/v1/signup", {
    method: "POST",
    body: { user: credentials },
  });

  return {
    success: response.status === statusCodes.created,
    data: response.data,
  };
}
