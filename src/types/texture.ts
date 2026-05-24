import { ResponseWithErrors } from "./general";

export interface Texture {
  id: number;
  name: string;
  is_favorite: boolean;
  maps: TextureMaps;
}

export interface TextureParams {
  name: string;
  is_favorite: boolean;
}

export interface TextureResponse extends Texture, ResponseWithErrors {}

export interface TextureMaps {
  albedo: boolean;
  normalMap: boolean;
  roughness: boolean;
  metalness: boolean;
  ao: boolean;
}
