import type { Employee } from "../types/Employee.js";

// ================= Cafe =================
export const CafeEmployees: Employee[] = [
  { id: 1, role: "Barista", salary: 200, boost: 15 },
  { id: 2, role: "Cashier", salary: 250, boost: 20 },
  { id: 3, role: "Manager", salary: 800, boost: 120 },
  { id: 4, role: "Cleaner", salary: 150, boost: 8 },
  { id: 5, role: "Chef", salary: 400, boost: 45 },
  { id: 6, role: "Waiter", salary: 200, boost: 18 },
  { id: 7, role: "Dishwasher", salary: 150, boost: 6 },
  { id: 8, role: "Receptionist", salary: 250, boost: 22 },
  { id: 9, role: "Stock Clerk", salary: 180, boost: 12 },
  { id: 10, role: "Assistant Manager", salary: 600, boost: 70 },
];

// ================= Restaurant =================
export const RestaurantEmployees: Employee[] = [
  { id: 1, role: "Chef", salary: 600, boost: 65 },
  { id: 2, role: "Sous Chef", salary: 500, boost: 55 },
  { id: 3, role: "Waiter", salary: 300, boost: 25 },
  { id: 4, role: "Host", salary: 350, boost: 30 },
  { id: 5, role: "Manager", salary: 1200, boost: 200 },
  { id: 6, role: "Cleaner", salary: 200, boost: 10 },
  { id: 7, role: "Bartender", salary: 400, boost: 45 },
  { id: 8, role: "Dishwasher", salary: 180, boost: 8 },
  { id: 9, role: "Expediter", salary: 450, boost: 50 },
  { id: 10, role: "Assistant Manager", salary: 800, boost: 100 },
];

// ================= Bakery =================
export const BakeryEmployees: Employee[] = [
  { id: 1, role: "Baker", salary: 400, boost: 45 },
  { id: 2, role: "Cashier", salary: 250, boost: 20 },
  { id: 3, role: "Delivery", salary: 300, boost: 28 },
  { id: 4, role: "Cleaner", salary: 150, boost: 7 },
  { id: 5, role: "Manager", salary: 1000, boost: 160 },
  { id: 6, role: "Assistant Baker", salary: 350, boost: 32 },
  { id: 7, role: "Stock Clerk", salary: 200, boost: 15 },
  { id: 8, role: "Cashier Assistant", salary: 180, boost: 12 },
  { id: 9, role: "Delivery Assistant", salary: 250, boost: 18 },
  { id: 10, role: "Assistant Manager", salary: 700, boost: 90 },
];

// ================= Bookstore =================
export const BookstoreEmployees: Employee[] = [
  { id: 1, role: "Cashier", salary: 300, boost: 22 },
  { id: 2, role: "Shelf Organizer", salary: 250, boost: 18 },
  { id: 3, role: "Manager", salary: 1100, boost: 170 },
  { id: 4, role: "Security", salary: 400, boost: 40 },
  { id: 5, role: "Cleaner", salary: 200, boost: 10 },
  { id: 6, role: "Stock Clerk", salary: 250, boost: 20 },
  { id: 7, role: "Cashier Assistant", salary: 200, boost: 15 },
  { id: 8, role: "Event Coordinator", salary: 450, boost: 50 },
  { id: 9, role: "Inventory Manager", salary: 600, boost: 85 },
  { id: 10, role: "Assistant Manager", salary: 800, boost: 110 },
];

// ================= Tech Shop =================
export const TechShopEmployees: Employee[] = [
  { id: 1, role: "Salesperson", salary: 800, boost: 90 },
  { id: 2, role: "Technician", salary: 1000, boost: 120 },
  { id: 3, role: "Cashier", salary: 400, boost: 30 },
  { id: 4, role: "Manager", salary: 2000, boost: 300 },
  { id: 5, role: "Stock Clerk", salary: 500, boost: 40 },
  { id: 6, role: "Assistant Technician", salary: 600, boost: 60 },
  { id: 7, role: "Customer Support", salary: 350, boost: 25 },
  { id: 8, role: "Inventory Specialist", salary: 700, boost: 70 },
  { id: 9, role: "Sales Assistant", salary: 400, boost: 28 },
  { id: 10, role: "Assistant Manager", salary: 1200, boost: 160 },
];

// unified export
export const EmployeeData: Record<string, Employee[]> = {
  Cafe: CafeEmployees,
  Restaurant: RestaurantEmployees,
  Bakery: BakeryEmployees,
  Bookstore: BookstoreEmployees,
  "Tech Shop": TechShopEmployees,
};
