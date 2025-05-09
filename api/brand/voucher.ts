import type { APIResponse, GetMyVouchersParams, VoucherResponse,Voucher, BrandsDashMetrics, CampaignMetrics , PaginatedAPIResponse, PaginationMeta, AssignVoucherParams} from 'types';
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
  params: { accessToken: string; apiUrl: string; page?:number; }
): Promise< {data: Voucher[], meta: PaginationMeta}> => {
  const { accessToken, apiUrl,page } = params;

  try {
    const res = await axios.get<PaginatedAPIResponse<'vouchers', Voucher>>(
      `${apiUrl}/voucher/get/assigned-to-me?page=${page}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return {
      data: res.data.data.vouchers.data,
      meta: res.data.data.vouchers.meta,
    };
  } catch (error: any) {
    const errorMsg =
      error.response?.data?.message || error.message || 'Error fetching vouchers';
    throw new Error(errorMsg);
  }
};

export const getCreatedVouchers = async (
    params: { accessToken: string; apiUrl: string; page?:number }
  ): Promise< {data: Voucher[], meta: PaginationMeta}> => {
    const { accessToken, apiUrl,page } = params;
  
    try {
      const res = await axios.get<PaginatedAPIResponse<'vouchers', Voucher>>(
        `${apiUrl}/voucher/get/created-by-me?page=${page}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
  
      return {
        data: res.data.data.vouchers.data,
        meta: res.data.data.vouchers.meta,
      };
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

