<script setup lang="ts">
import { Instagram, Twitter, ChevronRight } from "lucide-vue-next";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
const toast = useToast();
definePageMeta({ layout: "dashboard" });

const workPlatform = ref<string>("");
const empty = ref(false);
const socialUrl = ref<string>("");
const start = ref(true);
const otp = ref<string>();
const error = ref("");
const username = ref("");

//leading @ removed but leaves others for edge cases
const cleanedUsername = computed(() => {
  return username.value.startsWith('@')
    ? username.value.replace(/^@/, '')
    : username.value;
});


const link = computed(() => {
  if (!username.value || !workPlatform.value) return '';
  return `https://${workPlatform.value.toLowerCase()}.com/${cleanedUsername.value}`;
});

const {
  isLoadingLinkRequests,
  isLoadingPlatformProfiles,
  socialProfiles,
  requests,
  postLinkRequest,
  verifyPlatform,
  updatedPlatforms: platforms,
} = usePlatformsPage();

const platformRegex = {
  instagram: /^https:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.]+\/?$/,
  twitter: /^https:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_]+\/?$/,
  tiktok: /^https:\/\/(www\.)?tiktok\.com\/[A-Za-z0-9_.]+\/?$/, // removed @
};

const otpZodSchema = zod.object({
  code: zod
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
});
const schema = toTypedSchema(otpZodSchema);

const verify = async (platformId: string, otp: string) => {
  const result = otpZodSchema.safeParse({ code: otp });
  if (!result.success) {
    toast.add({
      title: "Invalid OTP",
      description: "Please enter a valid 6-digit code.",
    });
    return;
  }

  verifyPlatform.mutate({ platformLinkRequestId: platformId, otp });
};

const postRequest = () => {
  postLinkRequest.mutate({
    platform: workPlatform.value,
    url: socialUrl.value,
  });
  
  postLinkRequest.mutate({ url: link.value, platform: workPlatform.value });
  console.log(username.value, workPlatform.value);
 
};
const handleNext = () => {
  const input = username.value.trim();
  const platform = workPlatform.value;

  if (!input) {
    error.value = "Please enter a profile URL";
    return;
  }

 
  start.value = false;
  error.value = "";
  };
 
const activePlatforms = computed(() =>
  platforms.value.filter((platform) => platform.active)

);
</script>

