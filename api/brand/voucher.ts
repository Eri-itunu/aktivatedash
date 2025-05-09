import type { APIResponse, GetMyVouchersParams, VoucherResponse,Voucher, BrandsDashMetrics, CampaignMetrics , PaginatedAPIResponse, IPlatformProfile, AssignVoucherParams} from 'types';
import axios from 'axios';






  

  

  
export const createVoucher = async (params: GetMyVouchersParams): Promise<VoucherResponse> => {
    const { values, accessToken, apiUrl } = params;
  
    try {
      const res = await axios.post<VoucherResponse>(
        `${apiUrl}/voucher/create`,
        values, 
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
  
      return res.data;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || error.message || 'Error getting your vouchers';
      throw new Error(errorMsg);
    }
  };



export const assignVoucher = async (params: AssignVoucherParams): Promise<void> => {
  const { payload, accessToken, apiUrl } = params;

  try {
    await axios.post(
      `${apiUrl}/voucher/assign`,
      payload,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  } catch (error: any) {
    const errorMsg =
      error.response?.data?.message || error.message || 'Error assigning voucher';
    throw new Error(errorMsg);
  }
};



export const getMyVouchers = async (
  params: { accessToken: string; apiUrl: string }
): Promise<APIResponse<'vouchers', Voucher[]>> => {
  const { accessToken, apiUrl } = params;

  try {
    const res = await axios.get<APIResponse<'vouchers', Voucher[]>>(
      `${apiUrl}/voucher/get/belongs-to-me`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return res.data;
  } catch (error: any) {
    const errorMsg =
      error.response?.data?.message || error.message || 'Error fetching vouchers';
    throw new Error(errorMsg);
  }
};

export const getCreatedVouchers = async (
    params: { accessToken: string; apiUrl: string }
  ): Promise<APIResponse<'vouchers', Voucher[]>> => {
    const { accessToken, apiUrl } = params;
  
    try {
      const res = await axios.get<APIResponse<'vouchers', Voucher[]>>(
        `${apiUrl}/voucher/get/created-by-me`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
  
      return res.data;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || error.message || 'Error fetching vouchers';
      throw new Error(errorMsg);
    }
  };

  export const getVoucherDetails = async (
    params: { accessToken: string; apiUrl: string; voucherId:string; }
  ): Promise<APIResponse<'voucher', Voucher>> => {
    const { accessToken, apiUrl,voucherId } = params;
  
    try {
      const res = await axios.get<APIResponse<'voucher', Voucher>>(
        `${apiUrl}/voucher/get/${voucherId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
  
      return res.data;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || error.message || 'Error fetching vouchers';
      throw new Error(errorMsg);
    }
  };

export const getVoucherChildren = async (
    params: { accessToken: string; apiUrl: string; voucherId:string; }
  ): Promise<APIResponse<'vouchers', Voucher[]>> => {
    const { accessToken, apiUrl,voucherId } = params;
  
    try {
      const res = await axios.get<APIResponse<'vouchers', Voucher[]>>(
        `${apiUrl}/voucher/get/${voucherId}/children`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
  
      return res.data;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || error.message || 'Error fetching vouchers';
      throw new Error(errorMsg);
    }
};

