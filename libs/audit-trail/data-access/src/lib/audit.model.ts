/**
 * An audit-trail record. Kept standalone rather than extending BaseEntity
 * because the backend sends createdAt as a Date here.
 */
export interface AuditsEntity {
  id: string | number;
  name: string;
  actionedBy: string;
  resource: object;
  createdAt: Date;
  updatedAt: string;
}

export interface AuditFilters {
  page?: number;
  size?: number;
  search?: string;
  sort?: string;
  order?: 'ASC' | 'DESC';
}
