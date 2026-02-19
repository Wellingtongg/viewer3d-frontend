"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { updateMyCurrentCompany } from "@/actions/userServerActions";
import { CompanySmall } from "@/types/auth";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CompanySelectorProps {
  currentCompany: CompanySmall | undefined;
  companies: CompanySmall[];
}

export function CompanySelector({
  currentCompany,
  companies,
}: CompanySelectorProps) {
  const router = useRouter();
  const [companySearch, setCompanySearch] = useState("");

  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(companySearch.toLowerCase()),
  );

  async function handleSelectCompany(company: CompanySmall) {
    if (company.id === currentCompany?.id) return;
    const response = await updateMyCurrentCompany({ company_id: company.id });
    if (response.success) {
      setCompanySearch("");
      router.refresh();
    }
  }

  if (companies.length > 1) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-1.5 rounded px-1.5 py-1.5 text-left text-sm transition-colors hover:bg-accent group shrink-0 min-w-0 cursor-pointer outline-none">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/20 text-[10px] font-bold text-primary shrink-0">
              {currentCompany?.name.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium text-foreground truncate max-w-20 sm:max-w-37.5">
              {currentCompany?.name}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0 transition-transform group-data-[state=open]:rotate-180" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <div className="p-2">
            <Input
              placeholder="Buscar empresa..."
              value={companySearch}
              onChange={(e) => setCompanySearch(e.target.value)}
              className="h-8 text-sm"
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredCompanies.map((company) => (
              <DropdownMenuItem
                key={company.id}
                onClick={() => handleSelectCompany(company)}
                className={cn(
                  "cursor-pointer",
                  currentCompany?.id === company.id ? "bg-accent" : "",
                )}
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/20 text-[10px] font-bold text-primary shrink-0">
                    {company.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="truncate">{company.name}</span>
                </div>
              </DropdownMenuItem>
            ))}
            {filteredCompanies.length === 0 && (
              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                Nenhuma empresa encontrada
              </div>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center gap-1.5 px-1.5 py-1.5 shrink-0 min-w-0">
      <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/20 text-[10px] font-bold text-primary shrink-0">
        {currentCompany?.name.charAt(0).toUpperCase()}
      </div>
      <span className="font-medium text-foreground truncate max-w-20 sm:max-w-37.5 text-sm">
        {currentCompany?.name}
      </span>
    </div>
  );
}
