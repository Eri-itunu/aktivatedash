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
  perPage:     number;
  currentPage: number;
  lastPage:    number;
  firstPage:   number;
  previousPageUrl: string;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string;
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
  roleId:            number;
  managed_by?:        string;
  email_verified_at?:  string
}

export interface CampaignAnalytics {
     campaign_id: string;
     id: string;
     cost: number;
     submissions: number;
     total_posts: string;
     like_count: string;
     comment_count: string;
     view_count: string;
     save_count: string;
     share_count: string;
     paid_impression_count: string;
     paid_reach: string;
     creator_count: string;
     total_engagement_rate: string;
     avg_engagement_rate: string;
   }

   export interface CreatorAnalytics {
     creatorProfileId: string;
     platformUsername: string;
     workPlatform: string;
     count: number;
     fullname: string;
     likes: number;
     comments: number;
     views: number;
     saves: number;
     shares: number;
     paidImpressions: number;
     paidReach: number;
     engagementRate: number;
     work_platforms: any[];
   }
export interface CampaignMetricsResponse {
     campaign_analytics: CampaignAnalytics;
     creator_analytics: CreatorAnalytics[];
   }

export interface IUserProfile {
  id:            string;
  firstName:    string;
  niche:          string[];
  hasCollaborationHub?: boolean;
  hasDiscovery?: boolean;
  hasPrivateCampaign?: boolean;
  lastName?:     string;
  email?:         string;
  bio?:           string;
  website?:       string;
  fullName:       string;
  imgUrl?:           string;
  dateOfBirth: string;
  platformProfiles: IPlatformProfile[];
}

export interface ICampaign {
  id:               string;
  headline:         string;
  type:             string;
  description:      string;
  created_by:       string;
  isPublic:        boolean;
  isPaid:          boolean;
  isShorlisted: boolean;
  submissionDueDate:       string;
  images:           string[];
  startDate:       string;
  currency:         string;
  endDate:         string;
  cost:             number;
  budget:           number;
  isPublished:     boolean;
  brief?:           string;
  deliverables:     ICampaignDeliverable;
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
  contentType: string[];
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

export type CreatorStats = {
  id: string;
  first_name: string;
  last_name: string;
  img_url: string | null;
  url: string | null;
  total_likes: string; // Consider converting this to a number if possible
  total_comments: string; // Consider converting this to a number if possible
  total_saves: string; // Consider converting this to a number if possible
  total_views: string; // Consider converting this to a number if possible
  total_organic_reach: string; // Consider converting this to a number if possible
  total_paid_reach: string; // Consider converting this to a number if possible
  total_paid_impressions: string | null; // Consider converting this to a number if possible
  total_organic_impressions: string; // Consider converting this to a number if possible
};

export interface ICampaignRequest {
  campaign_decision:  string;
  creatorDecision:   string;
  creator_profile_id: string;
  campaign_id:        string;
  price:              number;
  id:                 string;
  created_at:         Date;
  updated_at:         Date;
  rateCard?:          IRateCard;
  campaign:           ICampaign;
  currency: string;
}

export interface IRateCard {
  id:                   string;
  platformProfileId:  string;
  creator_id:           string;
  price:                number;
  currency:             string;
  type:                 string;
  description:          string;
  created_at:           Date;
  updated_at:           Date;
  platformProfile:      IPlatformProfile;
}

export interface ICampaignForm {
  headline: string;
  description: string;
  requirements: string;
  contentType: string[];
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
  description:              string;
  type:                     string;
}

export interface IPlatformProfile {
  id:                         string;
  profileId:                 string;
  firstName:                  string;
  lastName:                   string;
  fullName:                   string;
  workPlatform:              string; // typeOf Socials
  reputationFollowerCount:  number;
  reputationSubscriberCount: number;
  gender:                     string;
  reputationContentCount:   number;
  reputationFollowingCount: number
  platformUsername:          string;
  engagementRate:            number;
  rate:                      IPlatformRate[];
  profile?:                   IUserProfile;
  website:                    string;
}

export interface NPlatformProfile {
  id: string;
  firstName: string;
  lastName: string;
  url: string;
  website: string;
  bio: string;
  engagement_rate: string;
  imgUrl: string;
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
  headline:                 string;
  submission_due_date:      string;
  creatorProfile:{
    firstName: string;
    lastName: string;
  }
  campaignDescison:        CampaignDecision[];
  creatorNote:             CreatorNote[];
  campaignNote:             CreatorNote[];
  createdAt:               string;
  updatedAt:               string;
  campaignDecision:        string;
  decisionHistory:         CampaignDecision[]
  creator?:                 Partial<IUserProfile>;
  campaign:                 Partial<ICampaign>
}

export interface CampaignDecision {
  decision: string;
  timeStamp: string
}

export interface CreatorNote {
  note: string;
  timestamp: string
}

export interface Tags {
  id: string;
  name: string;
  created_at: string;
  update_at: string;
}

export interface Creators {
  firstName: string;
  lastName: string;
  platform: string;
  rates: IPlatformRate
}

export interface Deliverable {
  requirements: {
    dos: string;
    donts: string;
  };
  platforms: string[];
  numOfPosts: number;
  captions: string[];
  hashtags: string[];
  _id: string;
}

export interface Compensation {
  currency: string;
  price: number;
  gift: string;
  isMonetary: boolean;
  isGift: boolean;
  _id: string;
}

export interface Qualification {
  ageRange: {
    min: number;
  };
  audienceSize: {
    min: number;
    max: number;
  };
  gender: string;
  niche: string[];
  _id: string;
}

interface brandInfo {
  companyName: string;
  links: string[];
  description: string
}
export interface CollabHubCampaign {
  _id: string;
  headline: string;
  contentType: string[];
  description: string;
  brandInformation: brandInfo;
  type: string;
  createdBy: string;
  isPublic: boolean;
  isPaid: boolean;
  isPublished: boolean;
  cost: number;
  platforms: string[];
  currency: string;
  images: string[];
  isShorlisted: boolean;
  applicationCloseDate: string;
  submissionDueDate: string;
  startDate: string;
  endDate: string;
  deliverable: Deliverable;
  compensation: Compensation;
  qualification: Qualification;
  createdAt: string;
  updatedAt: string;
  captions: string[];
  hashtags: string[];
  id: string;
  __v: number;
}


