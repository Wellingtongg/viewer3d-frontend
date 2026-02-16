import { api } from "@/lib/api";
import { statusCodes } from "@/lib/utils";
import { UpdateMyCurrentCompanyParams } from "@/types/user";
import { ApiResponse } from "@/types/general";

export async function updateMyCurrentCompany(
  params: UpdateMyCurrentCompanyParams,
): Promise<ApiResponse<null>> {
  const response = await api("/api/v1/users/update_my_current_company", {
    method: "PATCH",
    body: params,
  });

  return {
    success: response.status === statusCodes.ok,
    data: null,
  };
}
