/**
 * Interface for the 'Audits' data
 */
export interface AuditsEntity {
  id: string | number; // Primary ID
  name: string;
  actionedBy:string;
  resource:object
  createdAt:Date
  updatedAt:string
}
