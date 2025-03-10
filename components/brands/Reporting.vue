
<script setup lang="ts">
import type { CreatorStats, ICampaign, ICampaignRequest, APIResponse, ContentSubmissions, IUserProfile } from "types";
import { useToast } from "../../components/ui/toast";
import axios from "axios";
import { FileSpreadsheet, CloudUpload, ArrowLeft } from 'lucide-vue-next';

const props = defineProps<{
    totalCampaignMetrics: {
     campaign_analytics: {
                campaign_id: string;
                id: string;
                cost: number;
                submissions: number;
                total_posts: string;
                like_count: string;
                comment_count: string;
                view_count: string;
                save_count: string;
                share_count: string;
                paid_impression_count: string;
                paid_reach: string;
                creator_count: string;
                total_engagement_rate: string;
                avg_engagement_rate: string;
                follwower_count: string;
            };
            creator_analytics: any[];
    };
    CampaignResults?: CreatorStats[];
    campaign: ICampaign;
    campaignId: string;
}>();

const userStore = useUserStore();
const accessToken = userStore.accessToken || "";
const API_URL = useRuntimeConfig().public.API_URL;
const { toast } = useToast();
const route = useRoute();
const selectedTab = ref('Campaign Summary');
const tabs = ref([
    { id: 1, tabs: 'Campaign Summary' },
    { id: 2, tabs: 'Creators' },
    { id: 3, tabs: 'Content' },
]);



onMounted(() => {
    // Component mounted logic if needed
});

watch(selectedTab, (newVal) => {
    // Watch tab changes if needed
});

const escapeCSVValue = (value) => {
    if (value === null || value === undefined) return '';
    const stringValue = String(value);
    if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
      return `"${stringValue.replace(/"/g, '""')}"`;  // Escape quotes and wrap in quotes
    }
    return stringValue;
};

const downloadCsv = async () => {
  try {
    if (! props.totalCampaignMetrics?.campaign_analytics) {
      throw new Error('Campaign analytics data is not available');
    }

    const analytics = props.totalCampaignMetrics.campaign_analytics;

    // Prepare campaign metrics data with safe value handling
    const campaignMetrics = {
      'Campaign Name': props.campaign?.headline || 'Untitled Campaign',
      'Total Creators': analytics.creator_count || '0',
      'Total Posts': analytics.total_posts || '0',
      'Campaign Cost': analytics.cost || '0',
      'Total Views': analytics.view_count || '0',
      'Total Likes': analytics.like_count || '0',
      'Total Comments': analytics.comment_count || '0',
      'Total Shares': analytics.share_count || '0',
      'Average Engagement Rate': (analytics.avg_engagement_rate || '0') + '%'
    };

    // Prepare creator analytics data with safe value handling
    const creatorRows = (props.totalCampaignMetrics.creator_analytics || []).map(creator => ({
      'Creator Name': creator.fullname || 'Unknown',
      'Username': creator.platformUsername || 'Unknown',
      'Platforms': (creator.work_platforms || []).join(', ') || 'N/A',
      'Followers': creator.follower_count || '0',
      'Engagement': (Number(creator.likes || 0) + Number(creator.comments || 0)).toString(),
      'Engagement Rate': (creator.engagementRate || '0') + '%',
      'Impressions': creator.paidImpressions || '0'
    }));

    // Convert campaign metrics to CSV rows with proper escaping
    let csvContent = Object.entries(campaignMetrics)
      .map(([key, value]) => `${escapeCSVValue(key)},${escapeCSVValue(value)}`)
      .join('\n');

    // Add separator between sections
    csvContent += '\n\nCreator Analytics\n';

    // Add creator analytics header
    if (creatorRows.length > 0) {
      csvContent += Object.keys(creatorRows[0]).join(',') + '\n';

      // Add creator rows
      csvContent += creatorRows
        .map(row => Object.values(row).join(','))
        .join('\n');
    }

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${props.campaign.headline}_campaign_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: 'Success',
      description: 'Campaign report downloaded successfully'
    });
  } catch (error) {
    console.error('Error downloading CSV:', error);
    toast({
      title: 'Error',
      description: 'Failed to download campaign report'
    });
  }
};
</script>

