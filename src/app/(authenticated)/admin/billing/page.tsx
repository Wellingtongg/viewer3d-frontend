import PageHeader from "@/components/pageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Check,
  CreditCard,
  Download,
  MoreHorizontal,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";

function getCardIcon(brand: string) {
  const cls =
    "h-8 w-12 rounded border bg-muted/50 flex items-center justify-center text-[10px] font-bold text-foreground";
  return <div className={cls}>{brand.toUpperCase().slice(0, 4)}</div>;
}

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 49,
    interval: "mes",
    features: ["3 produtos", "10 texturas", "2 usuarios", "Suporte por email"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 149,
    interval: "mes",
    highlight: true,
    features: [
      "20 produtos",
      "100 texturas",
      "10 usuarios",
      "Suporte prioritario",
      "Dominio customizado",
      "Analytics",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 399,
    interval: "mes",
    features: [
      "Produtos ilimitados",
      "Texturas ilimitadas",
      "Usuarios ilimitados",
      "Suporte 24/7",
      "Dominio customizado",
      "Analytics avancados",
      "API dedicada",
      "SLA 99.9%",
    ],
  },
];
const plan = plans[1];

const cards = [
  {
    id: "c-1",
    brand: "Visa",
    last4: "4242",
    expMonth: 8,
    expYear: 2028,
    isDefault: true,
  },
  {
    id: "c-2",
    brand: "Mastercard",
    last4: "1234",
    expMonth: 3,
    expYear: 2027,
    isDefault: false,
  },
];

const invoices = [
  { id: "inv-001", date: "2026-02-01", amount: 149, status: "pago" },
  { id: "inv-002", date: "2026-01-01", amount: 149, status: "pago" },
  { id: "inv-003", date: "2025-12-01", amount: 149, status: "pago" },
  { id: "inv-004", date: "2025-11-01", amount: 49, status: "pago" },
  { id: "inv-005", date: "2025-10-01", amount: 49, status: "pago" },
  { id: "inv-006", date: "2025-09-01", amount: 49, status: "falhou" },
];

export function formatCurrency(value: number) {
  return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
}

export function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function BillingPage() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Pagamentos"
        subtitle="Gerencie seu plano, pagamentos e faturas"
      />

      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-6 p-4 sm:gap-8 sm:p-6">
          <section>
            <h2 className="mb-3 text-sm font-medium text-foreground">
              Plano Atual
            </h2>
            <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 sm:h-11 sm:w-11">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground sm:text-base">
                      {plan.name}
                    </h3>
                    <Badge variant="default" className="text-[10px]">
                      Ativo
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground sm:text-sm">
                    {formatCurrency(plan.price)}/{plan.interval}
                    <span className="mx-1 text-border sm:mx-1.5">|</span>
                    Proximo: 01 Mar 2026
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="self-start bg-transparent sm:self-auto"
                // onClick={openChangePlan}
              >
                Alterar plano
              </Button>
            </div>
          </section>
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium text-foreground">
                Metodos de Pagamento
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-xs"
                // onClick={openAddCard}
              >
                <Plus className="h-3.5 w-3.5" />
                Adicionar cartao
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border bg-card p-3 transition-colors sm:gap-4 sm:p-4",
                    card.isDefault && "border-primary/30",
                  )}
                >
                  <div className="hidden sm:block">
                    {getCardIcon(card.brand)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-xs font-medium text-foreground sm:text-sm">
                        {card.brand} *{card.last4}
                      </p>
                      {card.isDefault && (
                        <Badge
                          variant="secondary"
                          className="text-[9px] sm:text-[10px]"
                        >
                          Principal
                        </Badge>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground sm:text-xs">
                      Expira {String(card.expMonth).padStart(2, "0")}/
                      {card.expYear}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      {!card.isDefault && (
                        <DropdownMenuItem
                          className="gap-2"
                          // onClick={() => setDefault(card.id)}
                        >
                          <Check className="h-3.5 w-3.5" />
                          Definir como principal
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        className="gap-2 text-destructive focus:text-destructive"
                        // onClick={() => deleteCard(card.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Remover
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}

              {cards.length === 0 && (
                <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed py-8 text-center">
                  <CreditCard className="h-8 w-8 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">
                    Nenhum cartao adicionado
                  </p>
                  <Button variant="outline" size="sm">
                    Adicionar cartao
                  </Button>
                </div>
              )}
            </div>
          </section>
          <section>
            <h2 className="mb-3 text-sm font-medium text-foreground">
              Faturas
            </h2>
            <div className="overflow-hidden rounded-xl border">
              <div className="hidden items-center gap-4 border-b bg-muted/30 px-4 py-2.5 sm:grid sm:grid-cols-[1fr_auto_auto_auto]">
                <span className="text-xs font-medium text-muted-foreground">
                  Data
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  Valor
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  Status
                </span>
                <span className="w-8" />
              </div>
              {invoices.map((inv, i) => (
                <div
                  key={inv.id}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 transition-colors hover:bg-accent/30 sm:grid sm:grid-cols-[1fr_auto_auto_auto] sm:gap-4 sm:px-4",
                    i !== invoices.length - 1 && "border-b",
                  )}
                >
                  <div className="min-w-0 flex-1 sm:flex-none">
                    <p
                      className="text-xs text-foreground sm:text-sm"
                      suppressHydrationWarning
                    >
                      {formatDate(inv.date)}
                    </p>
                    <p className="text-[10px] text-muted-foreground sm:text-xs">
                      {inv.id.toUpperCase()}
                    </p>
                  </div>
                  <p className="text-xs font-medium text-foreground sm:text-sm">
                    {formatCurrency(inv.amount)}
                  </p>
                  <Badge
                    variant={
                      inv.status === "pago"
                        ? "default"
                        : inv.status === "pendente"
                          ? "secondary"
                          : "destructive"
                    }
                    className="text-[9px] sm:text-[10px]"
                  >
                    {inv.status === "pago"
                      ? "Pago"
                      : inv.status === "pendente"
                        ? "Pendente"
                        : "Falhou"}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground sm:h-8 sm:w-8"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span className="sr-only">Baixar fatura</span>
                  </Button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
}