<template>
  <div class="flex flex-col gap-12">
    <div>
      <h1 class="text-xl font-bold">Platform</h1>
    </div>

    <div
      v-if="isLoadingLinkRequests || isLoadingPlatformProfiles"
      class="w-full p-4 border rounded-xl shadow animate-pulse space-y-4"
    >
      <div class="h-12 bg-gray-300 rounded w-3/4"></div>
      <div class="h-12 bg-gray-300 rounded w-full"></div>
      <div class="h-10 bg-gray-300 rounded w-full"></div>
    </div>

    <div v-else class="rounded-md border p-4 flex flex-col gap-4">
      <h1 class="text-xl font-thin">Social links {{ workPlatform }}</h1>
      <div class="w-full md:w-2/3">
        <h2 class="line">
          Add your social accounts to display them on your profile and your
          community profile once you’ve added an account, you can disconnect or
          stop displaying it at anytime.
        </h2>
      </div>
      <div
        v-for="(accounts, index) in socialProfiles"
        :key="index"
        class="border rounded-md flex flex-col gap-2 items-start p-2"
      >
        <div class="flex gap-1">
          <img
            src="/icons/Insta.svg"
            v-if="accounts.workPlatform == 'instagram'"
            class="h-6 w-6"
            alt=""
          />
          <img
            v-else
            :src="'/icons/' + accounts.workPlatform + '.svg'"
            :alt="accounts.workPlatform"
            class="h-6 w-6"
          />
          <div class="flex flex-col">
            <p>{{ accounts.platformUsername }}</p>
            <p class="text-xs opacity-[56%]">{{ accounts.workPlatform }}</p>
          </div>
        </div>

        <div class="flex w-full justify-between px-6 flex-wrap">
          <div class="text-xs">
            <h2>Followers</h2>
            {{ accounts.reputationFollowerCount }}
          </div>

          <div class="text-xs">
            <h2>Average Engagement</h2>
            {{ accounts.engagementRate }}%
          </div>

          <div class="text-xs">
            <h2>Content count</h2>
            {{ accounts.reputationContentCount }}
          </div>
        </div>
      </div>

      <div
        v-for="(platform, index) in requests"
        :key="index"
        class="flex justify-between items-center p-2"
      >
        <p class="text-sm font-medium capitalize">
          {{ platform.platform }} <StatusSpan :status="platform.status" />
        </p>

        <p v-if="platform.status == 'otp_verified'">Gathering account data</p>
        <Dialog>
          <DialogTrigger as-child>
            <Button
              v-if="platform.status != 'otp_verified'"
              class="rounded-md border text-xs px-3 py-1 hover:bg-purple1 transition"
            >
              Continue <ChevronRight />
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-md">
            <DialogHeader>
              <DialogTitle class="text-center"
                >Finish Verifying Your Account</DialogTitle
              >
              <DialogDescription>
                <p class="text-center">
                  Paste the 6-digit code we sent to your DM
                </p>
              </DialogDescription>
            </DialogHeader>
            <div class="flex items-center flex-col gap-4 space-x-2">
              <div class="grid flex-1 gap-2 w-full">
                <Label for="code" class=""> Code </Label>
                <Input
                  id="code"
                  v-model="otp"
                  placeholder="12345"
                  read-only
                  maxlength="6"
                />
              </div>
              <p class="text-xs">
                Don't see a code?
                <span class="text-purple1 text-underline">
                  Check your DM or follow again</span
                >
              </p>
            </div>
            <DialogFooter class="w-full">
              <DialogClose as-child class="w-full">
                <button @click="verify(platform.id, otp as string)">
                  <p>Verify</p>
                </button>
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
            <Button
              @click="(workPlatform = platform.name), (start = true)"
              class="rounded-md border text-xs px-6 py-1 hover:bg-purple1 transition"
            >
              Connect
            </Button>
          </DialogTrigger>
          <DialogContent v-if="start" class="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Connect Your Account</DialogTitle>
              <DialogDescription>
                Paste your profile link so we can verify it belongs to you.
              </DialogDescription>
            </DialogHeader>
            <div class="flex items-center space-x-2">
              <div class="grid flex-1 gap-2">
                <Label for="link" class="sr-only"> Profile link </Label>
                <Input
                  id="username"
                  v-model="username"
                  :class="error ? 'border-red-500' : ''"
                  :placeholder="`enter your username on ${workPlatform}`"
                />
                <p v-if="error" class="text-red-500 text-sm mt-1">
                  {{ error }}
                </p>
              </div>
            </div>
            <DialogFooter class="flex gap-2 justify-end">
              <DialogClose as-child>
                <Button type="button" variant="secondary"> Close </Button>
              </DialogClose>
              <Button @click="handleNext()"> Next </Button>
            </DialogFooter>
          </DialogContent>
          <DialogContent class="text-center" v-else>
            <DialogHeader class="text-center">
              <DialogTitle>
                <p class="text-center">Let's confirm it's you</p>
              </DialogTitle>
              <DialogDescription>
                <p class="text-center">
                  To verify ownership, follow our social accounts and get your
                  unique verification code.
                </p>
              </DialogDescription>
              <div class="text-sm">
                <h1>Instruction List</h1>
                <ol class="flex flex-col gap-3">
                  <li><!-- conditional render based on platform, check {{ workPlatform }} added the urls for each platform -->
                    <span v-if="workPlatform == 'instagram'"> 
                      1.Follow <a class="underline" href="https://www.instagram.com/useaktivate/">@useAktivate</a> and <a class="underline" href="https://www.instagram.com/aktivate.creators/">@aktivate.creators</a> on {{ workPlatform }}.
                    </span>
                    <span v-if="workPlatform == 'twitter'">
                      1.Follow <a class="underline" href="https://x.com/useaktivate">@useAktivate</a>and  on {{ workPlatform }}.
                    </span>
                    <span v-if="workPlatform == 'tiktok'">
                      1.Follow <a class="underline" href="https://www.tiktok.com/@useaktivate">@useAktivate</a>  on {{ workPlatform }}.
                    </span>
                  </li>
                  <li>2.You’ll receive a DM with a 6-digit code. This may take up to 24 - 72 hours to receive.</li>
                  <li>
                    3.Come back here and enter the code to verify your account.
                  </li>
                </ol>
                <DialogClose class="w-full">
                  <Button @click="postRequest()" class="btn-custom w-full mt-4"
                    >Get your code</Button
                  >
                </DialogClose>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  </div>
</template>
