
<script setup lang="ts">
import type { ResponseMessage,APIResponse, IPlatformProfile, PhylloResponse, GetResponse } from "types";
import PhylloWorkPlatforms from "../../../enums/pyhlloWorkPlatforms";
import { useToast } from "../../../components/ui/toast/use-toast";
import { get_creator_platform_profiles, getPhyllo } from "@/api/creator/platform/platform.creator";
import { Instagram,Facebook,Twitter, ChevronRight } from 'lucide-vue-next';
definePageMeta({
  layout: "dashboard",
  colorMode: "dark",
});

const apiUrl = useRuntimeConfig().public.API_URL as string;
const userStore = useUserStore();
const workPlatform = ref<string>("");
const empty = ref(false);
const connectedPlatforms = ref<IPlatformProfile[]>([]);
const accessToken = userStore.accessToken
const { toast } = useToast();
const loading = ref(false)
const linkRequests = ref<SocialVerification[]>([])
const socialUrl = ref<string>('')
const start = ref(true)
const otp = ref<string>()

const platforms = ref([
  {name:"instagram" ,active:true , icons:"/icons/Insta.svg" },
  {name:"facebook" ,active:true , icons:"/icons/twitter.svg"},
  {name:"tiktok",active:true , icons:"/icons/tiktok.svg"}
])

const link = computed({
  get: () => socialUrl.value || `https://${workPlatform.value}.com/yourhandle`,
  set: (val: string) => {
    socialUrl.value = val
  }
});
const error = ref('')

// Regular expressions for supported platforms
const platformRegex = {
  instagram: /^https:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.]+$/,
  twitter: /^https:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_]+$/,
  tiktok: /^https:\/\/(www\.)?tiktok\.com\/@[A-Za-z0-9_.]+$/,
  youtube: /^https:\/\/(www\.)?youtube\.com\/(c|@)[A-Za-z0-9_.-]+$/,
}

const handleNext =()=>{
  const input = socialUrl.value.trim();
  const platform = workPlatform.value;
  const regex = platformRegex[platform];

  if (!input) {
    error.value = 'Please enter a profile URL';
    return;
  }

  if (!regex) {
    error.value = 'Unsupported platform';
    return;
  }

  if (!regex.test(input)) {
    error.value = `Please enter a valid ${platform} profile URL`;
    return;
  }

  start.value=false

  error.value = '';
}


type SocialVerification = {
  _id: string;
  id: string;
  creatorProfileId: string;
  platform: "instagram" | string; 
  isVerified: boolean;
  otpExpiresAt: string; 
  isProcessed: boolean;
  status: string;
  createdAt: string;    
  updatedAt: string;    
  __v: number;
};


const activePlatforms = computed(() =>
  platforms.value.filter(platform => platform.active)
);