 export interface Collaboration {
  _id: string;
  creatorProfileId: string;
  campaignId: string;
  platformProfileId: string;
  creatorDecision: string;
  campaignDecision: string;
  price: number;
  gift: string;
  currency: string;
  isShorlisted: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
  platformProfile: IPlatformProfile
  __v: number;
  campaign: {
    brandInformation: {
      companyName: string;
      links: string[];
      description: string;
    };
    _id: string;
    headline: string;
    description: string;
    type: string;
    createdBy: string;
    isPublic: boolean;
    isPaid: boolean;
    isPublished: boolean;
    cost: number;
    currency: string;
    images: string[];
    applicationCloseDate: string;
    submissionDueDate: string;
    startDate: string;
    endDate: string;

    deliverable: {
      requirements: {
        dos: string;
        donts: string;
      };
      platforms: string[];
      numOfPosts: number;
      captions: string[];
      hashtags: string[];
      _id: string;
    };
    compensation: {
      currency: string;
      price: number;
      gift: string;
      isMonetary: boolean;
      isGift: boolean;
      _id: string;
    };
    qualification: {
      ageRange: {
        min: number;
        max: number;
      };
      audienceSize: {
        max: number;
      };
      gender: string;
      niche: string[];
      _id: string;
    };
    createdAt: string;
    updatedAt: string;
    id: string;
    __v: number;
  };
};


type Account = {
  id: string;
  platform_username: string;
  username: string;
};

type Engagement = {
  like_count: number | null;
  dislike_count: number | null;
  comment_count: number | null;
  impression_organic_count: number | null;
  impression_paid_count: number | null;
  reach_organic_count: number | null;
  reach_paid_count: number | null;
  click_count: number | null;
  email_click_rate: number | null;
  email_open_rate: number | null;
  replay_count: number | null;
  save_count: number | null;
  share_count: number | null;
  spam_report_count: number | null;
  unsubscribe_count: number | null;
  view_count: number | null;
  watch_time_in_hours: number | null;
};

type User = {
  id: string;
  name: string;
};

type WorkPlatform = {
  id: string;
  name: string;
  logo_url: string;
};

export type Media = {
  account: Account;
  id: string;
  platform_username: string;
  username: string;
  audience: null | any;
  authors: null | any;
  collaboration: null | any;
  content_tags: null | any;
  created_at: string;
  description: string;
  duration: number;
  engagement: Engagement;
  additional_info: null | any;
  external_id: string;
  format: string;
  hashtags: null | any;
  is_owned_by_platform_user: boolean;
  media_url: string;
  media_urls: string[];
  mentions: null | any;
  persistent_thumbnail_url: string;
  platform: null | any;
  platform_profile_id: string;
  platform_profile_name: string;
  published_at: string;
  sponsored: null | any;
  thumbnail_url: string;
  title: string;
  type: string;
  updated_at: string;
  url: string;
  user: User;
  visibility: string;
  work_platform: WorkPlatform;
};

export type PlatformProfile = {
  _id: string;
  id: string;
  __v: number;
  accessToken: string | null;
  accessTokenExpiresDate: string | null;
  accessTokenExpiresIn: string | null;
  accountStatus: string;
  address: string | null;
  addressType: string | null;
  audienceReach: number;
  averageLikes: number;
  category: string;
  country: string;
  createdAt: string;
  dateOfBirth: string | null;
  deletedAt: string | null;
  disconnectionSource: string | null;
  emailId: string | null;
  emailType: string | null;
  engagementRate: number;
  externalId: string;
  firstName: string;
  fullName: string;
  gender: string;
  imageUrl: string | null;
  introduction: string | null;
  isBusiness: boolean;
  isVerified: boolean;
  lastName: string;
  nickName: string;
  phoneNumberId: string | null;
  phoneNumberType: string | null;
  phylloAccountId: string;
  phylloProfileId: string;
  platformAccountType: string;
  platformProfileName: string | null;
  platformProfilePublishedAt: string | null;
  platformUsername: string;
  profileId: string;
  reputationContentCount: number;
  reputationContentGroupCount: number;
  reputationFollowerCount: number;
  reputationFollowingCount: number;
  reputationRetweetCount: number | null;
  reputationSubscriberCount: number;
  reputationWatchTimeInHours: number;
  suggestedPrice: number;
  updatedAt: string;
  url: string;
  website: string | null;
  workPlatform: string;
};

export type Submission = {
  _id: string;
  creatorProfileId: string;
  campaignId: string;
  platformProfileId: string;
  creatorDecision: "accept" | "reject" | "pending"; // Assuming possible values
  campaignDecision: "pending" | "approved" | "rejected"; // Assuming possible values
  price: number;
  gift: string | null;
  currency: string;
  isShorlisted: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
  __v: number;
  platformProfile: PlatformProfile;
};

export type VoucherResponse = {
  error: boolean;
  data: {
    voucher: {
      id: string;
      code: string;
      type: string;
      initialAmount: number;
      balance: number;
      currency: string;
      createdBy: string;
      belongsTo: string;
      paymentVerified: boolean;
      isDeleted: boolean;
      _id: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
};

export type Voucher = {
  _id: string;
  id: string;
  code: string;
  type: 'CREATED' | 'UPDATED' | 'DELETED';  // You can expand this type as per other possible values for 'type'
  description: string;
  initialAmount: number;
  balance: number;
  currency: string;
  createdBy: string;
  expiryDate: string;  // You can use Date if you need to work with Date objects instead of strings
  belongsTo: string;
  paymentVerified: boolean;
  isDeleted: boolean;
  createdAt: string;  // You can use Date if you need to work with Date objects instead of strings
  updatedAt: string;  // Same here
  __v: number;
};

export type VoucherList = Voucher[];


type VoucherSplit = {
  amount: number;
  email: string;
};

type SplitVoucherPayload = {
  parentVoucherId: string;
  vouchers: VoucherSplit[];
};

export type AssignVoucherParams = {
    payload: SplitVoucherPayload;
    accessToken: string;
    apiUrl: string;
};

type voucherBody = {
  expiryDate: string;
  amount: string;
  description: string;
};

  
export type GetMyVouchersParams = {
  values: voucherBody;
  accessToken: string;
  apiUrl: string;
};

