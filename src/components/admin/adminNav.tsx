"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NAV_ITEMS } from "./adminNavItems";

export function AdminNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") {
      return pathname === "/admin" || pathname.startsWith("/admin/dashboard");
    }
    if (href === "/admin/products") {
      return (
        pathname.startsWith("/admin/products") ||
        pathname.startsWith("/admin/editor")
      );
    }
    if (href === "/admin/integration") {
      return pathname.startsWith("/admin/integration");
    }
    return pathname.startsWith(href);
  }

  return (
    <TooltipProvider delayDuration={0}>
      <nav className="hidden sm:flex h-full w-16 flex-col items-center border-r bg-card py-4">
        {/* Main nav */}
        <div className="flex flex-1 flex-col items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-xs">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* Bottom nav */}
        <div className="flex flex-col items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/settings"
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                  pathname.startsWith("/admin/settings")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Configuracoes</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">
              Configuracoes
            </TooltipContent>
          </Tooltip>
        </div>
      </nav>
    </TooltipProvider>
  );
}
