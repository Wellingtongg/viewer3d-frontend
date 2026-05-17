export interface UpdateMyCurrentCompanyParams {
  company_id: number;
}

export type UserStatus = "active" | "inactive";

export interface User {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  is_owner: boolean;
  is_invited: boolean;
}

export interface UserResponse {
  records: User[];
}
