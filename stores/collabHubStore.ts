// stores/collabHubStore.ts
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useUserStore } from '@/stores/userStore'; // Ensure the user store is correctly imported
import type { ResponseMessage } from '@/types';

export const useCollabHubStore = defineStore(
  'collabHub',
  () => {
    const config = useRuntimeConfig();
    const API_URL = config.public.API_URL;
    const userStore = useUserStore();

    const date = new Date();
    const campaignName = ref('');
    const campaignImages = ref<string[]>([]);
    const campaignDescription = ref('');
    const numOfCreators = ref(1);
    const imageUrl = ref<File | null>(null);
    const fileUrl = ref<string>('');
    const closeDate = ref(new Date(date.setDate(date.getDate() + 2)));
    const contentApproval = ref(new Date(date.setDate(date.getDate() + 7)));
    const startDate = ref(new Date(date.setDate(date.getDate() + 14)));
    const endDate = ref(new Date(date.setDate(date.getDate() + 21)));
    const companyName = ref('');
    const companyLinks = ref('');
    const brandInformation = ref('');
    const gender = ref('M');
    const niche = ref('any');
    const audienceRange = ref<string>('');
    const audienceSizeMin = ref(0);
    const audienceSizeMax = ref(0);

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
        numOfPosts: numOfPosts.value,
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
          quantity: 1,
          contentDescription: 'High-quality product images and videos',
          captions: [captions.value],
          hashtags: [hashtags.value],
        },
        brandInformation: {
          companyName: companyName.value,
          links: [companyLinks.value],
          description: brandInformation.value,
        },
      };
    
      try {
        const res = await $fetch<ResponseMessage>(`${API_URL}/campaign/collaboration-hub/create`, {
          method: 'post',
          body: campaignBody,
          headers: { Authorization: `Bearer ${userStore.accessToken}` },
        });
        resetCampaign()
        return res;
      } catch (err: any) {
        throw new Error(err.data?.message || "Something went wrong")
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
      closeDate.value = new Date(date.setDate(date.getDate() + 2));
      contentApproval.value = new Date(date.setDate(date.getDate() + 7));
      startDate.value = new Date(date.setDate(date.getDate() + 14));
      endDate.value = new Date(date.setDate(date.getDate() + 21));
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
   
    };
  },
  { persist: true }
);
