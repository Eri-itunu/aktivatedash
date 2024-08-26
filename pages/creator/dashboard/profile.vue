<script setup lang="ts">
//imports
import { ref } from "vue";
import type { APIResponse, Tags } from "types";
import { changeUserAvatar } from "@/api/brand/profile.brand";
import { getNiche } from "../../../api/creator/profile.creator";
import { useToast } from "../../../components/ui/toast/use-toast";
import {Pen} from 'lucide-vue-next';
import axios from "axios";
import { changePassword } from "@/api/auth/auth";

definePageMeta({
  layout: "dashboard",
});

//variable declarations
const device = useDevice()
const isOpen = ref(false);
const isPass = ref(false);
const userStore = useUserStore();
const bio = ref(userStore.userProfile?.bio);
const website = ref(userStore.userProfile?.website);
const userNiche = ref(userStore.userProfile?.niche || []);
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
const currentPass = ref()
const newPass = ref()
const confirmPass = ref()

//helper functions
function dropSocial() {
  dropdownSocials.value = !dropdownSocials.value;
}



//functions with api calls
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
      apiUrl: API_URL
    })

    imgUrl.value = imageUrl;
    toast({ title: "Avatar change succesful" });
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
  const body = {
    firstName: userStore.userProfile?.firstName,
    lastName: userStore.userProfile?.lastName,
    date_of_birth: userStore.userProfile?.dateOfBirth,
    website: website.value,
    bio: bio.value,
    niche: userNiche.value,
  };

  isOpen.value = false;
  try {
    await userStore.updateProfile(body);
    toast({ title: "Profile Update Successful" });
  } catch (error: any) {
    toast({ title: "Error Updating Profile" });
  }
};

const newPassword = async () => {
  if(!currentPass || !newPass ||!confirmPass){
    toast({ title: "Please fill in all the fields" });
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
      apiUrl: API_URL
    })
    isPass.value = false
    toast({title:"Password changed succesfully"})
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

});
</script>