<template>
    <div class="font-[Work_Sans] p-6 flex flex-col gap-6 min-h-screen bg-gray-50 dark:bg-[#090618]" style="font-family: 'Work Sans', sans-serif;">
        <!-- Header Section -->
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent hover:from-purple-500 hover:to-blue-400 transition-all duration-300 transform hover:scale-[1.02] dark:from-purple-400 dark:to-blue-300 tracking-tight">{{ campaign?.headline }} </h1>
            <div class="print-export flex gap-4">
                <BrandsPdfDownloader :campaign="campaign" :total-campaign-metrics="totalCampaignMetrics" />
                <button @click="downloadCsv" class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#CDC2FF] border-2 border-[#CDC2FF] rounded-lg hover:bg-[#CDC2FF] hover:text-[#090618] transition-colors">
                    <CloudUpload class="h-4 w-4" /> Export CSV
                </button>
            </div>
        </div>

        <!-- Key Metrics Grid -->
        <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div class="bg-white dark:bg-[#090618] rounded-xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow duration-200 border border-transparent hover:border-[#CDC2FF] dark:hover:border-[#1D192F]">
                <span class="text-sm font-medium text-[#98A2B3] dark:text-[#CDC2FF]">Creators</span>
                <span class="text-3xl font-semibold text-black dark:text-white font-[Work_Sans]">{{ totalCampaignMetrics?.campaign_analytics?.creator_count || 0 }}</span>
            </div>
            <div class="bg-white dark:bg-[#090618] rounded-xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow duration-200 border border-transparent hover:border-[#CDC2FF] dark:hover:border-[#1D192F]">
                <span class="text-sm font-medium text-[#98A2B3] dark:text-[#CDC2FF]">Total Posts</span>
                <span class="text-3xl font-semibold text-black dark:text-white font-[Work_Sans]">{{ totalCampaignMetrics?.campaign_analytics?.total_posts || 0 }}</span>
            </div>
            <div class="bg-white dark:bg-[#090618] rounded-xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow duration-200 border border-transparent hover:border-[#CDC2FF] dark:hover:border-[#1D192F]">
                <span class="text-sm font-medium text-[#98A2B3] dark:text-[#CDC2FF]">Campaign Cost</span>
                <span class="text-3xl font-semibold text-black dark:text-white font-[Work_Sans]">₦{{ totalCampaignMetrics?.campaign_analytics?.cost?.toLocaleString() || 0 }}</span>
            </div>
            <div class="bg-white dark:bg-[#090618] rounded-xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow duration-200 border border-transparent hover:border-[#CDC2FF] dark:hover:border-[#1D192F]">
                <span class="text-sm font-medium text-[#98A2B3] dark:text-[#CDC2FF]">Total Engagement</span>
                <span class="text-3xl font-semibold text-black dark:text-white font-[Work_Sans]">{{ (Number(totalCampaignMetrics?.campaign_analytics?.like_count ?? 0) + Number(totalCampaignMetrics?.campaign_analytics?.comment_count ?? 0))?.toLocaleString() ?? 0 }}</span>
            </div>
            <div class="bg-white dark:bg-[#090618] rounded-xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow duration-200 border border-transparent hover:border-[#CDC2FF] dark:hover:border-[#1D192F]">
                <span class="text-sm font-medium text-[#98A2B3] dark:text-[#CDC2FF]">Avg Engagement Rate</span>
                <span class="text-3xl font-semibold text-black dark:text-white font-[Work_Sans]">{{ totalCampaignMetrics?.campaign_analytics?.avg_engagement_rate || '0.00' }}%</span>
            </div>
        </div>

        <!-- Additional Metrics Grid -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="bg-white dark:bg-[#090618] rounded-xl p-6 flex flex-col gap-2 shadow-sm">
                <span class="text-sm font-medium text-[#98A2B3] dark:text-[#CDC2FF]">Views</span>
                <span class="text-3xl font-semibold text-black dark:text-white">{{ Number(totalCampaignMetrics?.campaign_analytics?.view_count ?? 0)?.toLocaleString() || 0 }}</span>
            </div>
            <div class="bg-white dark:bg-[#090618] rounded-xl p-6 flex flex-col gap-2 shadow-sm">
                <span class="text-sm font-medium text-[#98A2B3] dark:text-[#CDC2FF]">Likes</span>
                <span class="text-3xl font-semibold text-black dark:text-white">{{ Number(totalCampaignMetrics?.campaign_analytics?.like_count ?? 0)?.toLocaleString() || 0 }}</span>
            </div>
            <div class="bg-white dark:bg-[#090618] rounded-xl p-6 flex flex-col gap-2 shadow-sm">
                <span class="text-sm font-medium text-[#98A2B3] dark:text-[#CDC2FF]">Comments</span>
                <span class="text-3xl font-semibold text-black dark:text-white">{{ Number(totalCampaignMetrics?.campaign_analytics?.comment_count ?? 0)?.toLocaleString() || 0 }}</span>
            </div>
            <div class="bg-white dark:bg-[#090618] rounded-xl p-6 flex flex-col gap-2 shadow-sm">
                <span class="text-sm font-medium text-[#98A2B3] dark:text-[#CDC2FF]">Shares</span>
                <span class="text-3xl font-semibold text-black dark:text-white">{{ Number(totalCampaignMetrics?.campaign_analytics?.share_count ?? 0)?.toLocaleString() || 0 }}</span>
            </div>
        </div>

        <!-- Tabs Section -->
        <section class="border-b border-[#1D192F]">
            <div class="flex space-x-12">
                <button
                    v-for="tab in tabs"
                    :key="tab.id"
                    @click="selectedTab = tab.tabs"
                    class="px-8 py-4 text-base font-medium transition-colors relative"
                    :class="selectedTab === tab.tabs ? 'text-purple-500' : 'text-gray-500 hover:text-gray-700'"
                >
                    {{ tab.tabs }}
                    <div
                        v-if="selectedTab === tab.tabs"
                        class="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"
                    />
                </button>
            </div>
        </section>

           <!-- Campaign Summary Section -->
        <div v-if="selectedTab === 'Campaign Summary' && campaign" class="flex flex-col gap-6">
            <!-- Campaign Details Section -->
            <div class="bg-white dark:bg-[#090618] rounded-xl p-6 shadow-sm">
                <h2 class="text-xl font-semibold text-black dark:text-white mb-4">Campaign Details</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="flex flex-col gap-2">
                        <span class="text-sm text-[#98A2B3]">Campaign Start</span>
                        <span class="text-base text-black dark:text-white">{{ formatDate(campaign.startDate) }}</span>
                    </div>
                    <div class="flex flex-col gap-2">
                        <span class="text-sm text-[#98A2B3]">Campaign End</span>
                        <span class="text-base text-black dark:text-white">{{ formatDate(campaign.endDate) }}</span>
                    </div>
                    <div class="flex flex-col gap-2">
                        <span class="text-sm text-[#98A2B3]">Content Type</span>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="content in campaign.deliverables.contentType" :key="content" class="px-3 py-1 bg-[#F5F5F5] dark:bg-[#1D192F] rounded-full text-sm text-black dark:text-white">{{ content }}</span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2">
                        <span class="text-sm text-[#98A2B3]">Platforms</span>
                        <div class="flex gap-2">
                            <img v-for="platform in campaign.deliverables.platform" :key="platform" :src="`/icons/${platform.toLowerCase()}.svg`" :alt="platform" class="w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Campaign Description Section -->
            <div class="bg-white dark:bg-[#090618] rounded-xl p-6 shadow-sm">
                <h2 class="text-xl font-semibold text-black dark:text-white mb-4">Campaign Description</h2>
                <p class="text-base text-[#98A2B3] whitespace-pre-wrap">{{ campaign.description }}</p>
            </div>

            <!-- Campaign Requirements Section -->
            <div class="bg-white dark:bg-[#090618] rounded-xl p-6 shadow-sm">
                <h2 class="text-xl font-semibold text-black dark:text-white mb-4">Campaign Requirements</h2>
                <p class="text-base text-[#98A2B3] whitespace-pre-wrap">{{ campaign.deliverables.requirements }}</p>
            </div>
        </div>

        <!-- Creators Section -->
        <div v-if="selectedTab === 'Creators'" class="flex flex-col gap-6">
            <div v-if="!totalCampaignMetrics.creator_analytics.length" class="text-center py-8 text-lg text-black dark:text-white">
                No creators have uploaded content yet
            </div>
            <div v-else>
                <div class="overflow-x-auto shadow-md rounded-lg">
                    <table class="w-full text-sm border-separate border-spacing-0">
                        <thead class="bg-white dark:bg-darkBlue">
                            <tr>
                                <th class="py-4 px-6 text-left text-[#CDC2FF] font-medium">Creators</th>
                                <th class="py-4 px-6 text-left text-[#CDC2FF] font-medium">Followers</th>
                                <th class="py-4 px-6 text-left text-[#CDC2FF] font-medium">Engagement</th>
                                <th class="py-4 px-6 text-left text-[#CDC2FF] font-medium">Engagement Rate</th>
                                <th class="py-4 px-6 text-left text-[#CDC2FF] font-medium">Impressions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="creator in totalCampaignMetrics.creator_analytics" :key="creator.creatorProfileId" class="border-b border-[#1D192F] hover:bg-gray-50 dark:hover:bg-[#1D192F] transition-colors">
                                <td class="py-4 px-6">
                                    <div class="flex flex-col">
                                        <span class="text-black dark:text-white font-medium">{{ creator.fullname }}</span>
                                        <span class="text-[#98A2B3] text-sm">@{{ creator.platformUsername }}</span>
                                        <div class="flex gap-2 mt-1">
                                            <img v-for="platform in creator.work_platforms" :key="platform" :src="`/icons/${platform}.svg`" :alt="platform" class="w-4 h-4" />
                                        </div>
                                    </div>
                                </td>
                                <td class="py-4 px-6 text-black dark:text-white">{{ Number(creator?.follower_count).toLocaleString()?? 'N/A' }}</td>
                                <td class="py-4 px-6 text-black dark:text-white">{{ (Number(creator.likes) + Number(creator.comments)).toLocaleString() }}</td>
                                <td class="py-4 px-6 text-black dark:text-white">{{ creator.engagementRate }}%</td>
                                <td class="py-4 px-6 text-black dark:text-white">{{ Number(creator.paidImpressions).toLocaleString() }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- Content Section -->
        <div v-if="selectedTab === 'Content'" class="flex flex-col gap-8 min-h-[100px]">
            <div v-if="!totalCampaignMetrics.creator_analytics.length" class="text-center py-12 text-lg text-black dark:text-white">
                <p>No creators have uploaded content yet</p>
            </div>
            <div v-else class="grid md:grid-cols-3 grid-cols-1 gap-8">
                <div v-for="creator in totalCampaignMetrics.creator_analytics" :key="creator.creatorProfileId" class="bg-white dark:bg-[#090618] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 border border-transparent hover:border-[#CDC2FF] dark:hover:border-[#1D192F]">
                    <div class="flex flex-col">
                        <div class="p-6 border-b border-gray-100 dark:border-[#1D192F]">
                            <div class="flex items-center justify-between mb-3">
                                <div class="flex items-center gap-3">
                                    <span class="text-black dark:text-white font-medium text-lg">@{{ creator.platformUsername }}</span>
                                    <div class="flex gap-2">
                                        <img v-for="platform in creator.work_platforms" :key="platform" :src="`/icons/${platform}.svg`" :alt="platform" class="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                            <p class="text-base text-[#98A2B3] line-clamp-2">{{ creator.fullname }}</p>
                        </div>
                        <div class="relative group min-h-[400px]">
                            <SocialEmbed
                                v-if="creator.url"
                                :platform="creator.work_platforms[0]"
                                :url="creator.url"
                                class="w-full h-full object-cover"
                            />
                            <div v-else class="flex items-center justify-center h-full bg-gray-100 dark:bg-[#1D192F] rounded-lg p-8">
                                <p class="text-base text-gray-500 dark:text-gray-400">No content uploaded yet</p>
                            </div>
                            <a v-if="creator.url" :href="creator.url" target="_blank" rel="noopener noreferrer" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <button class="px-6 py-3 bg-[#CDC2FF] text-[#090618] rounded-lg hover:bg-opacity-90 transition-colors text-base font-medium">
                                    View Post
                                </button>
                            </a>
                        </div>
                        <div class="p-6 flex flex-col gap-4">
                            <div class="flex justify-between items-center text-base">
                                <div class="flex items-center gap-6">
                                    <span class="flex items-center gap-2 text-[#98A2B3]">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        {{ Number(creator.likes).toLocaleString() }}
                                    </span>
                                    <span class="flex items-center gap-2 text-[#98A2B3]">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        {{ Number(creator.comments).toLocaleString() }}
                                    </span>
                                </div>
                                <span class="text-[#CDC2FF] text-base font-medium">{{ creator.engagementRate }}% ER</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@media print {
    .print-body {
        color: black;
    }

    .tab-section, .print-export {
        display: none;
    }
}

.instagram-media, .tiktok-embed {
    margin: 0 auto !important;
    min-width: unset !important;
    max-width: 100% !important;
    width: 100% !important;
}

.group:hover .group-hover\:opacity-100 {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7));
    transition: all 0.3s ease-in-out;
}
</style>
