"use client";
import PageHeader from "@/components/pageHeader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ROLE_LABELS, useUsersStore } from "@/lib/stores/users-store";
import {
  Crown,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  UserCog,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

export function getInitials(name: string, email: string) {
  if (name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  return email[0].toUpperCase();
}

export default function UsersPage() {
  const transferOpen = useUsersStore((s) => s.transferOpen);
  const filteredUsers = useUsersStore((s) => s.filteredUsers)();
  const transferCandidates = useUsersStore((s) => s.transferCandidates)();
  const setSearch = useUsersStore((s) => s.setSearch);
  const search = useUsersStore((s) => s.search);
  const openTransfer = useUsersStore((s) => s.openTransfer);
  const closeTransfer = useUsersStore((s) => s.closeTransfer);
  const transferOwnership = useUsersStore((s) => s.transferOwnership);
  const deleteUser = useUsersStore((s) => s.deleteUser);
  const openRoleUpdate = useUsersStore((s) => s.openRoleUpdate);
  const roleUpdateValue = useUsersStore((s) => s.roleUpdateValue);
  const roleUpdateUser = useUsersStore((s) => s.roleUpdateUser);

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Usuários"
        subtitle="Gerencie membros da equipe"
        actions={
          <Button size="sm" className="gap-1.5 self-start">
            <Plus className="h-4 w-4" />
            Convidar
          </Button>
        }
      />
      <div className="border-b px-4 py-3 sm:px-6">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar usuarios..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 pl-9 text-sm"
          />
        </div>
      </div>

      {/* Users List */}
      <ScrollArea className="flex-1">
        <div className="p-4 sm:p-6">
          <div className="overflow-hidden rounded-xl border">
            {filteredUsers.map((user, i) => (
              <div
                key={user.id}
                className={`flex items-center gap-3 px-3 py-3 sm:px-4 ${
                  i !== filteredUsers.length - 1 ? "border-b" : ""
                } transition-colors hover:bg-accent/30`}
              >
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="h-8 w-8 shrink-0 sm:h-9 sm:w-9">
                    <AvatarFallback className="bg-primary/10 text-[10px] font-medium text-primary sm:text-xs">
                      {getInitials(user.name, user.email)}
                    </AvatarFallback>
                  </Avatar>
                  {user.isOwner && (
                    <Crown className="absolute bottom-0 right-0 h-3 w-3 text-amber-500 drop-shadow-sm sm:h-3.5 sm:w-3.5" />
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <p className="truncate text-xs font-medium text-foreground sm:text-sm">
                      {user.name || user.email}
                    </p>
                    {user.isOwner && (
                      <Badge
                        variant="secondary"
                        className="shrink-0 text-[9px] sm:text-[10px]"
                      >
                        Proprietário
                      </Badge>
                    )}
                    {user.status === "pending" && (
                      <Badge
                        variant="secondary"
                        className="shrink-0 text-[9px] sm:text-[10px]"
                      >
                        Pendente
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {user.name && (
                      <p className="truncate text-[10px] text-muted-foreground sm:text-xs">
                        {user.email}
                      </p>
                    )}
                    <Badge
                      variant={user.role === "admin" ? "default" : "outline"}
                      className="shrink-0 text-[9px] sm:hidden"
                    >
                      {ROLE_LABELS[user.role]}
                    </Badge>
                  </div>
                </div>

                {/* Role badge - desktop only */}
                <Badge
                  variant={user.role === "admin" ? "default" : "outline"}
                  className="hidden shrink-0 text-[10px] sm:inline-flex"
                >
                  {ROLE_LABELS[user.role]}
                </Badge>

                {/* Actions */}
                {!user.isOwner && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 shrink-0 text-muted-foreground sm:h-8 sm:w-8"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <>
                        <DropdownMenuItem
                          className="gap-2"
                          onClick={() => openRoleUpdate(user)}
                        >
                          <UserCog className="h-3.5 w-3.5" />
                          Atualizar Funcao
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="gap-2"
                          onClick={() => transferOwnership(user.id)}
                        >
                          <Crown className="h-3.5 w-3.5" />
                          Transferir Propriedade
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="gap-2 text-destructive focus:text-destructive"
                          onClick={() => deleteUser(user.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Remover
                        </DropdownMenuItem>
                      </>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Transfer Ownership Dialog */}
    </div>
  );
}
