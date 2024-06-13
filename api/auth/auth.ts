import type { APIResponse, IUser } from 'types';

export const getMe = async (params:{ accessToken: string, apiUrl: string}): Promise<IUser> => {
  const { accessToken, apiUrl, } = params;
  try {
    const res = await $fetch<APIResponse<'me', IUser>>(`${apiUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${accessToken}`}
    });
    return res.data.me;
  }

  catch (error: any) {
    throw new Error(error.data?.message || "Something went wrong")
  }
}