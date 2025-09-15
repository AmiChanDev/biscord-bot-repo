export interface Business {
  id: string;
  type: string;
  level: number;
  employees: number;
  equipment: number;
  revenue: number;
  balance: number;
  lastCollect: Date | null;
}
