<script setup lang="ts">
import html2pdf from "html2pdf.js";
import type { ICampaign } from "types";
import { useToast } from "../../components/ui/toast";
import { FileSpreadsheet, FileText } from 'lucide-vue-next';

const props = defineProps<{
    campaign: ICampaign;
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
}>();

const { toast } = useToast();

const formatDate = (dateString: string) => {
    if (!dateString) return "Invalid Date";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
};

const exportToPDF = async () => {
    try {
        const element = document.createElement('div');
        element.classList.add('pdf-content');

        // Add print styles
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            @media print {
                body {
                    font-family: 'Work Sans', sans-serif;
                    color: #000;
                    background: #fff;
                }
            }
        `;
        element.appendChild(styleElement);

        // Front Page
        element.innerHTML = `
            <div class="front-page">
                <div class="logo-container">
                   <svg width="160" height="40" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32.18 0H37.54C37.54 0 37.54 0 37.54 0C38.76 0 39.92 0.48 40.8 1.36C41.68 2.24 42.16 3.4 42.16 4.62V4.62C42.16 5.84 41.68 7 40.8 7.88C39.92 8.76 38.76 9.24 37.54 9.24H35.86V15.14H32.18V0Z" fill="#FF0033"/>
    <path d="M35.86 5.56H37.54C37.54 5.56 37.54 5.56 37.54 5.56C37.82 5.56 38.1 5.46 38.32 5.24C38.54 5.02 38.64 4.74 38.64 4.46V4.46C38.64 4.18 38.54 3.9 38.32 3.68C38.1 3.46 37.82 3.36 37.54 3.36H35.86V5.56Z" fill="white"/>
    <path d="M52.58 0H56.26V9.24H61.62V0H65.3V15.14H61.62V12.92H56.26V15.14H52.58V0Z" fill="#FF0033"/>
    <path d="M71.94 0H75.62V12.92H80.98V15.14H71.94V0Z" fill="#FF0033"/>
    <path d="M87.62 0H91.3V12.92H96.66V15.14H87.62V0Z" fill="#FF0033"/>
    <path d="M103.3 0H106.98V9.24H112.34V0H116.02V15.14H112.34V12.92H106.98V15.14H103.3V0Z" fill="#FF0033"/>
    <path d="M122.66 0H126.34V12.92H131.7V15.14H122.66V0Z" fill="#FF0033"/>
    <path d="M149.38 0H153.06V9.24H158.42V0H160V15.14H153.06V15.14H149.38V0Z" fill="#FF0033"/>
    <path d="M0 10H7.22C7.22 10 7.22 10 7.22 10C9.66 10 11.92 11.02 13.54 12.64C15.16 14.26 16.18 16.52 16.18 18.96V18.96C16.18 21.4 15.16 23.66 13.54 25.28C11.92 26.9 9.66 27.92 7.22 27.92H0V10Z" fill="#FF0033"/>
    <path d="M3.68 14.44H7.22C7.22 14.44 7.22 14.44 7.22 14.44C8.44 14.44 9.6 14.92 10.48 15.8C11.36 16.68 11.84 17.84 11.84 19.06V19.06C11.84 20.28 11.36 21.44 10.48 22.32C9.6 23.2 8.44 23.68 7.22 23.68H3.68V14.44Z" fill="white"/>
    <path d="M19.86 10H27.08C27.08 10 27.08 10 27.08 10C29.52 10 31.78 11.02 33.4 12.64C35.02 14.26 36.04 16.52 36.04 18.96V18.96C36.04 21.4 35.02 23.66 33.4 25.28C31.78 26.9 29.52 27.92 27.08 27.92H19.86V10Z" fill="#FF0033"/>
    <path d="M23.54 14.44H27.08C27.08 14.44 27.08 14.44 27.08 14.44C28.3 14.44 29.46 14.92 30.34 15.8C31.22 16.68 31.7 17.84 31.7 19.06V19.06C31.7 20.28 31.22 21.44 30.34 22.32C29.46 23.2 28.3 23.68 27.08 23.68H23.54V14.44Z" fill="white"/>
    <path d="M52.58 22.78H56.26V31.02H61.62V22.78H65.3V37.92H61.62V35.7H56.26V37.92H52.58V22.78Z" fill="#FF0033"/>
    <path d="M71.94 22.78H75.62V35.7H80.98V37.92H71.94V22.78Z" fill="#FF0033"/>
    <path d="M87.62 22.78H91.3V35.7H96.66V37.92H87.62V22.78Z" fill="#FF0033"/>
    <path d="M103.3 22.78H106.98V31.02H112.34V22.78H116.02V37.92H112.34V35.7H106.98V37.92H103.3V22.78Z" fill="#FF0033"/>
    <path d="M122.66 22.78H126.34V35.7H131.7V37.92H122.66V22.78Z" fill="#FF0033"/>
    <path d="M138.34 22.78H142.02V31.02H147.38V22.78H151.06V37.92H147.38V35.7H142.02V37.92H138.34V22.78Z" fill="#FF0033"/>
</svg>
                    <span class="logo-text">AKTIVATE</span>
                </div>
                <div class="campaign-title">
                    <h1>${props.campaign.headline}</h1>
                    <p class="campaign-duration">Campaign Duration: ${formatDate(props.campaign.startDate)} - ${formatDate(props.campaign.endDate)}</p>
                </div>
            </div>

            <div class="page-break"></div>

            <div class="executive-summary">
                <h2>Executive Summary</h2>
                <div class="key-results">
                    <div class="metric-box">
                        <span class="metric-value">${props.totalCampaignMetrics.campaign_analytics.creator_count}</span>
                        <span class="metric-label">Creators</span>
                    </div>
                    <div class="metric-box">
                        <span class="metric-value">${props.totalCampaignMetrics.campaign_analytics.total_posts}</span>
                        <span class="metric-label">Content</span>
                    </div>
                    <div class="metric-box">
                        <span class="metric-value">N${props.totalCampaignMetrics.campaign_analytics.cost}</span>
                        <span class="metric-label">Budget</span>
                    </div>
                    <div class="metric-box">
                        <span class="metric-value">${props.totalCampaignMetrics.campaign_analytics.like_count}</span>
                        <span class="metric-label">Engagement</span>
                    </div>
                    <div class="metric-box">
                        <span class="metric-value">${props.totalCampaignMetrics.campaign_analytics.total_engagement_rate}%</span>
                        <span class="metric-label">Engagement rate</span>
                    </div>
                    <div class="metric-box">
                        <span class="metric-value">${props.totalCampaignMetrics.campaign_analytics.view_count}</span>
                        <span class="metric-label">Impressions</span>
                    </div>
                </div>
            </div>

            <div class="page-break"></div>
            <div class="metrics-section">
                <h2>Campaign Performance</h2>
                <div class="key-results">
                    <div class="metric-box">
                        <span class="metric-value">${props.totalCampaignMetrics.campaign_analytics.total_posts}</span>
                        <span class="metric-label">Total Posts</span>
                    </div>
                    <div class="metric-box">
                        <span class="metric-value">${props.totalCampaignMetrics.campaign_analytics.total_engagement_rate}%</span>
                        <span class="metric-label">Total Engagement Rate</span>
                    </div>
                    <div class="metric-box">
                        <span class="metric-value">${props.totalCampaignMetrics.campaign_analytics.view_count}</span>
                        <span class="metric-label">Total Views</span>
                    </div>
                    <div class="metric-box">
                        <span class="metric-value">${props.totalCampaignMetrics.campaign_analytics.like_count}</span>
                        <span class="metric-label">Total Likes</span>
                    </div>
                    <div class="metric-box">
                        <span class="metric-value">${props.totalCampaignMetrics.campaign_analytics.comment_count}</span>
                        <span class="metric-label">Total Comments</span>
                    </div>
                    <div class="metric-box">
                        <span class="metric-value">${props.totalCampaignMetrics.campaign_analytics.share_count}</span>
                        <span class="metric-label">Total Shares</span>
                    </div>
                </div>
            </div>

            <div class="page-break"></div>

            <div class="creator-section">
                <h2>Creators</h2>
                <div class="creator-table">
                    <div class="table-header">
                        <div class="header-cell">Creators</div>
                        <div class="header-cell">Followers</div>
                        <div class="header-cell">Engagement</div>
                        <div class="header-cell">Platform</div>
                    </div>
                    ${props.totalCampaignMetrics.creator_analytics.map(creator => `
                        <div class="table-row">
                            <div class="table-cell">${creator.platformUsername || 'Creator'}</div>
                            <div class="table-cell">${creator.follower_count || '0'}</div>
                            <div class="table-cell">${creator.engagement_rate || '0'}%</div>
                            <div class="table-cell platform-icons">
                                ${creator.platform === 'instagram' ? 'Instagram' : 'Instagram'}
                                ${creator.platform === 'tiktok' ? 'TikTok' : 'TikTok'}
                                ${creator.platform === 'facebook' ? 'Facebook' : 'Facebook'}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        const opt = {
            margin: 1,
            filename: `${props.campaign.headline}_report.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        await html2pdf().from(element).set(opt).save();
    } catch (error) {
        toast({ title: "Error generating PDF" });
    }
};
</script>

<template>
    <button @click="exportToPDF" class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#CDC2FF] border-2 border-[#CDC2FF] rounded-lg hover:bg-[#CDC2FF] hover:text-black transition-colors">
        <FileText class="h-4 w-4" /> Export PDF
    </button>
</template>

<style>
.pdf-content {
    font-family: 'Work Sans', sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    color: black;
}

.campaign-header {
    text-align: center;
    margin-bottom: 30px;
    color: black;
}

.metrics-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 30px;
}

.metric-item {
    padding: 15px;
    border: 1px solid #CDC2FF;
    border-radius: 8px;
    text-align: center;
    color: black;
}

.creator-section {
    margin-top: 30px;
    padding: 20px;
}

.creator-section h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: black;
}

