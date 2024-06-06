<script setup lang="ts">
import { ref } from "vue";
import type { APIResponse, Tags } from "types";
import { getNiche } from "../../../api/creator/profile.creator";
import axios from "axios";
const isOpen = ref(false);
const isPass = ref(false);
definePageMeta({
  layout: "brands",
  colorMode: "dark",
});
const file = ref<File | null>(null);
const toast = useToast();
const userStore = useUserStore();
const config = useRuntimeConfig();
const API_URL = config.public.API_URL;
const accessToken = userStore.accessToken || "";
const fileUrl = ref<string>("");
const formData = new FormData();
const dropdownSocials = ref(false);
const NicheList = ref<Tags[]>([]);
const addNiche = ref([]);
const isEmptyArray = computed<boolean>(() => addNiche === []);

function dropSocial() {
  dropdownSocials.value = !dropdownSocials.value;
}
const imgUrl = ref<string>(userStore.userProfile?.img_url || "");
const onChangeFile = async (event: Event) => {
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
    await ChangeAvatar(fileUrl.value);
  } catch (error: any) {
    console.log(error);
    return;
  }
};

const ChangeAvatar = async (imageUrl: string) => {
  try {
    const res = await axios.post<APIResponse<"message", string>>(
      `${API_URL}/profile/change-avatar`,
      { imageUrl },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    imgUrl.value = imageUrl;
    toast.add({ title: "Avatar change succesful. Log in again to view changes" });
  } catch (error: any) {
    console.log(error);
    toast.add({ title: "Error uploading Avatar" });
    return;
  }
};
const updateProfile = async () => {
  const body = {
    firstName: userStore.userProfile?.first_name,
    lastName: userStore.userProfile?.last_name,
    website: userStore.userProfile?.website,
    dateOfBirth: "2023-05-26",
    bio: "i like to make fun content",
    niche: addNiche,
  };
};
const getAllNiches = async () => {
  const res = await getNiche({
    apiUrl: API_URL,
    accessToken,
  });
  NicheList.value = res;
  console.log(NicheList);
};

const logout = async () => {
  try {
    await userStore.logout();
    navigateTo("/brands");
  } catch (error: any) {
    toast.add({ title: error.message });
  }
};

watchEffect(async () => {
  getAllNiches();
});
</script>

<template>
  <div class="flex mt-8 flex-col md:flex-row gap-20">
    <div class="flex flex-col items-center justify-center gap-2">
      <div class="">
        <div
          v-if="imgUrl === ''"
          class="border-4 rounded-full justify-center flex items-center bg-purplelabel w-36 h-36"
        >
          <p class="text-4xl text-black font-bold">
            {{ userStore.userProfile?.first_name?.charAt(0) }}
            {{ userStore.userProfile?.last_name?.charAt(0) }}
          </p>
        </div>
        <img
          v-else
          :src="imgUrl"
          class="border-4 border-purple1 rounded-full items-center p-0.5 w-48 h-48 object-fit"
          alt=""
        />
      </div>

      <label for="upload">
        <p class="text-center underline">Change Avatar</p>
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
        {{ userStore.userProfile?.first_name }} {{ userStore.userProfile?.last_name }}
      </h1>

      <button class="w-[50%] py-1 bg-[#1D192F] rounded-[100px] text-purplelabel">
        Email : {{ userStore.user?.email ?? "N/A" }}
      </button>

      <button class="w-[50%] py-1 bg-[#1D192F] rounded-[100px] text-purplelabel">
        Phone Number : {{ userStore.user?.phone_number ?? "N/A" }}
      </button>

      <!--            <p class="text-wrap">-->
      <!--                An influencer looking to collaborate with brands to reach their desired clientele-->
      <!--            </p>-->

      <div class="flex flex-row gap-5">
        <button
          @click="isOpen = true"
          class="rounded-[100px] px-4 py-2 bg-purplelabel text-[#090618]"
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
    <UModal v-model="isOpen" prevent-close>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between text-purplelabel">
            <h3 class="text-purplelabel font-semibold leading-6 dark:text-white">
              Edit Profile
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>

        <div class="text-purplelabel px-4">
          <p>Full Name</p>
          <input
            :placeholder="userStore.userProfile?.first_name"
            readonly
            class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
            type="text"
            name=""
            id=""
          />

          <p>Email Address</p>
          <input
            :placeholder="userStore.user?.email"
            readonly
            class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
            type="text"
          />

          <p>Website</p>
          <input
            class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
            type="text"
          />

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
              <div class="flex gap-1 flex-wrap">
                <p v-if="isEmptyArray">Select Niche</p>
                <div v-else v-for="niche in addNiche" class="flex flex-row" :key="niche">
                  <div
                    class="rounded-[100px] px-2 py-[1.5px] text-white bg-[#231E37] flex w-full"
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
                  id="niche.name"
                  :value="niche.name"
                  v-model="addNiche"
                />
                <label for="niche.name">{{ niche.name }}</label>
              </div>
            </div>
          </div>

          <p>Introduction</p>
          <textarea
            class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
            cols="30"
            rows="4"
          ></textarea>
        </div>

        <div class="px-4">
          <button class="w-full rounded-lg p-2">Save Profile</button>
        </div>
      </UCard>
    </UModal>
    <UModal v-model="isPass" prevent-close>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between text-purplelabel">
            <h3 class="text-purplelabel font-semibold leading-6 dark:text-white">
              Change Password
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isPass = false"
            />
          </div>
        </template>

        <div class="text-purplelabel px-4">
          <p>Current Password</p>
          <input
            class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
            type="text"
            name=""
            id=""
          />

          <p>New Password</p>
          <input
            class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
            type="text"
          />

          <p>Confirm Password</p>
          <input
            class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
            type="text"
            name=""
            id=""
          />
        </div>

        <div class="px-4">
          <button class="w-full rounded-lg p-2">Save Password</button>
        </div>
      </UCard>
    </UModal>
  </div>
</template>
