import { API_ROUTES } from "@/constants/routes";
import type { AxiosResponse } from 'axios'
import type {  APIResponse as ApiResponse,SocialPlatformProfile, PayoutAccount, ResponseMessage} from "types";

export interface Bank {
  id: number;
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string;
  pay_with_bank: boolean;
  supports_transfer: boolean;
  available_for_direct_debit: boolean;
  active: boolean;
  country: string;
  currency: string;
  type: string;
  is_deleted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

interface GetBanksResponse {
  status: boolean;
  message: string;
  data: Bank[];
}

interface GetAccountResponse {
  status: boolean;
  message: string;
  data: {
    account_number: string,
    account_name:string,
    bank_id: number
  }
}


export const getBanks = async()=> {
    const { $http } = useNuxtApp();
    const http = $http as import('axios').AxiosInstance;
    const res: AxiosResponse<GetBanksResponse> = await http.get(API_ROUTES.BANK.GET_ALL_BANKS);
    return res.data.data; 
}

export const validateAccount = async(payload:{accountNumber: string, bankCode: string})=> {
    const { $http } = useNuxtApp();
    const http = $http as import('axios').AxiosInstance;
    const res: AxiosResponse<GetAccountResponse> = await http.post(API_ROUTES.BANK.VALIDATE_BANK_ACCOUNT, payload);
    return res.data.data; 
}

export const getBankAccount = async()=> {
    const { $http } = useNuxtApp();
    const http = $http as import('axios').AxiosInstance;
    const res: AxiosResponse<ApiResponse<"bankAccount", PayoutAccount>> = await http.get(API_ROUTES.BANK.GET_BANK_ACCOUNT);
    return res.data.data; 
}

export const saveBankAccount = async(payload:{
    accountNumber: string,
    accountName: string,
    bankName: string,
    bankCode: string,
    currency: string
})=> {
    const { $http } = useNuxtApp();
    const http = $http as import('axios').AxiosInstance;
    const res: AxiosResponse<ApiResponse<"bankAccount", PayoutAccount>> = await http.post(API_ROUTES.BANK.SAVE_BANK_ACCOUNT,payload);
    return res.data.data; 
}

