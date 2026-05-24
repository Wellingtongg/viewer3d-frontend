import { createTexture } from "@/actions/textureActions";
import { Texture, TextureMaps } from "@/types/texture";
import { create } from "zustand";

// ---- Constants ----

export const MAP_LABELS: Record<keyof TextureMaps, string> = {
  albedo: "Albedo / Diffuse",
  normalMap: "Normal Map",
  roughness: "Roughness",
  metalness: "Metalness",
  ao: "Ambient Occlusion",
};

const INITIAL_TEXTURES: Texture[] = [
  {
    id: 1,
    name: "Tecido Linho",
    is_favorite: true,
    maps: {
      albedo: true,
      normalMap: true,
      roughness: true,
      metalness: false,
      ao: true,
    },
  },
  {
    id: 2,
    name: "Couro Natural",
    is_favorite: true,
    maps: {
      albedo: true,
      normalMap: true,
      roughness: true,
      metalness: true,
      ao: true,
    },
  },
  {
    id: 3,
    name: "Veludo",
    is_favorite: false,
    maps: {
      albedo: true,
      normalMap: true,
      roughness: true,
      metalness: false,
      ao: false,
    },
  },
  {
    id: 4,
    name: "Madeira Carvalho",
    is_favorite: false,
    maps: {
      albedo: true,
      normalMap: true,
      roughness: true,
      metalness: false,
      ao: true,
    },
  },
  {
    id: 5,
    name: "Metal Escovado",
    is_favorite: false,
    maps: {
      albedo: true,
      normalMap: true,
      roughness: true,
      metalness: true,
      ao: false,
    },
  },
];

const DEFAULT_MAPS: TextureMaps = {
  albedo: false,
  normalMap: false,
  roughness: false,
  metalness: false,
  ao: false,
};

// ---- Store Interface ----

interface TexturesState {
  // Data
  textures: Texture[];

  // UI State
  search: string;
  dialogOpen: boolean;
  editingTexture: Texture | null;
  newTextureName: string;
  newMaps: TextureMaps;

  // Computed
  filteredTextures: () => Texture[];
  sortedTextures: () => Texture[];
  completeMaps: (maps: TextureMaps) => number;

  // Actions - Data
  addTexture: (name: string, maps: TextureMaps) => void;
  updateTexture: (id: number, name: string, maps: TextureMaps) => void;
  deleteTexture: (id: number) => void;
  toggleis_favorite: (id: number) => void;

  // Actions - UI
  setSearch: (search: string) => void;
  openCreateDialog: () => void;
  openEditDialog: (texture: Texture) => void;
  closeDialog: () => void;
  setNewTextureName: (name: string) => void;
  setNewMaps: (maps: TextureMaps) => void;
  uploadMap: (key: keyof TextureMaps) => void;
}

// ---- Store ----

export const useTexturesStore = create<TexturesState>((set, get) => ({
  // Data
  textures: INITIAL_TEXTURES,

  // UI State
  search: "",
  dialogOpen: false,
  editingTexture: null,
  newTextureName: "",
  newMaps: { ...DEFAULT_MAPS },

  // Computed
  filteredTextures: () => {
    const { textures, search } = get();
    return textures.filter((t) =>
      t.name.toLowerCase().includes(search.toLowerCase()),
    );
  },

  sortedTextures: () => {
    const filtered = get().filteredTextures();
    return [...filtered].sort((a, b) => {
      if (a.is_favorite && !b.is_favorite) return -1;
      if (!a.is_favorite && b.is_favorite) return 1;
      return 0;
    });
  },

  completeMaps: (maps) => Object.values(maps).filter(Boolean).length,

  // Actions - Data
  addTexture: async (name, maps) => {
    const response = await createTexture({ name, is_favorite: false });
    if (response.success && response.data) {
      set((s) => ({ textures: [...s.textures, {...response.data, maps: []}] }));
    }
  },

  updateTexture: (id, name, maps) => {
    set((s) => ({
      textures: s.textures.map((t) =>
        t.id === id ? { ...t, name: name.trim(), maps: { ...maps } } : t,
      ),
    }));
  },

  deleteTexture: (id) => {
    set((s) => ({ textures: s.textures.filter((t) => t.id !== id) }));
  },

  toggleis_favorite: (id) => {
    set((s) => ({
      textures: s.textures.map((t) =>
        t.id === id ? { ...t, is_favorite: !t.is_favorite } : t,
      ),
    }));
  },

  // Actions - UI
  setSearch: (search) => set({ search }),

  openCreateDialog: () =>
    set({
      dialogOpen: true,
      editingTexture: null,
      newTextureName: "",
      newMaps: { ...DEFAULT_MAPS },
    }),

  openEditDialog: (texture) =>
    set({
      dialogOpen: true,
      editingTexture: texture,
      newTextureName: texture.name,
      newMaps: { ...texture.maps },
    }),

  closeDialog: () =>
    set({
      dialogOpen: false,
      editingTexture: null,
      newTextureName: "",
      newMaps: { ...DEFAULT_MAPS },
    }),

  setNewTextureName: (name) => set({ newTextureName: name }),

  setNewMaps: (maps) => set({ newMaps: maps }),

  uploadMap: (key) => {
    set((s) => ({ newMaps: { ...s.newMaps, [key]: true } }));
  },
}));
