// src/components/auth/logout-button.tsx
"use client";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { serverLogout } from "@/actions/authServerActions";

interface LogoutButtonProps {
  variant?: "default" | "ghost" | "outline";
  showIcon?: boolean;
  showText?: boolean;
  className?: string;
}

export function LogoutButton({
  variant = "ghost",
  showIcon = true,
  showText = true,
  className,
}: LogoutButtonProps) {
  return (
    <form action={serverLogout}>
      <Button type="submit" variant={variant} className={className}>
        {showIcon && <LogOut className="h-4 w-4" />}
        {showText && <span className={showIcon ? "ml-2" : ""}>Sair</span>}
      </Button>
    </form>
  );
}