const fetchPlatformsAndRequests = async () => {
  if (!accessToken) return;

  loading.value = true;
  try {
    // Get connected profiles
    const [profilesRes, linkRequestsRes] = await Promise.all([
      get_creator_platform_profiles({ accessToken, apiUrl }),
      $fetch<APIResponse<'platformLinkRequests', SocialVerification[]>>(
        `${apiUrl}/platform/platform-link-request`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${userStore.accessToken}`,
          },
        }
      ),
    ]);

    // Update connected platforms
    connectedPlatforms.value = profilesRes;
    if (connectedPlatforms.value.length === 0) {
      empty.value = true;
    }

    // Update link requests
    linkRequests.value = linkRequestsRes.data.platformLinkRequests;

    // Combine all activated platforms
    const activated = new Set([
      ...connectedPlatforms.value.map((item) => item.workPlatform.toLowerCase()),
      ...linkRequests.value.map((item) => item.platform.toLowerCase()),
    ]);

    // Update platform states
    platforms.value = platforms.value.map((platform) => ({
      ...platform,
      active: !activated.has(platform.name.toLowerCase()),
    }));

  } catch (error) {
    toast({ title: "Can't retrieve platform data at this time" });
  } finally {
    loading.value = false;
  }
};


const linkAccount = async () => {
  

  try {
    const res = await $fetch<ResponseMessage>(`${apiUrl}/platform/platform-link-request`, {
      method: 'POST',
      body: {
        url:socialUrl.value.trim(),
        platform: workPlatform.value
      },
      headers: {
        Authorization: `Bearer ${userStore.accessToken}`
      }
      
    })

    toast({
      title: 'You’ve successfully applied to verify your account!',
      description: ''
    })
  } catch (error: any) {
    toast({ title: error?.data?.message || 'Something went wrong' })
  }finally{
    socialUrl.value = "";
  }
}

const verifyOtp =async(requestId:string)=>{

  try{
    const res = await $fetch<ResponseMessage>(`${apiUrl}/platform/platform-link-request/${requestId}/verify`, {
      method: 'POST',
      body: {
        otp:otp.value
      },
      headers: {
        Authorization: `Bearer ${userStore.accessToken}`
      }
      
    })

    toast({
      title: 'You’ve successfully applied to verify your account!',
      description: ''
    })
  }catch(error:any){
    toast({ title: error?.data?.message || 'Something went wrong' })
  }
}

watchEffect(async () => {
  await fetchPlatformsAndRequests();
});


</script>
<template>
  <div class="flex flex-col gap-12" >
    <div>
      <h1 class="text-xl font-bold">Platform {{ workPlatform }} </h1>
    </div>

    <div v-if="loading" class="w-full p-4 border rounded-xl shadow animate-pulse space-y-4">
      <div class="h-12 bg-gray-300 rounded w-3/4"></div>
      <div class="h-12 bg-gray-300 rounded w-full"></div>
      <div class="h-10 bg-gray-300 rounded w-full"></div>
     
    </div>


    <div v-else class="rounded-md border p-4 flex flex-col gap-4" >
      <h1 class="text-xl font-thin">Social links</h1>
      <div class="w-full md:w-2/3" >
        <h2 class="line">Add your social accounts to display them on your profile and your community profile once you’ve added an account, you can disconnect or stop displaying it at anytime.</h2>
      </div>
      <div v-for="(accounts,index) in connectedPlatforms" :key=index  class="border rounded-md flex flex-col gap-2 items-start p-2" >
        <div class="flex gap-1">
          <img :src="'/icons/' + accounts.workPlatform + '.svg'" :alt="accounts.workPlatform" class="h-6 w-6" />
          <div class="flex flex-col " >
            <p>{{ accounts.platformUsername }}</p>
            <p class="text-xs opacity-[56%]">{{ accounts.workPlatform }}</p>
          </div>
        </div>

        <div class="flex w-full justify-between px-6 flex-wrap">
          <div class="text-xs">
            <h2>Followers</h2>
            {{accounts.reputationFollowerCount}}
          </div>

          <div class="text-xs">
            <h2>Average Engagement</h2>
            {{accounts.engagementRate}}%
          </div>

          <div class="text-xs">
            <h2>Content count</h2>
            {{accounts.reputationContentCount}}
          </div>
        </div>
      </div>
      
      <div
        v-for="(platform, index) in linkRequests"
        :key="index"
        class="flex justify-between items-center p-2"
      >
       
        <p class="text-sm font-medium capitalize">{{ platform.platform }} <StatusSpan :status=platform.status />  </p>

         <Dialog>
          <DialogTrigger as-child>
            <Button class="rounded-md border text-xs px-3 py-1 hover:bg-purple1 transition" >
              Continue <ChevronRight/>
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-md">
            <DialogHeader>
              <DialogTitle  class="text-center" >Finish Verifying Your Account</DialogTitle>
              <DialogDescription>
               <p class="text-center">Paste the 6-digit code we sent to your DM</p>
              </DialogDescription>
            </DialogHeader>
            <div class="flex items-center flex-col gap-4 space-x-2">
              <div class="grid flex-1 gap-2 w-full">
                <Label for="code" class="">
                 Code
                </Label>
                <Input
                  id="code"
                  v-model="otp"
                  placeholder="12345"
                  read-only
                  maxlength="6"
                />
              </div>
              <p class="text-xs">Don't see a code? <span class="text-purple1 text-underline"> Check your DM or follow again</span></p>
              
            </div>
            <DialogFooter class="w-full">
              <DialogClose as-child class="w-full">
                <Button @click="verifyOtp(platform.id)" class="w-full btn-class" type="button" variant="secondary">
                  Verify Account
                </Button>
              </DialogClose>
            
            </DialogFooter>
          </DialogContent>
          
        </Dialog>
        
      </div>

      <div
        v-for="(platform, index) in activePlatforms"
        :key="index"
        class="flex justify-between items-center p-2"
      >
       
        <p class="text-sm font-medium capitalize">{{ platform.name }}</p>

         <Dialog>
          <DialogTrigger as-child>
            <Button @click="workPlatform = platform.name, start = true" class="rounded-md border text-xs px-6 py-1 hover:bg-purple1 transition" >
              Connect
            </Button>
          </DialogTrigger>
          <DialogContent v-if="start" class="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Connect Your Account</DialogTitle>
              <DialogDescription>
                Paste your profile link  so we can verify it belongs to you.
              </DialogDescription>
            </DialogHeader>
            <div class="flex items-center space-x-2">
              <div class="grid flex-1 gap-2">
                <Label for="link" class="sr-only">
                 Profile link
                </Label>
                 <Input
                    id="link"
                    v-model="link"
                    :class="error ? 'border-red-500' : ''"
                    :placeholder="`https://${workPlatform}.com/yourhandle`"
                  />
                 <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
              </div>
              
            </div>
            <DialogFooter class="flex gap-2 justify-end">
              <DialogClose as-child>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
               <Button @click="handleNext" > Next </Button>
            </DialogFooter>
          </DialogContent>
          <DialogContent class="text-center" v-else>
            <DialogHeader class="text-center">
              <DialogTitle> <p class="text-center">Let's cofirm it's you</p> </DialogTitle>
              <DialogDescription>
              <p class="text-center" > To verify ownership, follow our social accounts and get your unique verification code.</p>
              </DialogDescription>
              <div class="text-sm">
                <h1>Instruction List</h1>
                <ol class="flex flex-col gap-3">
                  <li>1.Follow <strong>@UseAktivate</strong> on Instagram.</li>
                  <li>2.You’ll receive a DM with a 6-digit code on Instagram.</li>
                  <li>3.Come back here and enter the code to verify your account.</li>
                </ol>
                <DialogClose class="w-full">
                  <Button @click="linkAccount"  class="btn-custom w-full mt-4 " >Get your code</Button>
                </DialogClose>
                 
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        
      </div>


    </div>



  </div>

</template>