"use client";

import PageHeader from "@/components/pageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PLANS, useBillingStore } from "@/lib/stores/billing-store";
import { cn } from "@/lib/utils";
import {
  Check,
  CreditCard,
  Download,
  ExternalLink,
  MoreHorizontal,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useFormik } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Yup from "@/lib/yup";

export const addCardSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Nome precisa ter ao menos 3 caracteres")
    .required("Nome no cartao e obrigatorio"),
  number: Yup.string()
    .transform((v) => v.replace(/\s/g, ""))
    .min(13, "Numero do cartao invalido")
    .max(16, "Numero do cartao invalido")
    .required("Numero e obrigatorio"),
  expiry: Yup.string()
    .matches(/^\d{2}\/\d{2}$/, "Formato MM/AA")
    .required("Validade e obrigatoria"),
  cvc: Yup.string()
    .min(3, "CVC invalido")
    .max(4, "CVC invalido")
    .required("CVC e obrigatorio"),
});
export type AddCardValues = Yup.InferType<typeof addCardSchema>;

function getCardIcon(brand: string) {
  const cls =
    "h-8 w-12 rounded border bg-muted/50 flex items-center justify-center text-[10px] font-bold text-foreground";
  return <div className={cls}>{brand.toUpperCase().slice(0, 4)}</div>;
}

