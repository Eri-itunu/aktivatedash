<script setup lang="ts" >
import type { IPlatformProfile, NPlatformProfile } from "types";

import { getSingleCreator } from "@/api/brand/getCreator.brand";

const props = defineProps<{
  creatorId: string ;
  lastName: string | undefined;
}>();
const API_URL = useRuntimeConfig().public.API_URL;
const userStore = useUserStore();
const profile = ref<NPlatformProfile>();
const loading = ref(false)

const getCreator = async () => {
  loading.value = true;

  const accessToken = userStore.accessToken || "";
  const influencerId = props.creatorId
  try {
    const res = await getSingleCreator({
      apiUrl: API_URL,
      influencerId,
      accessToken,
    });

    profile.value = res;
   
  } catch (error: any) {
    loading.value = false;
  }
};
</script>

<template>
    <div  >

    </div>

</template>