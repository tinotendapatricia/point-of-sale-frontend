

export interface BaseEntity {
  id: string | number;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
}

export type RxMethodInputWithCallback<T> = { data: T; callback: (arg?: any) => void };