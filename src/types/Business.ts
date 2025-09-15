import type { Employee } from "./Employee.js";

export interface Business {
  id: string;
  type: string;
  level: number;
  equipment: number;
  revenue: number;
  balance: number;
  lastCollect: Date | null;
  hiredEmployees: Employee[];
}
