/**
 * Interface for the 'Stations' data
 */
export interface StationsEntity {
  id: string | number; // Primary ID
  number: number;
  name: string;
  createdBy: string;
  createdAt: string;
}
