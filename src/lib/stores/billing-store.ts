import { create } from "zustand";

export interface Plan {
  id: string;
  name: string;
  price: number;
  interval: "mes" | "ano";
  features: string[];
  highlight?: boolean;
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "pago" | "pendente" | "falhou";
  pdfUrl?: string;
}

export interface PaymentCard {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

const INITIAL_CARDS: PaymentCard[] = [
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

export const PLANS: Plan[] = [
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

const INITIAL_INVOICES: Invoice[] = [
  { id: "inv-001", date: "2026-02-01", amount: 149, status: "pago" },
  { id: "inv-002", date: "2026-01-01", amount: 149, status: "pago" },
  { id: "inv-003", date: "2025-12-01", amount: 149, status: "pago" },
  { id: "inv-004", date: "2025-11-01", amount: 49, status: "pago" },
  { id: "inv-005", date: "2025-10-01", amount: 49, status: "pago" },
  { id: "inv-006", date: "2025-09-01", amount: 49, status: "falhou" },
];

interface BillingState {
  currentPlan: string;
  cards: PaymentCard[];
  invoices: Invoice[];

  changePlanOpen: boolean;
  selectedPlan: string | null;
  addCardOpen: boolean;

  activePlan: () => Plan;

  addCard: (card: Omit<PaymentCard, "id" | "isDefault">) => void;
  deleteCard: (id: string) => void;
  setDefault: (id: string) => void;

  openChangePlan: () => void;
  closeChangePlan: () => void;
  setSelectedPlan: (id: string) => void;
  openAddCard: () => void;
  closeAddCard: () => void;
  confirmPlanChange: () => void;
}

export const useBillingStore = create<BillingState>((set, get) => ({
  currentPlan: "pro",
  cards: INITIAL_CARDS,
  invoices: INITIAL_INVOICES,

  changePlanOpen: false,
  selectedPlan: null,
  addCardOpen: false,

  activePlan: () => {
    const { currentPlan } = get();
    return PLANS.find((p) => p.id === currentPlan) ?? PLANS[0];
  },

  addCard: (cardData) => {
    const { cards } = get();
    const card: PaymentCard = {
      ...cardData,
      id: crypto.randomUUID(),
      isDefault: cards.length === 0,
    };
    set((s) => ({
      cards: [...s.cards, card],
      addCardOpen: false,
    }));
  },

  deleteCard: (id) =>
    set((s) => {
      const remaining = s.cards.filter((c) => c.id !== id);
      if (remaining.length > 0 && !remaining.some((c) => c.isDefault)) {
        remaining[0].isDefault = true;
      }
      return { cards: remaining };
    }),

  setDefault: (id) =>
    set((s) => ({
      cards: s.cards.map((c) => ({ ...c, isDefault: c.id === id })),
    })),

  openChangePlan: () =>
    set((s) => ({
      changePlanOpen: true,
      selectedPlan: s.currentPlan,
    })),

  closeChangePlan: () => set({ changePlanOpen: false }),

  setSelectedPlan: (id) => set({ selectedPlan: id }),

  openAddCard: () => set({ addCardOpen: true }),

  closeAddCard: () => set({ addCardOpen: false }),

  confirmPlanChange: () =>
    set((s) => ({
      changePlanOpen: false,
      currentPlan: s.selectedPlan ?? s.currentPlan,
    })),
}));
