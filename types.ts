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

export type InstagramPosts = {
  caption:            string;
  comments_count:     number;
  like_count:         number;
  media_url:          string;
  media_type:         string;
  timeStamp:          string;
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
  niche:          string[];
  last_name?:     string;
  email?:         string;
  bio?:  string;
  bio?:           string;
  website?:       string;
  img_url?:           string;
  date_of_birth: string;
}

export interface ICampaign {
  id:               string;
  headline:         string;
  type:             string;
  description:      string;
  created_by:       string;
  is_public:        boolean;
  is_paid:          boolean;
  submission_due_date:       string;
  start_date:       string;
  currency:         string;
  end_date:         string;
  cost:             number;
  budget:           number;
  is_published:     boolean;
  brief?:           string;
  deliverables?:     ICampaignDeliverable;
  compensation?:     ICampaignCompensation;
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

export interface BrandsDashMetrics {
  totalActiveCampaigns:       number;
  totalActiveCampaignSpend:   number;
  totalActiveCampaignsNow:    number;
}

export interface CampaignMetrics {
  totalViews:             number,
  totalReach:             number,
  totalImpressions:       number,
  totalInteractions:      number,
  totalShares:            number,
  totalLikes:             number,
  totalComments:          number
}

export interface ICampaignRequest {
  campaign_decision:  string;
  creator_decision:   string;
  creator_profile_id: string;
  campaign_id:        string;
  price:              number;
  id:                 string;
  created_at:         Date;
  updated_at:         Date;
  rateCard?:          IRateCard;
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
  platformProfile:      IPlatformProfile;
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
  platform_profile_id:      string;
  price:                    number;
  currency:                 string;
}

export interface IPlatformProfile {
  id:                         string;
  profile_id:                 string;
  first_name:                  string;
  last_name:                   string;
  work_platform:              string; // typeOf Socials
  reputation_follower_count:  number;
  gender:                     string;
  reputation_content_count:   number;
  platform_username:          string;
  rate?:                      IPlatformRate;
  profile?:                   IUserProfile;
  
}

export interface NPlatformProfile {
  first_name: string;
  last_name: string;
  url: string;
  website: string;
  bio: string;
  niche: string[];
  platformProfiles: IPlatformProfile[];
}

export interface ICreatorProfile {
  id:                       string;
  phylloId:                 string;
  firstName:                string;
  lastName:                 string;
  imgUrl?:                  string;
  platformProfile:          IPlatformProfile[];
}

export interface PhylloResponse {
  phylloId:             string;
  sdkToken:             string;
}

export interface ContentSubmissions {
  id:                       string;
  campaignId:               string;
  creatorId:                string;
  url:                      string;
  type:                     string;
  campaign_descison:        CampaignDecision[];
  creator_note:             CreatorNote[];
  campaign_note:            string;
  created_at:               string;
  updated_at:               string;
}

export interface CampaignDecision {
  decision: string;
  timeStamp: string
}

export interface CreatorNote {
  note: string;
  timeStamp: string
}

export interface Tags {
  id: string;
  name: string;
  created_at: string;
  update_at: string;
}