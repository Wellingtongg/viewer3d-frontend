import { ResponseWithErrors } from "./general";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface SignupParams {
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse extends User, ResponseWithErrors {}
