import {
  getPlatformProfiles as fetchPlatformProfiles,
  getLinkRequests as fetchLinkRequests,
  postLinkRequests as createLinkRequest,
  verifyPlatform as submitPlatformVerification
} from "@/api/brand/platforms"
import type { platformLinkRequest, SocialPlatformProfile } from "types"

//deleted facebook from platforms
export const usePlatformsPage = () => {
  const queryClient = useQueryClient()
  const toast = useToast()
  const platforms = ref([
    { name: "instagram", active: true, icons: "/icons/Insta.svg" },
    { name: "tiktok", active: true, icons: "/icons/tiktok.svg" },
    { name: "x" , active:true, icons:"/icons/x.svg"}
  ])

  // 1. Get Link Requests
    const {
    data: linkRequestsData,
    isLoading: isLoadingLinkRequests,
    error: linkRequestsError,
    } = useQuery({
    queryKey: ['platform-link-requests'],
    queryFn: fetchLinkRequests,
    })

    // 2. Get Platform Profiles
    const {
    data: platformProfilesData,
    isLoading: isLoadingPlatformProfiles,
    error: platformProfilesError,
    } = useQuery({
    queryKey: ['platform-profiles'],
    queryFn: fetchPlatformProfiles,
    })

    const requests = computed(() => linkRequestsData.value?.platformLinkRequests || [])
    const socialProfiles = computed(() => platformProfilesData.value?.platformProfiles || [])

    const activated = computed(() => {
        return new Set([
        ...socialProfiles.value.map((item) => item.workPlatform.toLowerCase()),
        ...requests.value.map((item) => item.platform.toLowerCase()),
        ])
    })

    const updatedPlatforms = computed(() =>
        platforms.value.map((platform) => ({
        ...platform,
        active: !activated.value.has(platform.name.toLowerCase()),
        }))
    )

  // 3. Post Link Request
  const postLinkRequest = useMutation({
    mutationFn: async (payload: { platform: string; url: string }) => {
      console.log(payload)
      const res = await createLinkRequest(payload)
      return res.platformLinkRequests
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['platform-link-requests'] })
      queryClient.invalidateQueries({ queryKey: ['platform-profiles'] })
    },
    onError: (error:any)=>{
      toast.add({
      title: "Request failed ❌",
      description: error?.response?.data?.message || error?.message || "An unexpected error occurred.",
    });
    }
  })

  // 4. Verify Platform Link
  const verifyPlatform = useMutation({
    mutationFn: async (payload: { platformLinkRequestId: string; otp: string }) => {
        return await submitPlatformVerification(payload);
    },
    onSuccess: () => {
    toast.add({
        title: "Verified ✅",
        description: "Your platform has been successfully verified.",
        });
      queryClient.invalidateQueries({ queryKey: ['platform-link-requests'] })
      queryClient.invalidateQueries({ queryKey: ['platform-profiles'] })
    },
    onError: (error: any) => {
    toast.add({
      title: "Verification failed ❌",
      description: error?.response?.data?.message || error?.message || "An unexpected error occurred.",
    });
    console.error("Verification Error:", error);
  },
  })

  return {
    updatedPlatforms,
    isLoadingLinkRequests , 
    isLoadingPlatformProfiles,
    requests,
    socialProfiles,
    postLinkRequest,
    verifyPlatform,
  }
}
