import { ResponseWithErrors } from "./general";

export interface CompanySmall {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  owner: { id: number; email: string } | null;
}

export interface User {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  is_owner: boolean;
  company: CompanySmall;
  companies: CompanySmall[];
  avatar: string | null;
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

export interface ForgotPasswordParams {
  email: string;
}

export interface ResetPasswordParams {
  reset_password_token: string;
  password: string;
  password_confirmation: string;
}
