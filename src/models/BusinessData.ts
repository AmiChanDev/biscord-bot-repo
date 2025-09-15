import type { Business } from "../types/Business.js";

// ================= Business Unlock Costs =================
// Money required to unlock each business type
export const BusinessUnlocks: Record<string, number> = {
  Cafe: 0,
  Restaurant: 10000,
  Bakery: 25000,
  Bookstore: 50000,
  "Tech Shop": 100000,
};

// ================= Initial Business Data =================
// Template for creating a new business
export const BusinessTemplates: Record<string, Omit<Business, "id">> = {
  Cafe: {
    type: "Cafe",
    level: 1,
    employees: 1,
    equipment: 1,
    revenue: 100,
    balance: 0,
    lastCollect: null,
  },
  Restaurant: {
    type: "Restaurant",
    level: 1,
    employees: 1,
    equipment: 1,
    revenue: 500,
    balance: 0,
    lastCollect: null,
  },
  Bakery: {
    type: "Bakery",
    level: 1,
    employees: 1,
    equipment: 1,
    revenue: 1000,
    balance: 0,
    lastCollect: null,
  },
  Bookstore: {
    type: "Bookstore",
    level: 1,
    employees: 1,
    equipment: 1,
    revenue: 1500,
    balance: 0,
    lastCollect: null,
  },
  "Tech Shop": {
    type: "Tech Shop",
    level: 1,
    employees: 1,
    equipment: 1,
    revenue: 2000,
    balance: 0,
    lastCollect: null,
  },
};

// Unified export
export const BusinessData = {
  unlocks: BusinessUnlocks,
  templates: BusinessTemplates,
};
