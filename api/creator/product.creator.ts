import type { IProduct, IStorefrontEntry, PaginationMeta } from 'types';

export const getAvailableStorefrontProducts = async (params: {
  accessToken: string;
  apiUrl: string;
}): Promise<IProduct[]> => {
  const { accessToken, apiUrl } = params;
  try {
    const res = await $fetch<any>(`${apiUrl}/products/creator/get-products-available-for-storefront`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const payload = res.data;
    if (payload?.campaigns?.data) return payload.campaigns.data;
    if (payload?.products?.data) return payload.products.data;
    if (Array.isArray(payload?.products)) return payload.products;
    return [];
  } catch (error: any) {
    throw new Error(error.data?.message || error.message || 'Error fetching available products');
  }
};

export const getCreatorStorefrontProducts = async (params: {
  accessToken: string;
  apiUrl: string;
  page?: number;
}): Promise<{ data: IStorefrontEntry[]; meta: PaginationMeta }> => {
  const { accessToken, apiUrl, page = 1 } = params;
  try {
    const res = await $fetch<any>(
      `${apiUrl}/products/creator/get-storefront-products?page=${page}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return {
      data: res.data.storeFrontProducts.data,
      meta: res.data.storeFrontProducts.meta,
    };
  } catch (error: any) {
    throw new Error(error.data?.message || error.message || 'Error fetching storefront products');
  }
};

export const addProductToStorefront = async (params: {
  accessToken: string;
  apiUrl: string;
  productId: string;
}): Promise<void> => {
  const { accessToken, apiUrl, productId } = params;
  try {
    await $fetch(`${apiUrl}/products/creator/add-product-to-storefront`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
      body: { productId },
    });
  } catch (error: any) {
    throw new Error(error.data?.message || error.message || 'Error adding product to storefront');
  }
};

export const getCreatorProduct = async (params: {
  accessToken: string;
  apiUrl: string;
  slugOrId: string;
}): Promise<IProduct> => {
  const { accessToken, apiUrl, slugOrId } = params;
  try {
    const res = await $fetch<any>(`${apiUrl}/products/creator/get-product/${slugOrId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data.product;
  } catch (error: any) {
    throw new Error(error.data?.message || error.message || 'Error fetching product');
  }
};
