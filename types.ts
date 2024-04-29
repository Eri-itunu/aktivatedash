import type Socials from "enums/socials";

export type LoginResponse<T> = {
  error: boolean;
  message: string;
  data: {
    user: T,
    token: string,
  },
}

export interface APIResponse<K extends string, T> {
  error: boolean;
  message: string;
  data: {
    [key in K]: T;
  },
}

export interface GetResponse<K extends string, T>  {
  error: boolean;
  data: {
    [key in K]: {
      campaigns:     T[],
    }
  },
}


export interface ResponseMessage  {
  error: boolean;
  message: string;
}

export type PaginationMeta = {
  total:        number;
  per_page:     number;
  current_page: number;
  last_page:    number;
  first_page:   number;
}

export type PaginatedAPIResponse<K extends string, T> = {
  error: boolean;
  message: string;
  data: {
    [key in K]: {
      meta:     PaginationMeta,
      data:     T[],
    }
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
  email_verified_at?:  string
}

export interface IUserProfile {
  first_name:    string;
  last_name?:     string;
  introduction?:  string;
  website?:       string;
}

export interface ICampaign {
  id:               string;
  headline:         string;
  type:             string;
  description:      string;
  created_by:       string;
  is_public:        boolean;
  is_paid:          boolean;
  start_date:       string;
  currency:         string;
  end_date:         string;
  cost:             number;
  budget:           number;
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
  content_type: string[];
  campaign_id?: string;
}

export interface ICampaignRequest {
  campaign_decision:  string;
  creator_decision:   string;
  creator_profile_id: string;
  campaign_id:        string;
  id:                 string;
  created_at:         Date;
  updated_at:         Date;
  rate_card:          IRateCard[];
  campaign:           ICampaign;
}

export interface IRateCard {
  id:                   string;
  platform_profile_id:  string;
  creator_id:           string;
  price:                number;
  currency:             string;
  created_at:           Date;
  updated_at:           Date;
}

export interface ICampaignForm {
  headline: string;
  description: string;
  requirements: string;
  content_type: string[];
  content_creator: string[]
  start_date: Date;
  end_date: Date;
  amount_posts: string;
  media_type: string[]
}

interface IPlatformRate {
  id:                       string;
  price:                    number;
  currency:                 string;
}

export interface IPlatformProfile {
  id:                         string;
  profile_id:                 string;
  work_platform:              string; // typeOf Socials
  rate?:                      IPlatformRate;
  profile?:                   IUserProfile;
}