<template>

  <!--Loading spinner-->
  <div v-if="showSpinner" class="w-[100%] h-[100%] fixed top-0 right-0 left-0 bottom-0 z-50 bg-[#000000]/ flex justify-center items-center">
    <LoadSpinner />
  </div>

  <!--Mobile views-->
  <div v-if="device.isMobile" class=" flex flex-col gap-4  pt-4 text-black">
    <div class=" border-b-2 border-[#E4E7EC]">
      <div class="px-4 flex flex-col gap-2 py-4" >
        <div>
          <div
            v-if="profileImgUrl === ''"
            class="border-2 rounded-full justify-center flex items-center bg-purplelabel w-12 h-12"
          >
            <p class="text-sm text-black font-bold">
              {{ userStore.userProfile?.firstName?.charAt(0) }}
              {{ userStore.userProfile?.lastName?.charAt(0) }}

            </p>

          
          </div>
          <img
            v-else
            :src="imgUrl"
            class="border-[0.5px] border-purple1 rounded-full items-center p-0.5 w-12 h-12 object-fit"
            alt=""
          />
        </div>
        <div class="flex justify-between items-center">
          <h1 class="font-bold" >{{ userStore.userProfile?.firstName }} {{ userStore.userProfile?.lastName }}</h1>

        </div>

        <div class=" flex flex-col text black">
          <div class="flex justify-between items-center">
            <h1 class="font-bold" >About</h1>
            <Sheet class="bg-white">
              <SheetTrigger><Pen class="h-5 w-5" /></SheetTrigger>
              <SheetContent side="bottom" class="bg-white text-black py-8 rounded-t-lg">
                <SheetHeader>
                  <SheetTitle><h1 class='text-black' >Edit about</h1></SheetTitle>
                  <textarea class=" border-[0.5px] border-[#414243] p-2 rounded bg-transparent" rows="10" name="" id="" 
                    placeholder="Write  about yourself" v-model="bio"
                  >

                  </textarea>
                </SheetHeader>
                <SheetFooter>
                 
                  <SheetClose class="w-full pt-4" >
                    <Button @click="updateProfile" class="text-white bg-purple1 px-8 py-2 w-full rounded-lg" variant="outline">
                      Save
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>

          <p class="text-[#475367]">
            {{bio}}
          </p>
        </div>

        <div class=" flex flex-col gap-4">
          <div class="flex justify-between items-center">
            <h1 class="font-bold">Niche</h1>
            <Sheet class="bg-white">
              <SheetTrigger><Pen class="h-5 w-5" /></SheetTrigger>
              <SheetContent side="bottom" class="bg-white text-black py-8 rounded-t-lg">
                <SheetHeader>
                  <SheetTitle><h1 class='text-black'>Niche</h1></SheetTitle>
                  <div class="flex flex-wrap gap-2 px-2 py-2 border-2 border-black rounded-lg">
                    <div v-for="niche in NicheList" class="flex flex-wrap gap-2"  >
                      <input
                        class="hidden"
                        v-model="userNiche"
                        type="checkbox"
                        :id="niche.name"
                        :value="niche.name"
                      />
                      <label
                        v-if="userNiche.includes(niche.name)"
                        :for="niche.name"
                        class="   text-purple1 bg-[#F4F4FF] w-full rounded-lg p-2"
                      >
                        <span>{{niche.name}}</span>
                      </label>
                      <label
                        v-else
                        :for="niche.name"
                        class="bg-[#F2F2F2] text-[#686868] w-full rounded-lg p-2 "
                      >
                        {{niche.name}}
                      </label>
                    </div>
                  </div>
                </SheetHeader>
                <SheetFooter>
                 
                  <SheetClose class="pt-4 w-full" >
                    <Button @click="updateProfile" class="text-white bg-purple1 px-8 py-2 w-full rounded-lg" variant="outline">
                      Save
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>

          <div class="flex flex-wrap gap-2">
            <div  v-for="niche in userNiche" class="flex flex-wrap gap-2" :key="niche">
              <div
                class="rounded-[100px] border-[0.5px] text-purple1 border-purple1 px-2 py-[1.5px] text-purple flex w-ful"
              >
                {{ niche }}
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>

    <div class="px-4 flex flex-col gap-2 border-b border-[#E4E7EC] py-4"> 
      <div class="flex justify-between items-center">
        <h1 class="font-bold" >Personal Information</h1>
        <!-- <Pen class="h-5 w-5" /> -->
      </div>
      <div class="flex justify-between" >
        <div>
          <p>Email</p>
          <p>{{ userStore.user?.email ?? "N/A" }}</p>
        </div>
        <div>
          <p> Number</p>
          <p>{{ userStore.user?.phone_number ?? "N/A" }}</p>
        </div>
      </div>
    </div>
  </div>

  <!--Desktop view-->
  <div v-if="!device.isMobile" class="flex  mt-8 flex-col md:flex-row gap-20">
    <div class="flex flex-col items-center justify-center gap-2">
      <div>
        <div
          v-if="profileImgUrl === ''"
          class="border-4 rounded-full justify-center flex items-center bg-purplelabel w-36 h-36"
        >
          <p class="text-4xl text-black font-bold">
            {{ userStore.userProfile?.firstName?.charAt(0) }}
            {{ userStore.userProfile?.lastName?.charAt(0) }}

          </p>

         
        </div>
        <img
          v-else
          :src="imgUrl"
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
        {{ userStore.userProfile?.firstName }} {{ userStore.userProfile?.lastName }}
      </h1>

      <div class="max-w-fit py-2 px-2 bg-[#1D192F] flex gap-4 items-center rounded-[100px] text-purplelabel">
        <img src="/assets/icons/sms.svg" alt="" class="rounded-full bg-vDarkBlue p-2">
        Email : {{ userStore.user?.email ?? "N/A" }}
      </div>

      <div class="max-w-fit py-2 px-2 bg-[#1D192F] flex gap-4 items-center rounded-[100px] text-purplelabel">
        <img src="/assets/icons/call.svg" alt="" class="rounded-full bg-vDarkBlue p-2">
        Phone Number : {{ userStore.user?.phone_number ?? "N/A" }}
      </div>
      <div>
        {{ bio }}
      </div>
      <div class="flex flex-wrap gap-2">
         <div v-for="niche in userNiche" :key="niche">
          <div class="rounded-[16px] px-[12px] py-[4px] bg-white text-black">
            #{{ niche }}
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-5">
        <button
          @click="isOpen = true"
          class="rounded-[100px] px-4 py-2 bg-purplebg font-bold text-[#090618]"
        >
          Edit Profile
        </button>
        <button
          @click="isPass = true"
          class="rounded-[100px] px-4 py-2 bg-[#5331E8] text-white"
        >
          Change Password
        </button>
        <button @click="logout" class="rounded-[100px] px-4 py-2 bg-[#5331E8] text-white">
          Log out
        </button>
      </div>
    </div>
    <Popup title = "Edit Profile" v-if="isOpen" :togglePopup="()=> isOpen = false" :header="true">
      <div class="md:w-[400px]">
       
          <div class="flex items-center justify-between text-purplelabel">
            <h3 class="text-purplelabel font-semibold leading-6 dark:text-white">
              
            </h3>
            
          </div>


        <div class="text-purplelabel px-4 flex flex-col gap-4">
          <div>
            <p>Full Name</p>
            <p class="border-[0.5px] p-2 rounded-md w-full bg-transparent">
              {{ userStore.userProfile?.firstName }}
              {{ userStore.userProfile?.lastName }}
            </p>
          </div>

          <div>
            <p>Email Address</p>
            <input
              :placeholder="userStore.user?.email"
              readonly
              class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
              type="text"
            />
          </div>

          <div>
            <p>Website</p>
            <input
              class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
              type="text"
              :placeholder="'www.example.com'"
              v-model="website"
            />
          </div>

          <p>Niche</p>
          <div class="relative w-full inline-block bg-transparent text-left">
            <button
              @click="dropSocial"
              type="button"
              class="inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
            >
              <div class="flex gap-1 min-h-fit w-full flex-wrap">
                <p v-if="isEmptyNiche">Select Niche</p>
                <div v-else v-for="niche in userNiche" class="flex flex-row" :key="niche">
                  <div
                    class="rounded-[100px] px-2 py-[1.5px] text-white bg-[#231E37] flex w-ful"
                  >
                    {{ niche }}
                  </div>
                </div>
              </div>

              <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 12l-6-6h12l-6 6z" clip-rule="evenodd" />
              </svg>
            </button>

            <div
              v-if="dropdownSocials"
              class="origin-top-right absolute right-0 mt-2 w-full h-40 overflow-scroll rounded-md shadow-lg ring-1 bg-[#100C21] p-2 ring-black ring-opacity-5 focus:outline-none"
            >
              <div v-for="niche in NicheList" :key="niche.id" class="flex gap-2">
                <input
                  type="checkbox"
                  :id="niche.name"
                  :value="niche.name"
                  v-model="userNiche"
                />
                <label for="niche.name">{{ niche.name }}</label>
              </div>
            </div>
          </div>

          <div>
            <p>Bio</p>
            <textarea
              class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
              cols="30"
              rows="4"
              :placeholder="bio"
              v-model="bio"
            ></textarea>
          </div>
        </div>

        <div class="px-4">
          <button @click="updateProfile" class="w-full rounded-lg p-2">
            Save Profile
          </button>
        </div>
      </div>
    </Popup>

    <Popup title = "Change Password" v-if="isPass" :togglePopup="()=> isPass = false" :header="true" >
      <div class="md:w-[400px]">
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

        <div class="px-4">
          <button @click="newPassword" class="w-full rounded-lg p-2">Change Password</button>
        </div>
      </div>
    </Popup>
  </div>

  
</template>
