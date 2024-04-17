import type Socials from "enums/socials";

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
  managed_by?:        string;
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

export interface ICampaign {
  id:               string;
  headline:         string;
  type:             string;
  createdBy:        string;
  isPublic:         boolean;
  startDate:        Date;
  endDate:          Date;
  createdAt:        Date;
  updatedAt:        Date;
  deliverables:     ICampaignDeliverable;
  compensation:     ICampaignCompensation;
  requests?:        ICampaignRequest[];
}

export interface ICampaignCompensation {
  description:  string;
  currency:     string;
  price:        number;
  num_of_posts: number;
  campaign_id:  string;
  id:           string;
}

export interface ICampaignDeliverable {
  requirements: string;
  platform:     string[];
  content_type: Socials[];
  campaign_id:  string;
}

export interface ICampaignRequest {
  campaign_decision:  string;
  creator_decision:   string;
  creator_profile_id: string;
  campaign_id:        string;
  id:                 string;
  created_at:         Date;
  updated_at:         Date;
}

export type PaginatedAPIResponse<K extends string, T> = {
  error: boolean;
  message: string;
  data: {
    [key in K]: {
      meta: {
        total:        number;
        per_page:     number;
        current_page: number;
        last_page:    number;
        first_page:   number;
      },
      data: T[]
    }
  },
}
