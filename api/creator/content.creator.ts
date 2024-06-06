import type { PaginatedAPIResponse,  PaginationMeta, ContentSubmissions } from 'types';


export async function getContentSubmissionList({ accessToken, apiUrl}){

    try {
      const res = await $fetch<PaginatedAPIResponse<'submissions', ContentSubmissions>>(`${apiUrl}/submission/creator/my-submissions`, {
        headers: { Authorization: `Bearer ${accessToken}`}
      });
      return res.data.submissions;
    }
  
    catch (error: any) {
      throw new Error(error.data?.message || "Something went wrong")
    }
  }


  export async function acceptedContent({accessToken, apiUrl}){

    try {
      const res = await $fetch<PaginatedAPIResponse<'campaigns', ContentSubmissions>>(`${apiUrl}/campaign/creator/get-accepted-campaigns`, {
        headers: { Authorization: `Bearer ${accessToken}`}
      });
      return res.data.campaigns.data;
    }
  
    catch (error: any) {
      throw new Error(error.data?.message || "Something went wrong")
    }
  }


 