// stores/darkModeStore.ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import persistedState from 'pinia-plugin-persistedstate'

export const useCollabHubStore = defineStore('collabHub', () => {
    
    const date = new Date()
    const campaignName = ref("")
    const campaignImages = ref<string[]>([])
    const campaignDescription = ref("")
    const numOfCreators = ref(1)
    const imageUrl = ref<File | null>(null)
    const fileUrl = ref<string>("");
    const closeDate = ref(new Date(date.setDate(date.getDate() + 1)));
    const contentApproval =  ref(new Date(date.setDate(date.getDate() + 7)));
    const startDate = ref(new Date(date.setDate(date.getDate() + 14)));
    const endDate = ref(new Date(date.setDate(date.getDate() + 21)));
    const companyName = ref("")
    const companyLinks = ref("")
    const brandInformation = ref("")
    const gender = ref("any")
    const niche = ref("any")
    const audienceRange = ref<string>("");
    const [min, max] = audienceRange.value.split(",");
    const audienceSizeMin = ref(min)
    const audienceSizeMax = ref(max)
    const platform = ref("instagram")
    const type = ref("")
    const quantity = ref()
    const hashtags = ref("")
    const captions = ref("")
    const numOfPosts = ref(1)

    const body = {
      "headline": campaignName.value,
      "description": campaignDescription.value,
      "contentType": [type.value],
      "platformType": platform.value,
      "applicationCloseDate": closeDate.value,
      "submissionDueDate": contentApproval.value,
      "startDate": startDate.value,
      "endDate": endDate.value,
      "numOfPosts": 3,
      "numOfCreators": numOfCreators.value,
      "images": [
        fileUrl.value
      ],
      "targetCreator": {
        "gender": gender.value,
        "ageRange": {
          "min": 0,
          "max": 0
        },
        "niche": [niche.value],
        "audienceSize": {
          "min": audienceSizeMin.value,
          "max": audienceSizeMax.value
        }
      },
      "compensation": {
        "isGift": true,
        "isMonetary": false,
        "price": null,
        "currency": null,
        "gift": "Free product samples"
      },
      "deliverable": {
        "requirements": {
          "dos": "Post at least 3 high-quality images",
          "donts": "Avoid using competitor products in the content"
        },
        "quantity": 5,
        "contentDescription": "High-quality product images and videos",
        "captions": [captions.value] ,
        "hashtags": [hashtags.value]
      },
      "brandInformation": {
        "companyName": companyName.value,
        "website": companyLinks.value,
        "brandInformation": brandInformation.value
      }
    }
    


  return { campaignName, campaignImages, campaignDescription, numOfCreators, closeDate, contentApproval, startDate, endDate, companyName, companyLinks, brandInformation, gender, niche, audienceSizeMin,audienceSizeMax , platform, type, quantity, imageUrl, fileUrl, audienceRange, captions, hashtags, numOfPosts }
}, {
  persist: true, // Enable persistence for this store
})
