"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const SSO_PROVIDERS = [
  {
    id: "google",
    label: "Google",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
    ),
  },
  {
    id: "apple",
    label: "Apple",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 fill-current"
        aria-hidden="true"
      >
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.38-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.12-.38C2.79 15.25 3.51 7.59 9.05 7.31c1.35.06 2.29.74 3.08.8.905-.08 1.845-.74 2.875-.64 1.515.13 2.65.82 3.365 2.06-3.12 1.89-2.38 5.98.48 7.13-.57 1.5-1.31 2.48-2.865 3.42l-.005-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
      </svg>
    ),
  },
  {
    id: "microsoft",
    label: "Microsoft",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <rect x="1" y="1" width="10" height="10" fill="#F25022" />
        <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
        <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
        <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
      </svg>
    ),
  },
] as const;

// interface SSOButtonsProps {
//   mode: "login" | "signup";
//   onSuccess: (user: {
//     id: string;
//     email: string;
//     companyName: string;
//     plan: string;
//   }) => void;
//   onError: (message: string) => void;
//   disabled?: boolean;
// }

export function SSOButtons() {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const isDisabled = loadingProvider !== null;

  return (
    <div className="flex flex-col gap-2.5">
      {SSO_PROVIDERS.map((provider) => (
        <Button
          key={provider.id}
          type="button"
          variant="outline"
          className="relative h-10 w-full gap-2.5 border-border/60 bg-transparent font-medium transition-colors hover:bg-accent/50"
          disabled={isDisabled}
        >
          {loadingProvider === provider.id ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            provider.icon
          )}
          Continuar com {provider.label}
        </Button>
      ))}
    </div>
  );
}

export function SSODivider() {
  return (
    <div className="relative flex items-center gap-3 py-1">
      <div className="h-px flex-1 bg-border/60" />
      <span className="text-[11px] uppercase tracking-wider text-muted-foreground/50">
        ou
      </span>
      <div className="h-px flex-1 bg-border/60" />
    </div>
  );
}
