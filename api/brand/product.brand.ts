import type { IProduct, PaginatedAPIResponse, APIResponse, PaginationMeta } from 'types';
import axios from 'axios';

export interface CreateProductPayload {
  name: string;
  category: string;
  description: string;
  commissionStructure: 'percentage' | 'fixed';
  commissionFixedAmount?: number;
  commissionPercentage?: number;
  visibility: 'public' | 'private';
  retailPrice: number;
  currency: string;
  quantity: number;
  sellerSku?: string;
  primaryImage: File;
  images?: File[];
}

export const createProduct = async (params: {
  payload: CreateProductPayload;
  accessToken: string;
  apiUrl: string;
}) => {
  const { payload, accessToken, apiUrl } = params;

  const formData = new FormData();
  formData.append('name', payload.name);
  formData.append('category', payload.category);
  formData.append('description', payload.description);
  formData.append('commissionStructure', payload.commissionStructure);
  if (payload.commissionStructure === 'fixed' && payload.commissionFixedAmount !== undefined) {
    formData.append('commissionFixedAmount', String(payload.commissionFixedAmount));
  }
  if (payload.commissionStructure === 'percentage' && payload.commissionPercentage !== undefined) {
    formData.append('commissionPercentage', String(payload.commissionPercentage));
  }
  formData.append('visibility', payload.visibility);
  formData.append('retailPrice', String(payload.retailPrice));
  formData.append('currency', payload.currency);
  formData.append('quantity', String(payload.quantity));
  if (payload.sellerSku) formData.append('sellerSku', payload.sellerSku);
  formData.append('primaryImage', payload.primaryImage);
  if (payload.images?.length) {
    payload.images.forEach(img => formData.append('images', img));
  }

  const res = await axios.post(`${apiUrl}/products/brand/create`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};

export const getMyProducts = async (params: {
  accessToken: string;
  apiUrl: string;
  page?: number;
}): Promise<{ data: IProduct[]; meta: PaginationMeta }> => {
  const { accessToken, apiUrl, page = 1 } = params;

  try {
    const res = await axios.get<PaginatedAPIResponse<'campaigns', IProduct>>(
      `${apiUrl}/products/brand/my-products?page=${page}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return {
      data: res.data.data.campaigns.data,
      meta: res.data.data.campaigns.meta,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Error fetching products');
  }
};

export const updateProductStatus = async (params: {
  accessToken: string;
  apiUrl: string;
  productId: string;
  status: 'live' | 'paused';
}): Promise<void> => {
  const { accessToken, apiUrl, productId, status } = params;

  try {
    await axios.patch(
      `${apiUrl}/products/brand/update-status/${productId}`,
      { status },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Error updating product status');
  }
};

export const getProductBySlug = async (params: {
  accessToken: string;
  apiUrl: string;
  slugOrId: string;
}): Promise<IProduct> => {
  const { accessToken, apiUrl, slugOrId } = params;

  try {
    const res = await axios.get<APIResponse<'product', IProduct>>(
      `${apiUrl}/products/brand/get-product/${slugOrId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return res.data.data.product;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Error fetching product');
  }
};
