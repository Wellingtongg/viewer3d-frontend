"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, LogOut, Menu, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { serverLogout } from "@/actions/authServerActions";
import { User as UserType } from "@/types/auth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { NAV_ITEMS_WITH_SETTINGS as NAV_ITEMS } from "./adminNavItems";
import { CompanySelector } from "./companySelector";

interface AdminHeaderProps {
  user: UserType | null;
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const currentCompany = user?.company;
  const companies = user?.companies ?? [];

  function isActive(href: string) {
    if (href === "/admin")
      return pathname === "/admin" || pathname.startsWith("/admin/dashboard");
    if (href === "/admin/products")
      return (
        pathname.startsWith("/admin/products") ||
        pathname.startsWith("/admin/editor")
      );
    return pathname.startsWith(href);
  }

  const userInitials = user?.first_name.substring(0, 2).toUpperCase() || "U";

  return (
    <>
      <header className="h-14 border-b bg-card flex items-center px-3 sm:px-4 gap-2 shrink-0">
        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0 sm:hidden"
          onClick={() => setMobileNavOpen(true)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>

        {/* Logo */}
        <Link
          href="/admin"
          className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg bg-primary shrink-0"
        >
          <span className="text-xs font-bold text-primary-foreground">3D</span>
        </Link>

        {/* Company Selector */}
        <CompanySelector currentCompany={currentCompany} companies={companies} />

        {/* Spacer */}
        <div className="flex-1" />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-accent shrink-0 cursor-pointer outline-none">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                {userInitials}
              </div>
              <span className="hidden text-foreground max-w-30 truncate md:inline text-sm">
                {user?.first_name}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link
                href="/admin/profile"
                className="flex items-center gap-2 cursor-pointer text-sm"
              >
                <User className="h-4 w-4" />
                <span>Perfil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0">
              <form action={serverLogout} className="w-full">
                <button
                  type="submit"
                  className="flex w-full items-center gap-2 px-2 py-1.5 text-sm text-destructive cursor-pointer"
                >
                  <LogOut className="h-4 w-4 text-destructive" />
                  <span>Sair</span>
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Mobile Navigation Sheet */}
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="w-64 p-0 sm:hidden">
          <SheetHeader className="border-b px-4 py-4">
            <SheetTitle className="flex items-center gap-2 text-left text-base">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-xs font-bold text-primary-foreground">
                  3D
                </span>
              </div>
              Menu
            </SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col gap-1 px-3 py-3">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {item.label}
                  </Link>
                </SheetClose>
              );
            })}
          </nav>

          <div className="mt-auto border-t px-3 py-3">
            <form action={serverLogout}>
              <button
                type="submit"
                onClick={() => setMobileNavOpen(false)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
              >
                <LogOut className="h-5 w-5 shrink-0" />
                Sair
              </button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
