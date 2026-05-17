import { create } from "zustand";

export type UserRole = "admin" | "user";
export type UserStatus = "active" | "pending";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  isOwner: boolean;
}
export const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Administrador",
  user: "Usuario",
};

const INITIAL_USERS: User[] = [
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
interface UsersState {
  users: User[];
  search: string;
  transferOpen: boolean;
  roleUpdateUser: User | null;
  roleUpdateValue: UserRole;
  filteredUsers: () => User[];
  setSearch: (search: string) => void;
  owner: () => User | undefined;
  transferCandidates: () => User[];
  openTransfer: () => void;
  closeTransfer: () => void;
  transferOwnership: (newOwnerId: string) => void;
  deleteUser: (id: string) => void;
  openRoleUpdate: (user: User) => void;
  updateRole: (userId: string, role: UserRole) => void;
}

export const useUsersStore = create<UsersState>((set, get) => ({
  users: INITIAL_USERS,
  search: "",
  transferOpen: false,
  roleUpdateUser: null,
  roleUpdateValue: "user",
  filteredUsers: () => {
    const { users, search } = get();
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
    );
  },
  transferOwnership: (newOwnerId) =>
    set((s) => ({
      users: s.users.map((u) => ({ ...u, isOwner: u.id === newOwnerId })),
      transferOpen: false,
    })),
  setSearch: (search) => set({ search }),
  owner: () => get().users.find((u) => u.isOwner),
  transferCandidates: () =>
    get().users.filter((u) => !u.isOwner && u.status === "active"),

  openTransfer: () => set({ transferOpen: true }),
  closeTransfer: () => set({ transferOpen: false }),
  openRoleUpdate: (user) =>
    set({ roleUpdateUser: user, roleUpdateValue: user.role }),

  deleteUser: (id) => {
    const { users } = get();
    const user = users.find((u) => u.id === id);
    if (!user || user.isOwner) return;
    set({ users: users.filter((u) => u.id !== id) });
  },
  confirmRoleUpdate: () => {
    const { roleUpdateUser, roleUpdateValue } = get();
    if (roleUpdateUser) {
      get().updateRole(roleUpdateUser.id, roleUpdateValue);
    }
    set({ roleUpdateUser: null });
  },
  updateRole: (userId, role) =>
    set((s) => ({
      users: s.users.map((u) => (u.id === userId ? { ...u, role } : u)),
    })),
}));

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
