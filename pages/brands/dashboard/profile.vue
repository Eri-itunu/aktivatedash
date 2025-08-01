
<script setup lang="ts">
//imports
import { ref } from "vue";
import type { APIResponse, Tags, IUserProfile } from "types";
import { changeUserAvatar } from "@/api/brand/profile.brand";
import { getNiche } from "../../../api/creator/profile.creator";
import { useToast } from "../../../components/ui/toast/use-toast";
import {Pen, Plus} from 'lucide-vue-next';
import axios from "axios";
import { changePassword } from "@/api/auth/auth";
import { useBankServices } from "@/composables/useBankServices";
definePageMeta({
  layout: "light",
});



//variable declarations
const userProfile = ref<IUserProfile>({
      id: '',
      firstName: '',
      lastName: '',
      niche: [],
      email: '',
      bio: '',
      website: '',
      fullName: '',
      imgUrl: '',
      dateOfBirth: '',
      platformProfiles: []
})
const device = useDevice()
const isOpen = ref(false);
const isPass = ref(false);
const userStore = useUserStore();
const bio = ref();
const bioCopy = ref(bio)
const website = ref(userStore.userProfile?.website);
const userNiche = ref();
const isEmptyNiche = computed<boolean>(() => userNiche.value.length === 0);
const showSpinner = ref(false)
const file = ref<File | null>(null);
const { toast } = useToast();
const config = useRuntimeConfig();
const API_URL = config.public.API_URL;
const accessToken = userStore.accessToken || "";
const fileUrl = ref<string>("");
const formData = new FormData();
const imgUrl = ref<string | undefined>(userStore.userProfile?.imgUrl);
const profileImgUrl = computed<string>(() => userStore.userProfile?.imgUrl || "");
const dropdownSocials = ref(false);
const NicheList = ref<Tags[]>([]);
const currentPass = ref("")
const newPass = ref("")
const confirmPass = ref("")
const bioCount = computed(()=> bioCopy?.value?.length)



//helper functions
function dropSocial() {
  dropdownSocials.value = !dropdownSocials.value;
}

function togglePopUp() {
  isOpen.value = !isOpen.value;
}



//functions with api calls

async function getProfile() {
    try {
      showSpinner.value = true
      const token = accessToken;
      const res = await $fetch<APIResponse<'profile',IUserProfile>>(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}`}
      });

      userProfile.value = res.data.profile
      bio.value = userProfile.value.bio
      userNiche.value = userProfile.value.niche
      showSpinner.value = false
    } catch (error: any) {
      throw new Error(error.data?.message || "Something went wrong")
    }
  }

const onChangeFile = async (event: Event) => {
  showSpinner.value = true
  const files = (event.target as HTMLInputElement).files;
  if (!files) {
    return;
  }
  file.value = files[0];
  formData.append("file", file?.value);
  formData.append("type", "image");
  try {
    const res = await axios.post<APIResponse<"url", string>>(
      `${API_URL}/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": `multipart/form-data`,
        },
      }
    );
    fileUrl.value = res.data.data.url;
    await changeAvatar(fileUrl.value);
  } catch (error: any) {
    showSpinner.value = false
    throw new Error(error.data?.message || "Something went wrong")
    return;
  }
};

const changeAvatar = async (imageUrl: string) => {
  try {
    // const res = await axios.post<APIResponse<"message", string>>(
    //   `${API_URL}/profile/change-avatar`,
    //   { imageUrl },
    //   {
    //     headers: { Authorization: `Bearer ${accessToken}` },
    //   }
    // );

    const res = await changeUserAvatar({
      imageUrl:imageUrl,
      accessToken: accessToken,
      apiUrl: API_URL as string
    })

    imgUrl.value = imageUrl;
    await getProfile()
    toast({ title: "Avatar change successful" });
    showSpinner.value = false
  } catch (error: any) {
    showSpinner.value = false
    toast({ title: error.message ||"error uploading Avatar" });
    return;
  }
};

const getAllNiches = async () => {
  const res = await getNiche({
    apiUrl: API_URL,
    accessToken,
  });
  NicheList.value = res;
};

const updateProfile = async () => {
  if(bioCount.value && bioCount.value > 300){
    toast({title:"Bio longer than 300 characters assigned"})
    return
  }

  const body = {
    firstName: userStore.userProfile?.firstName,
    lastName: userStore.userProfile?.lastName,
    date_of_birth: userStore.userProfile?.dateOfBirth,
    website: website.value,
    bio: bioCopy?.value,
    niche: ["beauty"],
  };

  isOpen.value = false;
  try {
    await userStore.updateProfile(body);
    await getProfile();
    await userStore.getMe()
    toast({ title: "Profile Update Successful" });
  } catch (error: any) {
    toast({ title: "Error Updating Profile" });
  }
};

