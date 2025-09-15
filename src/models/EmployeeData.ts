import type { Employee } from "../types/Employee.js";

// ================= Cafe =================
export const CafeEmployees: Employee[] = [
  { id: 1, role: "Barista", baseSalary: 200, boost: 50 },
  { id: 2, role: "Cashier", baseSalary: 250, boost: 40 },
  { id: 3, role: "Manager", baseSalary: 800, boost: 150 },
  { id: 4, role: "Cleaner", baseSalary: 150, boost: 10 },
  { id: 5, role: "Chef", baseSalary: 400, boost: 80 },
  { id: 6, role: "Waiter", baseSalary: 200, boost: 35 },
  { id: 7, role: "Dishwasher", baseSalary: 150, boost: 10 },
  { id: 8, role: "Receptionist", baseSalary: 250, boost: 25 },
  { id: 9, role: "Stock Clerk", baseSalary: 180, boost: 15 },
  { id: 10, role: "Assistant Manager", baseSalary: 600, boost: 120 },
];

// ================= Restaurant =================
export const RestaurantEmployees: Employee[] = [
  { id: 1, role: "Chef", baseSalary: 600, boost: 120 },
  { id: 2, role: "Sous Chef", baseSalary: 500, boost: 100 },
  { id: 3, role: "Waiter", baseSalary: 300, boost: 50 },
  { id: 4, role: "Host", baseSalary: 350, boost: 40 },
  { id: 5, role: "Manager", baseSalary: 1200, boost: 200 },
  { id: 6, role: "Cleaner", baseSalary: 200, boost: 15 },
  { id: 7, role: "Bartender", baseSalary: 400, boost: 60 },
  { id: 8, role: "Dishwasher", baseSalary: 180, boost: 10 },
  { id: 9, role: "Expediter", baseSalary: 450, boost: 70 },
  { id: 10, role: "Assistant Manager", baseSalary: 800, boost: 150 },
];

// ================= Bakery =================
export const BakeryEmployees: Employee[] = [
  { id: 1, role: "Baker", baseSalary: 400, boost: 90 },
  { id: 2, role: "Cashier", baseSalary: 250, boost: 30 },
  { id: 3, role: "Delivery", baseSalary: 300, boost: 40 },
  { id: 4, role: "Cleaner", baseSalary: 150, boost: 10 },
  { id: 5, role: "Manager", baseSalary: 1000, boost: 180 },
  { id: 6, role: "Assistant Baker", baseSalary: 350, boost: 60 },
  { id: 7, role: "Stock Clerk", baseSalary: 200, boost: 20 },
  { id: 8, role: "Cashier Assistant", baseSalary: 180, boost: 15 },
  { id: 9, role: "Delivery Assistant", baseSalary: 250, boost: 25 },
  { id: 10, role: "Assistant Manager", baseSalary: 700, boost: 130 },
];

// ================= Bookstore =================
export const BookstoreEmployees: Employee[] = [
  { id: 1, role: "Cashier", baseSalary: 300, boost: 30 },
  { id: 2, role: "Shelf Organizer", baseSalary: 250, boost: 25 },
  { id: 3, role: "Manager", baseSalary: 1100, boost: 160 },
  { id: 4, role: "Security", baseSalary: 400, boost: 60 },
  { id: 5, role: "Cleaner", baseSalary: 200, boost: 15 },
  { id: 6, role: "Stock Clerk", baseSalary: 250, boost: 20 },
  { id: 7, role: "Cashier Assistant", baseSalary: 200, boost: 15 },
  { id: 8, role: "Event Coordinator", baseSalary: 450, boost: 50 },
  { id: 9, role: "Inventory Manager", baseSalary: 600, boost: 90 },
  { id: 10, role: "Assistant Manager", baseSalary: 800, boost: 120 },
];

// ================= Tech Shop =================
export const TechShopEmployees: Employee[] = [
  { id: 1, role: "Salesperson", baseSalary: 800, boost: 150 },
  { id: 2, role: "Technician", baseSalary: 1000, boost: 180 },
  { id: 3, role: "Cashier", baseSalary: 400, boost: 50 },
  { id: 4, role: "Manager", baseSalary: 2000, boost: 300 },
  { id: 5, role: "Stock Clerk", baseSalary: 500, boost: 70 },
  { id: 6, role: "Assistant Technician", baseSalary: 600, boost: 100 },
  { id: 7, role: "Customer Support", baseSalary: 350, boost: 30 },
  { id: 8, role: "Inventory Specialist", baseSalary: 700, boost: 90 },
  { id: 9, role: "Sales Assistant", baseSalary: 400, boost: 50 },
  { id: 10, role: "Assistant Manager", baseSalary: 1200, boost: 180 },
];

// unified export
export const EmployeeData: Record<string, Employee[]> = {
  Cafe: CafeEmployees,
  Restaurant: RestaurantEmployees,
  Bakery: BakeryEmployees,
  Bookstore: BookstoreEmployees,
  "Tech Shop": TechShopEmployees,
};
