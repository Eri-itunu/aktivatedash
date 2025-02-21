import type { PaginatedAPIResponse, APIResponse, PaginationMeta, ContentSubmissions } from 'types';


export async function getContentSubmissionList({ accessToken, apiUrl, }){

    try {
      const res = await $fetch<PaginatedAPIResponse<'submissions', ContentSubmissions>>(`${apiUrl}/submission/creator/my-submissions`, {
        headers: { Authorization: `Bearer ${accessToken}`}
      });
      return res;
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

  export async function uploadContent({accessToken, apiUrl, body}){

    try {
      const res = await $fetch<APIResponse<'submissions', ContentSubmissions>>(`${apiUrl}/submission/submit-content
      `, {
        method:"POST",
        headers: { Authorization: `Bearer ${accessToken}`},
        body
      });
      return res.data.submissions;
    }
  
    catch (error: any) {
      throw new Error(error.data?.message || "Something went wrong")
    }
  }

  


 