const newPassword = async () => {
  if(currentPass.value == '' || newPass.value == '' || confirmPass.value == ''){
    toast({ title: "Please fill in all the fields" });
    return
  }
  if(newPass.value != confirmPass.value){
    toast({ title: "Passwords do not match" });
    return
  }
  const body ={
    oldPassword: currentPass.value,
    newPassword: newPass.value,
    confirmPassword: confirmPass.value
  }

  try{
    const res = await changePassword({
      body,
      accessToken: accessToken,
      apiUrl: API_URL as string
    })
    isPass.value = false
    toast({title:"Password changed successfully"})
  }
  catch(error:any){
    toast({ title: error.message || "Error Changing Password please try again later" });
  }
}

const logout = async () => {
  try {
    await userStore.logout();
    navigateTo("/creator/login");
  } catch (error: any) {
    toast({ title: error.message });
  }
};

watchEffect(async () => {
  getAllNiches();
  await getProfile()
  await userStore.getProfile()

});
</script>

<template>

  <!--Loading spinner-->
  <div v-if="showSpinner" class="w-[100%] h-[100%] fixed top-0 right-0 left-0 bottom-0 z-50 bg-[#000000]/ flex justify-center items-center">
    <LoadSpinner />
  </div>



  <!--Desktop view-->
  <div v-if=" !showSpinner" class="flex  mt-8 flex-col md:flex-row gap-20">
    <div class="flex flex-col items-center justify-center gap-2">
      <div>
        <div
          v-if="userProfile.imgUrl === null"
          class="border-4 rounded-full justify-center flex items-center bg-purplelabel w-36 h-36"
        >

          <p class="text-4xl text-black font-bold">
            {{ userProfile?.firstName.charAt(0) }}
            {{ userProfile?.lastName?.charAt(0) }}

          </p>


        </div>
        <img
          v-else
          :src="userProfile.imgUrl"
          class="border-4 border-purple1 rounded-full items-center p-0.5 w-12 h-12 md:w-48 md:h-48 object-fit"
          alt=""
        />
      </div>

      <label for="upload">
        <p class="text-center cursor-pointer underline">Change Avatar</p>
        <input
          @change="onChangeFile"
          type="file"
          id="upload"
          style="display: none"
          accept="image/*"
        />
      </label>
    </div>

    <div class="mt-4 md:w-[500px] flex gap-5 flex-col">
      <h1 class="text-3xl">
        {{ userProfile?.firstName }} {{ userProfile?.lastName }}
      </h1>

      <div class="max-w-fit py-2 px-2 bg-[#1D192F] flex gap-4 items-center rounded-[100px] text-purplelabel">
        <img src="/icons/sms.svg" alt="" class="rounded-full bg-vDarkBlue p-2">
        Email : {{ userStore.user?.email ?? "N/A" }}
      </div>

      <div class="max-w-fit py-2 px-2 bg-[#1D192F] flex gap-4 items-center rounded-[100px] text-purplelabel">
        <img src="/icons/call.svg" alt="" class="rounded-full bg-vDarkBlue p-2">
        Phone Number : {{ userStore.user?.phone_number ?? "N/A" }}
      </div>
      <div>
        {{ userProfile.bio }}
      </div>
      <div class="flex flex-wrap gap-2">
         <div v-for="niche in userProfile.niche" :key="niche">
            <NicheCard :niche="niche" />
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        <CreatorUpdateProfile />

        <Dialog>
          <DialogTrigger>
            <button
              class="w-full rounded-[100px] px-4 py-2 bg-[#5331E8] text-white"
            >
              Change Password
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <p>Change Password</p>
              </DialogTitle>
              <DialogDescription>
                <div class="">
                  <div class="text-purplelabel px-4">
                    <p>Current Password</p>
                    <input
                      class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
                      type="text"
                      v-model="currentPass"
                    />

                    <p>New Password</p>
                    <input
                      class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
                      type="text"
                      v-model="newPass"
                    />

                    <p>Confirm Password</p>
                    <input
                      class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
                      type="text"
                      v-model="confirmPass"
                    />
                  </div>

                  <DialogTrigger class="w-full" >
                    <div class="px-4 flex items-center justify-center w-full">
                      <button @click="newPassword" class="w-full rounded-lg p-2">Change Password</button>
                    </div>
                  </DialogTrigger>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog> 
        
  
        <button @click="logout" class="rounded-[100px] px-4 py-2 bg-[#5331E8] text-white">
          Log out
        </button>
      </div>
    </div>



  </div>


</template>
