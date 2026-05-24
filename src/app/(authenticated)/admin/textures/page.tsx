"use client";

import PageHeader from "@/components/pageHeader";
import { Input } from "@/components/ui/input";
import {
  Check,
  ImageIcon,
  Pencil,
  Plus,
  Search,
  Star,
  Trash2,
  Upload,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  useTexturesStore,
  MAP_LABELS,
  type TextureMaps,
} from "@/lib/stores/textures-store";

function UploadZone({
  label,
  uploaded,
  onUpload,
}: {
  label: string;
  uploaded: boolean;
  onUpload: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onUpload}
      className="group flex flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border p-4 transition-colors hover:border-primary/50 hover:bg-primary/5"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10">
        {uploaded ? (
          <Check className="h-5 w-5 text-primary" />
        ) : (
          <Upload className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
        )}
      </div>
      <span className="text-xs font-medium text-foreground">{label}</span>
      <span className="text-[10px] text-muted-foreground">
        {uploaded ? "Clique para trocar" : ".png, .jpg, .exr"}
      </span>
    </button>
  );
}

export default function TexturesPage() {
  // Store state
  const textures = useTexturesStore((s) => s.textures);
  const search = useTexturesStore((s) => s.search);
  const dialogOpen = useTexturesStore((s) => s.dialogOpen);
  const editingTexture = useTexturesStore((s) => s.editingTexture);
  const newTextureName = useTexturesStore((s) => s.newTextureName);
  const newMaps = useTexturesStore((s) => s.newMaps);

  // Computed locally to avoid infinite loop
  const sortedTextures = textures
    .filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (a.is_favorite && !b.is_favorite) return -1;
      if (!a.is_favorite && b.is_favorite) return 1;
      return 0;
    });

  const completeMaps = (maps: Record<string, boolean>) =>
    Object.values(maps).filter(Boolean).length;

  // Store actions
  const setSearch = useTexturesStore((s) => s.setSearch);
  const openCreateDialog = useTexturesStore((s) => s.openCreateDialog);
  const openEditDialog = useTexturesStore((s) => s.openEditDialog);
  const closeDialog = useTexturesStore((s) => s.closeDialog);
  const setNewTextureName = useTexturesStore((s) => s.setNewTextureName);
  const uploadMap = useTexturesStore((s) => s.uploadMap);
  const addTexture = useTexturesStore((s) => s.addTexture);
  const updateTexture = useTexturesStore((s) => s.updateTexture);
  const deleteTexture = useTexturesStore((s) => s.deleteTexture);
  const toggleis_favorite = useTexturesStore((s) => s.toggleis_favorite);

  function handleSave() {
    if (!newTextureName.trim()) return;

    if (editingTexture) {
      updateTexture(editingTexture.id, newTextureName, newMaps);
    } else {
      addTexture(newTextureName, newMaps);
    }
    closeDialog();
  }

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Texturas"
        subtitle="Biblioteca de texturas PBR para seus modelos"
      ></PageHeader>

      <div className="border-b px-6 py-3">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar texturas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 pl-9 text-sm"
          />
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {sortedTextures.map((tex) => (
              <div
                key={tex.id}
                className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/30"
              >
                {/* Preview */}
                <div className="relative flex h-32 items-center justify-center bg-muted/50">
                  <ImageIcon className="h-8 w-8 text-muted-foreground/20" />

                  {/* is_favorite button */}
                  <button
                    type="button"
                    onClick={() => toggleis_favorite(tex.id)}
                    className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-md bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
                  >
                    <Star
                      className={`h-3.5 w-3.5 transition-colors ${
                        tex.is_favorite
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>

                  {/* Actions */}
                  <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => openEditDialog(tex)}
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-background/80 text-muted-foreground backdrop-blur-sm transition-colors hover:bg-background hover:text-primary"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteTexture(tex.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-background/80 text-muted-foreground backdrop-blur-sm transition-colors hover:bg-background hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1.5 p-3">
                  <p className="truncate text-sm font-medium text-foreground">
                    {tex.name}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <div className="flex h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className="rounded-full bg-primary transition-all"
                        style={{
                          width: `${(completeMaps(tex.maps) / 5) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {completeMaps(tex.maps)}/5 maps
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Add new card */}
            <button
              type="button"
              onClick={openCreateDialog}
              className="flex h-full min-h-[190px] flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border transition-colors hover:border-primary/50 hover:bg-primary/5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <Plus className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-xs font-medium text-muted-foreground">
                Adicionar textura
              </p>
            </button>
          </div>
        </div>
      </ScrollArea>

      {/* Upload Dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingTexture ? "Editar Textura" : "Nova Textura PBR"}
            </DialogTitle>
            <DialogDescription>
              {editingTexture
                ? "Atualize o nome e os maps desta textura."
                : "Envie os maps da textura para renderizacao realista."}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm">Nome da textura</Label>
              <Input
                value={newTextureName}
                onChange={(e) => setNewTextureName(e.target.value)}
                placeholder="Ex: Tecido Linho Natural"
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-sm">Maps de textura</Label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {(
                  Object.entries(MAP_LABELS) as [keyof TextureMaps, string][]
                ).map(([key, label]) => (
                  <UploadZone
                    key={key}
                    label={label}
                    uploaded={newMaps[key]}
                    onUpload={() => uploadMap(key)}
                  />
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={closeDialog}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={!newTextureName.trim()}>
              {editingTexture ? "Salvar" : "Criar Textura"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
