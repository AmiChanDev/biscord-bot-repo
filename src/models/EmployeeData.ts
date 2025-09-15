import type { Employee } from "../types/Employee.js";

// ================= Cafe =================
export const CafeEmployees: Employee[] = [
  { id: 1, role: "Barista", salary: 200, boost: 50 },
  { id: 2, role: "Cashier", salary: 250, boost: 40 },
  { id: 3, role: "Manager", salary: 800, boost: 150 },
  { id: 4, role: "Cleaner", salary: 150, boost: 10 },
  { id: 5, role: "Chef", salary: 400, boost: 80 },
  { id: 6, role: "Waiter", salary: 200, boost: 35 },
  { id: 7, role: "Dishwasher", salary: 150, boost: 10 },
  { id: 8, role: "Receptionist", salary: 250, boost: 25 },
  { id: 9, role: "Stock Clerk", salary: 180, boost: 15 },
  { id: 10, role: "Assistant Manager", salary: 600, boost: 120 },
];

// ================= Restaurant =================
export const RestaurantEmployees: Employee[] = [
  { id: 1, role: "Chef", salary: 600, boost: 120 },
  { id: 2, role: "Sous Chef", salary: 500, boost: 100 },
  { id: 3, role: "Waiter", salary: 300, boost: 50 },
  { id: 4, role: "Host", salary: 350, boost: 40 },
  { id: 5, role: "Manager", salary: 1200, boost: 200 },
  { id: 6, role: "Cleaner", salary: 200, boost: 15 },
  { id: 7, role: "Bartender", salary: 400, boost: 60 },
  { id: 8, role: "Dishwasher", salary: 180, boost: 10 },
  { id: 9, role: "Expediter", salary: 450, boost: 70 },
  { id: 10, role: "Assistant Manager", salary: 800, boost: 150 },
];

// ================= Bakery =================
export const BakeryEmployees: Employee[] = [
  { id: 1, role: "Baker", salary: 400, boost: 90 },
  { id: 2, role: "Cashier", salary: 250, boost: 30 },
  { id: 3, role: "Delivery", salary: 300, boost: 40 },
  { id: 4, role: "Cleaner", salary: 150, boost: 10 },
  { id: 5, role: "Manager", salary: 1000, boost: 180 },
  { id: 6, role: "Assistant Baker", salary: 350, boost: 60 },
  { id: 7, role: "Stock Clerk", salary: 200, boost: 20 },
  { id: 8, role: "Cashier Assistant", salary: 180, boost: 15 },
  { id: 9, role: "Delivery Assistant", salary: 250, boost: 25 },
  { id: 10, role: "Assistant Manager", salary: 700, boost: 130 },
];

// ================= Bookstore =================
export const BookstoreEmployees: Employee[] = [
  { id: 1, role: "Cashier", salary: 300, boost: 30 },
  { id: 2, role: "Shelf Organizer", salary: 250, boost: 25 },
  { id: 3, role: "Manager", salary: 1100, boost: 160 },
  { id: 4, role: "Security", salary: 400, boost: 60 },
  { id: 5, role: "Cleaner", salary: 200, boost: 15 },
  { id: 6, role: "Stock Clerk", salary: 250, boost: 20 },
  { id: 7, role: "Cashier Assistant", salary: 200, boost: 15 },
  { id: 8, role: "Event Coordinator", salary: 450, boost: 50 },
  { id: 9, role: "Inventory Manager", salary: 600, boost: 90 },
  { id: 10, role: "Assistant Manager", salary: 800, boost: 120 },
];

// ================= Tech Shop =================
export const TechShopEmployees: Employee[] = [
  { id: 1, role: "Salesperson", salary: 800, boost: 150 },
  { id: 2, role: "Technician", salary: 1000, boost: 180 },
  { id: 3, role: "Cashier", salary: 400, boost: 50 },
  { id: 4, role: "Manager", salary: 2000, boost: 300 },
  { id: 5, role: "Stock Clerk", salary: 500, boost: 70 },
  { id: 6, role: "Assistant Technician", salary: 600, boost: 100 },
  { id: 7, role: "Customer Support", salary: 350, boost: 30 },
  { id: 8, role: "Inventory Specialist", salary: 700, boost: 90 },
  { id: 9, role: "Sales Assistant", salary: 400, boost: 50 },
  { id: 10, role: "Assistant Manager", salary: 1200, boost: 180 },
];

// unified export
export const EmployeeData: Record<string, Employee[]> = {
  Cafe: CafeEmployees,
  Restaurant: RestaurantEmployees,
  Bakery: BakeryEmployees,
  Bookstore: BookstoreEmployees,
  "Tech Shop": TechShopEmployees,
};