function formatCardInput(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiryInput(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

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

export default function BillingPage() {
  const cards = useBillingStore((state) => state.cards);
  const invoices = useBillingStore((state) => state.invoices);
  const plan = useBillingStore((s) => s.activePlan)();
  const changePlanOpen = useBillingStore((s) => s.changePlanOpen);
  const selectedPlan = useBillingStore((s) => s.selectedPlan);
  const addCardOpen = useBillingStore((s) => s.addCardOpen);
  const currentPlan = useBillingStore((s) => s.currentPlan);

  const addCard = useBillingStore((s) => s.addCard);
  const deleteCard = useBillingStore((s) => s.deleteCard);
  const setDefault = useBillingStore((s) => s.setDefault);
  const openChangePlan = useBillingStore((s) => s.openChangePlan);
  const closeChangePlan = useBillingStore((s) => s.closeChangePlan);
  const setSelectedPlan = useBillingStore((s) => s.setSelectedPlan);
  const openAddCard = useBillingStore((s) => s.openAddCard);
  const closeAddCard = useBillingStore((s) => s.closeAddCard);
  const confirmPlanChange = useBillingStore((s) => s.confirmPlanChange);

  const formik = useFormik<AddCardValues>({
    initialValues: { name: "", number: "", expiry: "", cvc: "" },
    validationSchema: addCardSchema,
    onSubmit: (values, { resetForm }) => {
      const cleanNumber = values.number.replace(/\s/g, "");

      addCard({
        brand: cleanNumber.startsWith("5") ? "Mastercard" : "Visa",
        last4: cleanNumber.slice(-4),
        expMonth: Number.parseInt(values.expiry.split("/")[0]) || 1,
        expYear: 2000 + (Number.parseInt(values.expiry.split("/")[1]) || 26),
      });

      resetForm();
    },
  });

  function handleAddCardDialogChange(open: boolean) {
    if (!open) {
      closeAddCard();
      formik.resetForm();
    }
  }

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
                onClick={openChangePlan}
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
                onClick={openAddCard}
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
                          onClick={() => setDefault(card.id)}
                        >
                          <Check className="h-3.5 w-3.5" />
                          Definir como principal
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        className="gap-2 text-destructive focus:text-destructive"
                        onClick={() => deleteCard(card.id)}
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
                  <Button variant="outline" size="sm" onClick={openAddCard}>
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

      <Dialog
        open={changePlanOpen}
        onOpenChange={(v) => {
          if (!v) closeChangePlan();
        }}
      >
        <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-base">Alterar Plano</DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Escolha o plano que melhor se adapta ao seu negocio.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh] sm:max-h-none">
            <div className="grid grid-cols-1 gap-3 pr-1 pt-3 sm:grid-cols-3">
              {PLANS.map((p) => {
                const isCurrent = p.id === currentPlan;
                const isSelected = p.id === selectedPlan;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPlan(p.id)}
                    className={cn(
                      "relative flex flex-col rounded-xl border p-3 text-left transition-all sm:p-4",
                      isSelected
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border hover:border-muted-foreground/30",
                    )}
                  >
                    {p.highlight && (
                      <span className="absolute -top-2.5 right-3 rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                        Popular
                      </span>
                    )}
                    <div className="flex items-center justify-between sm:flex-col sm:items-start">
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">
                          {p.name}
                        </h3>
                        <p className="mt-0.5 text-base font-bold text-foreground sm:mt-1 sm:text-lg">
                          {formatCurrency(p.price)}
                          <span className="text-[10px] font-normal text-muted-foreground sm:text-xs">
                            /{p.interval}
                          </span>
                        </p>
                      </div>
                      {isCurrent && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] sm:mt-2"
                        >
                          Atual
                        </Badge>
                      )}
                    </div>
                    <ul className="mt-2 flex flex-col gap-1 sm:mt-3 sm:gap-1.5">
                      {p.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-1.5 text-[11px] text-muted-foreground sm:text-xs"
                        >
                          <Check className="h-3 w-3 shrink-0 text-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </ScrollArea>

          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button
              variant="ghost"
              onClick={closeChangePlan}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              disabled={selectedPlan === currentPlan}
              onClick={confirmPlanChange}
              className="w-full sm:w-auto"
            >
              {selectedPlan && PLANS.find((p) => p.id === selectedPlan)
                ? `Mudar para ${PLANS.find((p) => p.id === selectedPlan)!.name}`
                : "Confirmar"}
              <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={addCardOpen} onOpenChange={handleAddCardDialogChange}>
        <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base">Adicionar Cartao</DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Insira os dados do seu cartao de credito.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs sm:text-sm">Nome no cartao</Label>
                <Input
                  name="name"
                  placeholder="Nome completo"
                  className="text-sm"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-[11px] text-destructive">
                    {formik.errors.name}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs sm:text-sm">Numero do cartao</Label>
                <Input
                  name="number"
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  className="text-sm"
                  value={formik.values.number}
                  onBlur={formik.handleBlur}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "number",
                      formatCardInput(e.target.value),
                    )
                  }
                />
                {formik.touched.number && formik.errors.number && (
                  <p className="text-[11px] text-destructive">
                    {formik.errors.number}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs sm:text-sm">Validade</Label>
                  <Input
                    name="expiry"
                    placeholder="MM/AA"
                    maxLength={5}
                    className="text-sm"
                    value={formik.values.expiry}
                    onBlur={formik.handleBlur}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "expiry",
                        formatExpiryInput(e.target.value),
                      )
                    }
                  />
                  {formik.touched.expiry && formik.errors.expiry && (
                    <p className="text-[11px] text-destructive">
                      {formik.errors.expiry}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs sm:text-sm">CVC</Label>
                  <Input
                    name="cvc"
                    placeholder="000"
                    maxLength={4}
                    type="password"
                    className="text-sm"
                    value={formik.values.cvc}
                    onBlur={formik.handleBlur}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "cvc",
                        e.target.value.replace(/\D/g, "").slice(0, 4),
                      )
                    }
                  />
                  {formik.touched.cvc && formik.errors.cvc && (
                    <p className="text-[11px] text-destructive">
                      {formik.errors.cvc}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="mt-5 flex-col gap-2 sm:flex-row">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  closeAddCard();
                  formik.resetForm();
                }}
                className="w-full sm:w-auto"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={!formik.isValid || !formik.dirty}
                className="w-full sm:w-auto"
              >
                <CreditCard className="mr-1.5 h-4 w-4" />
                Adicionar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
