import type { Business } from "./Business.js";

export interface UserData {
  userId: string;
  activeBusinessId?: string;
  businesses: Business[];
}
