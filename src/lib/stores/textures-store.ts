import { create } from "zustand";

// ---- Types ----

export interface TextureMaps {
  albedo: boolean;
  normalMap: boolean;
  roughness: boolean;
  metalness: boolean;
  ao: boolean;
}

export interface TextureEntry {
  id: string;
  name: string;
  favorite: boolean;
  maps: TextureMaps;
}

// ---- Constants ----

export const MAP_LABELS: Record<keyof TextureMaps, string> = {
  albedo: "Albedo / Diffuse",
  normalMap: "Normal Map",
  roughness: "Roughness",
  metalness: "Metalness",
  ao: "Ambient Occlusion",
};

const INITIAL_TEXTURES: TextureEntry[] = [
  {
    id: "tex-1",
    name: "Tecido Linho",
    favorite: true,
    maps: {
      albedo: true,
      normalMap: true,
      roughness: true,
      metalness: false,
      ao: true,
    },
  },
  {
    id: "tex-2",
    name: "Couro Natural",
    favorite: true,
    maps: {
      albedo: true,
      normalMap: true,
      roughness: true,
      metalness: true,
      ao: true,
    },
  },
  {
    id: "tex-3",
    name: "Veludo",
    favorite: false,
    maps: {
      albedo: true,
      normalMap: true,
      roughness: true,
      metalness: false,
      ao: false,
    },
  },
  {
    id: "tex-4",
    name: "Madeira Carvalho",
    favorite: false,
    maps: {
      albedo: true,
      normalMap: true,
      roughness: true,
      metalness: false,
      ao: true,
    },
  },
  {
    id: "tex-5",
    name: "Metal Escovado",
    favorite: false,
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
  textures: TextureEntry[];

  // UI State
  search: string;
  dialogOpen: boolean;
  editingTexture: TextureEntry | null;
  newTextureName: string;
  newMaps: TextureMaps;

  // Computed
  filteredTextures: () => TextureEntry[];
  sortedTextures: () => TextureEntry[];
  completeMaps: (maps: TextureMaps) => number;

  // Actions - Data
  addTexture: (name: string, maps: TextureMaps) => void;
  updateTexture: (id: string, name: string, maps: TextureMaps) => void;
  deleteTexture: (id: string) => void;
  toggleFavorite: (id: string) => void;

  // Actions - UI
  setSearch: (search: string) => void;
  openCreateDialog: () => void;
  openEditDialog: (texture: TextureEntry) => void;
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
      if (a.favorite && !b.favorite) return -1;
      if (!a.favorite && b.favorite) return 1;
      return 0;
    });
  },

  completeMaps: (maps) => Object.values(maps).filter(Boolean).length,

  // Actions - Data
  addTexture: (name, maps) => {
    const newTex: TextureEntry = {
      id: crypto.randomUUID(),
      name: name.trim(),
      favorite: false,
      maps: { ...maps },
    };
    set((s) => ({ textures: [...s.textures, newTex] }));
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

  toggleFavorite: (id) => {
    set((s) => ({
      textures: s.textures.map((t) =>
        t.id === id ? { ...t, favorite: !t.favorite } : t,
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
