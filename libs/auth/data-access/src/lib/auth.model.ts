export interface LoginCredentials {
  username: string;
  password: string;
}

/** Response of both /auth/login and /authenticate. */
export interface LoginResponse {
  token: string;
  userId: string | number;
}

// TODO: confirm fields with backend
export interface RegisterRequest {
  username: string;
  password: string;
  [field: string]: unknown;
}
