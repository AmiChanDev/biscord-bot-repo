import type { Equipment } from "../types/Equipment.js";

// ================= Cafe =================
export const CafeEquipment: Equipment[] = [
  { id: 1, name: "Espresso Machine", cost: 1000, boost: 60 },
  { id: 2, name: "Coffee Grinder", cost: 500, boost: 28 },
  { id: 3, name: "Cash Register", cost: 300, boost: 15 },
  { id: 4, name: "Seating Area", cost: 700, boost: 40 },
  { id: 5, name: "Refrigerator", cost: 800, boost: 45 },
  { id: 6, name: "Oven", cost: 600, boost: 32 },
  { id: 7, name: "Blender", cost: 400, boost: 20 },
  { id: 8, name: "Display Counter", cost: 500, boost: 25 },
  { id: 9, name: "Coffee Beans Stock", cost: 200, boost: 8 },
  { id: 10, name: "Assistant Station", cost: 900, boost: 55 },
];

// ================= Restaurant =================
export const RestaurantEquipment: Equipment[] = [
  { id: 1, name: "Industrial Oven", cost: 2000, boost: 110 },
  { id: 2, name: "Grill", cost: 1500, boost: 85 },
  { id: 3, name: "Refrigerator", cost: 1000, boost: 55 },
  { id: 4, name: "Cash Register", cost: 500, boost: 22 },
  { id: 5, name: "Seating Area", cost: 1200, boost: 65 },
  { id: 6, name: "Dishwasher", cost: 800, boost: 40 },
  { id: 7, name: "Bar Station", cost: 1000, boost: 55 },
  { id: 8, name: "Prep Table", cost: 600, boost: 28 },
  { id: 9, name: "Stock Room", cost: 700, boost: 35 },
  { id: 10, name: "Assistant Station", cost: 1500, boost: 95 },
];

// ================= Bakery =================
export const BakeryEquipment: Equipment[] = [
  { id: 1, name: "Oven", cost: 1200, boost: 65 },
  { id: 2, name: "Mixer", cost: 600, boost: 30 },
  { id: 3, name: "Cash Register", cost: 300, boost: 12 },
  { id: 4, name: "Refrigerator", cost: 800, boost: 42 },
  { id: 5, name: "Display Case", cost: 700, boost: 35 },
  { id: 6, name: "Packaging Station", cost: 500, boost: 25 },
  { id: 7, name: "Dough Proofer", cost: 900, boost: 48 },
  { id: 8, name: "Seating Area", cost: 600, boost: 28 },
  { id: 9, name: "Delivery Bikes", cost: 400, boost: 18 },
  { id: 10, name: "Assistant Station", cost: 1000, boost: 60 },
];

// ================= Bookstore =================
export const BookstoreEquipment: Equipment[] = [
  { id: 1, name: "Shelving Units", cost: 800, boost: 40 },
  { id: 2, name: "Cash Register", cost: 300, boost: 12 },
  { id: 3, name: "Reading Area", cost: 600, boost: 30 },
  { id: 4, name: "Security System", cost: 1000, boost: 55 },
  { id: 5, name: "Stock Room", cost: 700, boost: 32 },
  { id: 6, name: "Lighting", cost: 400, boost: 18 },
  { id: 7, name: "Display Tables", cost: 500, boost: 22 },
  { id: 8, name: "Checkout Counters", cost: 600, boost: 28 },
  { id: 9, name: "Signage", cost: 300, boost: 10 },
  { id: 10, name: "Assistant Station", cost: 900, boost: 55 },
];

// ================= Tech Shop =================
export const TechShopEquipment: Equipment[] = [
  { id: 1, name: "Workbenches", cost: 1500, boost: 75 },
  { id: 2, name: "Cash Register", cost: 500, boost: 20 },
  { id: 3, name: "Computer Units", cost: 2000, boost: 120 },
  { id: 4, name: "Tool Kits", cost: 800, boost: 35 },
  { id: 5, name: "Seating Area", cost: 600, boost: 25 },
  { id: 6, name: "Display Racks", cost: 900, boost: 42 },
  { id: 7, name: "Security System", cost: 1200, boost: 65 },
  { id: 8, name: "Lighting", cost: 400, boost: 15 },
  { id: 9, name: "Stock Room", cost: 1000, boost: 50 },
  { id: 10, name: "Assistant Station", cost: 1500, boost: 90 },
];

// unified export
export const EquipmentData: Record<string, Equipment[]> = {
  Cafe: CafeEquipment,
  Restaurant: RestaurantEquipment,
  Bakery: BakeryEquipment,
  Bookstore: BookstoreEquipment,
  "Tech Shop": TechShopEquipment,
};
