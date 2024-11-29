// stores/darkModeStore.ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import persistedState from 'pinia-plugin-persistedstate'

export const useCollabHubStore = defineStore('collabHub', () => {
    
    const date = new Date()
    const campaignName = ref("")
    const campaignImages = ref<string[]>([])
    const campaignDescription = ref("")
    const numOfCreators = ref()
    const closeDate = ref(new Date(date.setDate(date.getDate() + 1)));
    const contentApproval =  ref(new Date(date.setDate(date.getDate() + 7)));
    const startDate = ref(new Date(date.setDate(date.getDate() + 14)));
    const endDate = ref(new Date(date.setDate(date.getDate() + 21)));
    const companyName = ref("")
    const companyLinks = ref<string[]>([])
    const brandInformation = ref("")
    const gender = ref("")
    const niche = ref("")
    const audienceSize = ref("")
    const platform = ref("instagram")
    const type = ref("")
    const quantity = ref()


  return { campaignName, campaignImages, campaignDescription, numOfCreators, closeDate, contentApproval, startDate, endDate, companyName, companyLinks, brandInformation, gender, niche, audienceSize, platform, type, quantity }
}, {
  persist: true, // Enable persistence for this store
})
