import type {ICampaignForm} from "types"

export const useCampaignFormStore = defineStore('campaignFormStore', {

    state: (): ICampaignForm => ({
        headline: '',
        description: '',
        requirements: '',
        content_type: [],
        content_creator: [],
        media_type: [],
        start_date: new Date(),
        end_date: new Date(),
        amount_posts: ''
      }),

})