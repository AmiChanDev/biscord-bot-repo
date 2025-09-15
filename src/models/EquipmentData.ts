import type { Equipment } from "../types/Equipment.js";

// ================= Cafe =================
export const CafeEquipment: Equipment[] = [
  { id: 1, name: "Espresso Machine", basePrice: 1000, boost: 100 },
  { id: 2, name: "Coffee Grinder", basePrice: 500, boost: 50 },
  { id: 3, name: "Cash Register", basePrice: 300, boost: 30 },
  { id: 4, name: "Seating Area", basePrice: 700, boost: 70 },
  { id: 5, name: "Refrigerator", basePrice: 800, boost: 80 },
  { id: 6, name: "Oven", basePrice: 600, boost: 60 },
  { id: 7, name: "Blender", basePrice: 400, boost: 40 },
  { id: 8, name: "Display Counter", basePrice: 500, boost: 50 },
  { id: 9, name: "Coffee Beans Stock", basePrice: 200, boost: 20 },
  { id: 10, name: "Assistant Station", basePrice: 900, boost: 90 },
];

// ================= Restaurant =================
export const RestaurantEquipment: Equipment[] = [
  { id: 1, name: "Industrial Oven", basePrice: 2000, boost: 200 },
  { id: 2, name: "Grill", basePrice: 1500, boost: 150 },
  { id: 3, name: "Refrigerator", basePrice: 1000, boost: 100 },
  { id: 4, name: "Cash Register", basePrice: 500, boost: 50 },
  { id: 5, name: "Seating Area", basePrice: 1200, boost: 120 },
  { id: 6, name: "Dishwasher", basePrice: 800, boost: 80 },
  { id: 7, name: "Bar Station", basePrice: 1000, boost: 100 },
  { id: 8, name: "Prep Table", basePrice: 600, boost: 60 },
  { id: 9, name: "Stock Room", basePrice: 700, boost: 70 },
  { id: 10, name: "Assistant Station", basePrice: 1500, boost: 150 },
];

// ================= Bakery =================
export const BakeryEquipment: Equipment[] = [
  { id: 1, name: "Oven", basePrice: 1200, boost: 120 },
  { id: 2, name: "Mixer", basePrice: 600, boost: 60 },
  { id: 3, name: "Cash Register", basePrice: 300, boost: 30 },
  { id: 4, name: "Refrigerator", basePrice: 800, boost: 80 },
  { id: 5, name: "Display Case", basePrice: 700, boost: 70 },
  { id: 6, name: "Packaging Station", basePrice: 500, boost: 50 },
  { id: 7, name: "Dough Proofer", basePrice: 900, boost: 90 },
  { id: 8, name: "Seating Area", basePrice: 600, boost: 60 },
  { id: 9, name: "Delivery Bikes", basePrice: 400, boost: 40 },
  { id: 10, name: "Assistant Station", basePrice: 1000, boost: 100 },
];

// ================= Bookstore =================
export const BookstoreEquipment: Equipment[] = [
  { id: 1, name: "Shelving Units", basePrice: 800, boost: 80 },
  { id: 2, name: "Cash Register", basePrice: 300, boost: 30 },
  { id: 3, name: "Reading Area", basePrice: 600, boost: 60 },
  { id: 4, name: "Security System", basePrice: 1000, boost: 100 },
  { id: 5, name: "Stock Room", basePrice: 700, boost: 70 },
  { id: 6, name: "Lighting", basePrice: 400, boost: 40 },
  { id: 7, name: "Display Tables", basePrice: 500, boost: 50 },
  { id: 8, name: "Checkout Counters", basePrice: 600, boost: 60 },
  { id: 9, name: "Signage", basePrice: 300, boost: 30 },
  { id: 10, name: "Assistant Station", basePrice: 900, boost: 90 },
];

// ================= Tech Shop =================
export const TechShopEquipment: Equipment[] = [
  { id: 1, name: "Workbenches", basePrice: 1500, boost: 150 },
  { id: 2, name: "Cash Register", basePrice: 500, boost: 50 },
  { id: 3, name: "Computer Units", basePrice: 2000, boost: 200 },
  { id: 4, name: "Tool Kits", basePrice: 800, boost: 80 },
  { id: 5, name: "Seating Area", basePrice: 600, boost: 60 },
  { id: 6, name: "Display Racks", basePrice: 900, boost: 90 },
  { id: 7, name: "Security System", basePrice: 1200, boost: 120 },
  { id: 8, name: "Lighting", basePrice: 400, boost: 40 },
  { id: 9, name: "Stock Room", basePrice: 1000, boost: 100 },
  { id: 10, name: "Assistant Station", basePrice: 1500, boost: 150 },
];

// unified export
export const EquipmentData: Record<string, Equipment[]> = {
  Cafe: CafeEquipment,
  Restaurant: RestaurantEquipment,
  Bakery: BakeryEquipment,
  Bookstore: BookstoreEquipment,
  "Tech Shop": TechShopEquipment,
};
