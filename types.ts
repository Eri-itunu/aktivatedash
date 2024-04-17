export type LoginResponse<T> = {
  error: boolean;
  message: string;
  data: {
    user: T,
    token: string,
  },
}

export type APIResponse<K extends string, T> = {
  error: boolean;
  message: string;
  data: {
    [key in K]: T;
  },
}

export interface IUser {
  id:                 string;
  phone_number:       string;
  email:              string;
  sign_up_method:     string;
  account_state:      string;
  role_id:            number;
  managed_by?:         string;
  email_verified_at:  string
}

export interface IUserProfile {
  first_name:    string;
  name:          string
  last_name:     string;
  introduction:  string;
  website:       string;
  date_of_birth: Date;
}