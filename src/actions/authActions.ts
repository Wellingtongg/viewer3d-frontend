import { api } from "@/lib/api";
import { statusCodes } from "@/lib/utils";
import { AuthResponse, LoginParams, SignupParams } from "@/types/auth";
import { ApiResponse } from "@/types/general";

export async function login(
  params: LoginParams,
): Promise<ApiResponse<AuthResponse | null>> {
  const response = await api<AuthResponse>("/api/v1/login", {
    method: "POST",
    body: { user: params },
  });

  return {
    success: response.status === statusCodes.ok,
    data: response.data,
  };
}

export async function signup(
  params: SignupParams,
): Promise<ApiResponse<AuthResponse | null>> {
  const response = await api<AuthResponse>("/api/v1/signup", {
    method: "POST",
    body: { user: params },
  });

  return {
    success: response.status === statusCodes.created,
    data: response.data,
  };
}