.creator-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin: 20px 0;
}

.table-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    background-color: #f8f9fa;
    padding: 12px;
    border-bottom: 1px solid #e9ecef;
}

.table-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    padding: 12px;
    border-bottom: 1px solid #e9ecef;
    transition: background-color 0.2s ease;
}

.table-row:hover {
    background-color: #f8f9fa;
}

.header-cell {
    font-size: 14px;
    font-weight: 600;
    color: #495057;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.table-cell {
    font-size: 14px;
    color: #495057;
    display: flex;
    align-items: center;
    gap: 8px;
}

.platform-icons {
    display: flex;
    gap: 8px;
    align-items: center;
}

.platform-icon {
    width: 20px;
    height: 20px;
    object-fit: contain;
}

.front-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 40px;
    background-color: white;
}

.front-page .logo-container {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 60px;
}

.front-page .logo {
    width: 200px;
}

.front-page .logo-text {
    font-size: 32px;
    font-weight: 600;
    color: #000;
}

.campaign-title {
    text-align: center;
}

.campaign-title h1 {
    font-size: 36px;
    font-weight: 600;
    color: #000;
    margin-bottom: 20px;
}

.campaign-duration {
    font-size: 18px;
    color: #666;
}

.executive-summary {
    padding: 40px;
    margin-bottom: 30px;
}

.executive-summary h2 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 30px;
    color: black;
    padding-bottom: 20px;
}

.key-results {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 20px;
}

.metric-box {
    padding: 20px;
    border: 1px solid #CDC2FF;
    border-radius: 8px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.metric-value {
    font-size: 24px;
    font-weight: 600;
    color: black;
}

.metric-label {
    font-size: 14px;
    color: #666;
}

.page-break {
    page-break-after: always;
}
.metrics-section {
    margin: 40px 0;
    padding: 20px;
    background-color: white;
}

.metrics-section h2 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #333;
}

.metrics-section .key-results {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 20px;
}

.metrics-section .metric-box {
    background-color: #f8f8f8;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.metrics-section .metric-value {
    display: block;
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
}

.metrics-section .metric-label {
    display: block;
    font-size: 14px;
    color: #666;
    text-transform: uppercase;
}
</style>
