import { api } from "@/lib/api";
import { statusCodes } from "@/lib/utils";
import { ApiResponse } from "@/types/general";
import { TextureParams, TextureResponse } from "@/types/texture";

export async function createTexture(
  params: TextureParams,
): Promise<ApiResponse<TextureResponse>> {
  const response = await api<TextureResponse>("/api/v1/textures", {
    method: "POST",
    body: { texture: params },
  });

  return {
    success: response.status === statusCodes.created,
    data: response.data as TextureResponse,
  };
}
