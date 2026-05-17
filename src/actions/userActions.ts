import { api } from "@/lib/api";
import { statusCodes } from "@/lib/utils";
import { ApiResponse } from "@/types/general";
import { UserResponse } from "@/types/user";

export async function getUsers(): Promise<ApiResponse<UserResponse | null>> {
  const response = await api<UserResponse>("/api/v1/users", {
    method: "GET",
  });

  return {
    success: response.status === statusCodes.ok,
    data: response.data,
  };
}
