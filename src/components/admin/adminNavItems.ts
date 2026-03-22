import {
  BarChart3,
  Box,
  Layers,
  Users,
  CreditCard,
  Code2,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: BarChart3 },
  { label: "Produtos", href: "/admin/products", icon: Box },
  { label: "Texturas", href: "/admin/textures", icon: Layers },
  { label: "Usuários", href: "/admin/users", icon: Users },
  { label: "Pagamentos", href: "/admin/billing", icon: CreditCard },
  { label: "Integração", href: "/admin/integration", icon: Code2 },
];

export const NAV_ITEMS_WITH_SETTINGS: NavItem[] = [
  ...NAV_ITEMS,
  { label: "Configurações", href: "/admin/settings", icon: Settings },
];
