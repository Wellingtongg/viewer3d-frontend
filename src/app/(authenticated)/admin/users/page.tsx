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
import {
  Crown,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  UserCog,
} from "lucide-react";

import { useState } from "react";

export const ROLE_LABELS = {
  admin: "Administrador",
  user: "Usuario",
};

const users = [
  {
    id: "u-1",
    name: "Ana Silva",
    email: "ana@empresa.com",
    role: "admin",
    status: "active",
    isOwner: true,
  },
  {
    id: "u-2",
    name: "Carlos Mendes",
    email: "carlos@empresa.com",
    role: "admin",
    status: "active",
    isOwner: false,
  },
  {
    id: "u-3",
    name: "Julia Costa",
    email: "julia@empresa.com",
    role: "user",
    status: "active",
    isOwner: false,
  },
  {
    id: "u-4",
    name: "",
    email: "pedro@empresa.com",
    role: "user",
    status: "pending",
    isOwner: false,
  },
];
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
  const [search, setSearch] = useState("");
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
      <ScrollArea className="flex-1">
        <div className="p-4 sm:p-6">
          <div className="overflow-hidden rounded-xl border">
            {users.map((user, i) => (
              <div
                key={user.id}
                className={`flex items-center gap-3 px-3 py-3 sm:px-4 ${
                  i !== users.length - 1 ? "border-b" : ""
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
                        Proprietario
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
                    {!user.isOwner && (
                      <DropdownMenuItem
                        className="gap-2"
                        // onClick={() => {
                        //   setRoleUpdateUser(user);
                        //   setRoleUpdateValue(user.role);
                        // }}
                      >
                        <UserCog className="h-3.5 w-3.5" />
                        Atualizar Funcao
                      </DropdownMenuItem>
                    )}
                    {user.isOwner && (
                      <DropdownMenuItem
                        className="gap-2"
                        //onClick={() => setTransferOpen(user.id)}
                      >
                        <Crown className="h-3.5 w-3.5" />
                        Transferir Propriedade
                      </DropdownMenuItem>
                    )}
                    {!user.isOwner && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="gap-2 text-destructive focus:text-destructive"
                          // onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Remover
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
