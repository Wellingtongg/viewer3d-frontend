import { User } from "@/types/user";
import { create } from "zustand";

interface UsersState {
  users: User[];
  search: string;
  transferOpen: boolean;
  filteredUsers: () => User[];
  setSearch: (search: string) => void;
  owner: () => User | undefined;
  transferCandidates: () => User[];
  openTransfer: () => void;
  closeTransfer: () => void;
  transferOwnership: (newOwnerId: string) => void;
  deleteUser: (id: string) => void;
  setUsers: (users: User[]) => void;
}

export const useUsersStore = create<UsersState>((set, get) => ({
  users: [],
  search: "",
  transferOpen: false,
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
      users: s.users.map((u) => ({ ...u, is_owner: u.id === newOwnerId })),
      transferOpen: false,
    })),
  setSearch: (search) => set({ search }),
  owner: () => get().users.find((u) => u.is_owner),
  transferCandidates: () =>
    get().users.filter((u) => !u.is_owner && u.status === "active"),

  openTransfer: () => set({ transferOpen: true }),
  closeTransfer: () => set({ transferOpen: false }),

  deleteUser: (id) => {
    const { users } = get();
    const user = users.find((u) => u.id === id);
    if (!user || user.is_owner) return;
    set({ users: users.filter((u) => u.id !== id) });
  },
  setUsers: (users) => set({ users }),
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
