export interface BaseEntity {
  id: string | number;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

/** Input for store write methods: the payload plus a callback run on success. */
export interface RxMethodInputWithCallback<T> {
  data: T;
  callback: () => void;
}
