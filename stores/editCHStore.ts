// stores/collabHubStore.ts
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useUserStore } from '@/stores/userStore'; // Ensure the user store is correctly imported
import type { APIResponse, CollabHubCampaign, Collaboration, PaginatedAPIResponse, ResponseMessage } from '@/types';
import { useToast } from "@/components/ui/toast/use-toast";
export const useEditStore = defineStore(
  'editCollabHub',
  () => {
    const config = useRuntimeConfig();
    const {toast}  = useToast();
    const API_URL = config.public.API_URL;
    const userStore = useUserStore();
    const state = ref('active')
    const date = new Date();
    const campaignName = ref('');
    const campaignImages = ref<string[]>([]);
    const campaignDescription = ref('');
    const numOfCreators = ref(1);
    const imageUrl = ref<File | null>(null);
    const fileUrl = ref<string>('');
    const closeDate = ref(new Date(date.setDate(date.getDate() + 7)));
    const contentApproval = ref(new Date(date.setDate(date.getDate() + 7)));
    const startDate = ref(new Date(date.setDate(date.getDate() + 7)));
    const endDate = ref(new Date(date.setDate(date.getDate() + 7)));
    const companyName = ref('');
    const companyLinks = ref('');
    const brandInformation = ref('');
    const gender = ref('Any');
    const niche = ref('any');
    const audienceRange = ref<string>('');
    const audienceSizeMin = ref(0);
    const audienceSizeMax = ref(0);
    const campaignId = ref('')
    // Split and parse the audience range safely
    if (audienceRange.value) {
      const [min, max] = audienceRange.value.split(',').map(Number);
      audienceSizeMin.value = min || 0;
      audienceSizeMax.value = max || 0;
    }

    const platform = ref('instagram');
    const type = ref('');
    const quantity = ref<number>(1);
    const hashtags = ref('');
    const captions = ref('');
    const numOfPosts = ref(1);
    const creatorDo = ref('');
    const creatorDont = ref('');
    const paymentOption = ref('pay');
    const amount = ref<number | null>(null);
    const giftItem = ref('');
    const isGift = ref(false);
    const isMonetary = ref(false);
    const influencerType = ref()
    const influencerName = ref('')
    type Location = {
      state: string
      countryCode: string
    }

   const locations = ref<Location[]>([{
    state: 'Any',
    countryCode: 'Any',
  }])
  

    const createCampaign = async () => {
      const campaignBody = {
        headline: campaignName.value,
        description: campaignDescription.value,
        contentType: [type.value],
        platformType: platform.value,
        applicationCloseDate: new Date(closeDate.value).toISOString().split('T')[0],
        submissionDueDate: new Date(contentApproval.value).toISOString().split('T')[0],
        startDate: new Date(startDate.value).toISOString().split('T')[0],
        endDate: new Date(endDate.value).toISOString().split('T')[0],
        locations: locations.value,
        numOfCreators: numOfCreators.value,
        images: [fileUrl.value],

        targetCreator: {
          gender: gender.value,
          ageRange: { min: 0, max: 0 },
          niche: [niche.value],
          audienceSize: { min: audienceSizeMin.value, max: audienceSizeMax.value },
        },
        compensation: {
          isGift: isGift.value,
          isMonetary: isMonetary.value,
          price: amount.value,
          currency: 'NGN',
          gift: giftItem.value,
        },
        deliverable: {
          requirements: { dos: creatorDo.value, donts: creatorDont.value },
          contentDescription: 'High-quality product images and videos',
          captions: [captions.value],
          hashtags: [hashtags.value],
          numOfPosts: numOfPosts.value,
        },
        brandInformation: {
          companyName: companyName.value,
          links: [companyLinks.value],
          description: brandInformation.value,
        },
      };

      if(campaignBody.targetCreator.gender === 'Any') {
        campaignBody.targetCreator.gender = '';
      }
    
      try {
        const res = await $fetch<ResponseMessage>(`${API_URL}/campaign/collaboration-hub/${campaignId.value}/edit`, {
          method: 'put',
          body: campaignBody,
          headers: { Authorization: `Bearer ${userStore.accessToken}` },
        });
        state.value = 'inactive'
        resetCampaign()
        return res;
      } catch (err: any) {
        throw new Error(err.data?.message || "Something went wrong")
      }
    };
    
    const singleCollabHub = async (id: string) => {
        campaignId.value = id
        try {
            const res = await $fetch<APIResponse<'campaign', CollabHubCampaign>>(
            `${API_URL}/campaign/collaboration-hub/get-one/${id}`
            );

            const c = res.data.campaign;

            // Populate refs
            campaignName.value = c.headline || '';
            campaignDescription.value = c.description || '';
            type.value = c.contentType?.[0] || '';
            platform.value = c.deliverable?.platforms?.[0] || 'instagram';
            closeDate.value = new Date(c.applicationCloseDate);
            contentApproval.value = new Date(c.submissionDueDate);
            startDate.value = new Date(c.startDate);
            endDate.value = new Date(c.endDate);
            locations.value = c.locations?.map(loc => ({
            state: loc.state || 'Any',
            countryCode: loc.countryCode || 'Any'
            })) || [{ state: 'Any', countryCode: 'Any' }];
            numOfCreators.value = c.numOfCreators || 1;
            fileUrl.value = c.images?.[0] || '';
            companyName.value = c.brandInformation?.companyName || '';
            companyLinks.value = c.brandInformation?.links?.[0] || '';
            brandInformation.value = c.brandInformation?.description || '';
            gender.value = c.qualification?.gender || 'Any';
            niche.value = c.qualification?.niche?.[0] || 'any';
            audienceSizeMin.value = c.qualification?.audienceSize?.min || 0;
            audienceSizeMax.value = c.qualification?.audienceSize?.max || 0;
            hashtags.value = c.deliverable?.hashtags?.[0] || '';
            captions.value = c.deliverable?.captions?.[0] || '';
            numOfPosts.value = c.deliverable?.numOfPosts || 1;
            creatorDo.value = c.deliverable?.requirements?.dos || '';
            creatorDont.value = c.deliverable?.requirements?.donts || '';
            amount.value = c.compensation?.price || null;
            isMonetary.value = !!c.compensation?.isMonetary;
            isGift.value = !!c.compensation?.isGift;
            giftItem.value = c.compensation?.gift || '';

            state.value = 'edit';

            return res;
        } catch (error: any) {
            toast({ title: error.data?.message || 'Something went wrong' });
        }
        };


    const resetCampaign = () => {
      campaignName.value = '';
      campaignImages.value = [];
      campaignDescription.value = '';
      numOfCreators.value = 1;
      imageUrl.value = null;
      fileUrl.value = '';
      const date = new Date(); // Ensure a fresh date instance is used
      closeDate.value = new Date(date.setDate(date.getDate() + 7));
      contentApproval.value = new Date(date.setDate(date.getDate() + 7));
      startDate.value = new Date(date.setDate(date.getDate() + 7));
      endDate.value = new Date(date.setDate(date.getDate() + 7));
      companyName.value = '';
      companyLinks.value = '';
      brandInformation.value = '';
      gender.value = 'M';
      niche.value = 'Any';
      audienceRange.value = '';
      audienceSizeMin.value = 0;
      audienceSizeMax.value = 0;
      platform.value = 'instagram';
      type.value = '';
      quantity.value = 1;
      hashtags.value = '';
      captions.value = '';
      numOfPosts.value = 1;
      creatorDo.value = '';
      creatorDont.value = '';
      paymentOption.value = 'pay';
      amount.value = null;
      giftItem.value = '';
      isGift.value = false;
      isMonetary.value = false;
    };
    

    return {
      campaignName,
      campaignImages,
      campaignDescription,
      numOfCreators,
      closeDate,
      contentApproval,
      startDate,
      endDate,
      companyName,
      companyLinks,
      brandInformation,
      gender,
      niche,
      audienceSizeMin,
      audienceSizeMax,
      platform,
      type,
      quantity,
      imageUrl,
      fileUrl,
      audienceRange,
      captions,
      hashtags,
      numOfPosts,
      creatorDo,
      creatorDont,
      paymentOption,
      amount,
      giftItem,
      isMonetary,
      isGift,
      createCampaign,
      influencerType,
      influencerName,
      state,
      locations,
      resetCampaign,
      singleCollabHub
    };
  },
  { persist: true }
);
