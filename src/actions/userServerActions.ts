"use server";

import { apiServer } from "@/lib/apiServer";
import { statusCodes } from "@/lib/utils";
import { UpdateMyCurrentCompanyParams } from "@/types/user";
import { ApiResponse } from "@/types/general";

export async function updateMyCurrentCompany(
  params: UpdateMyCurrentCompanyParams,
): Promise<ApiResponse<null>> {
  const response = await apiServer("/api/v1/users/update_my_current_company", {
    method: "PATCH",
    body: params,
  });

  return {
    success: response.status === statusCodes.ok,
    data: null,
  };
}
