import type { Employee } from "./Employee.js";
import type { Equipment } from "./Equipment.js";

export interface Business {
  id: string;
  type: string;
  level: number;
  revenue: number;
  balance: number;
  lastCollect: Date | null;
  hiredEmployees: Employee[];
  boughtEquipments: Equipment[];
  employeeBoost: number;
  equipmentBoost: number;
}
