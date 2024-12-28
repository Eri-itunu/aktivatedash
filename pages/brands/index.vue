<script setup lang="ts">
import UserRoles from "@/enums/userRoles";
import { useToast } from "../../components/ui/toast";

definePageMeta({
  layout: "brands-auth",
});
const { toast } = useToast();
const userStore = useUserStore();
const email = ref<string>("");
const password = ref<string>("");
const loading = ref(false);
const showPassword = ref(false);

const toggleVisibility = (e: Event) => {
  showPassword.value = !showPassword.value;
};

const inputType = computed(() => (showPassword.value ? "text" : "password"));

const submitLogin = async (e: Event) => {
  const body = {
    password: password.value,
    email: email.value,
  };
  loading.value = true;
  try {
    const res = await userStore.login(body);
    if (userStore.user && userStore.user.roleId === UserRoles.BRAND) {
      navigateTo("/brands/dashboard");
      loading.value = false
      return;
    }
    throw new Error("Invalid Credentials");
  } catch (error: any) {
    loading.value = false;
    toast({ title: error.message });
  }
};
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="flex items-center justify-center place-items-center basis-4/5">
      <div class="flex flex-col p-6 gap-5 w-[500px]">
        <img src="../../assets/icons/Brand-Aktivate-Icon.svg" class="h-20" alt="" />

        <h1 class="text-center text-xl font-bold">Welcome back</h1>
        <p class="text-center">Sign in to your Aktivate Brand account</p>

        <div class="flex flex-col items-center gap-5 justify-center">
          <div class="flex flex-col w-full">
            <label for="">Email </label>
            <input
              v-model="email"
              type="email"
              placeholder="Your Email Address"
              class="border rounded border-black py-3 px-2 bg-transparent"
            />
          </div>

          <div class="flex flex-col w-full">
            <label for="">Password </label>
            <div
              class="flex justify-between items-center border p-3 border-1 border-black rounded-md"
            >
              <input
                :type="inputType"
                class="w-full outline-none pl-2 bg-transparent"
                v-model="password"
                :placeholder="`enter password`"
                @keyup.enter="submitLogin"
              />
              <button type="button" @click="toggleVisibility">
                {{ showPassword ? "" : "" }}
                <img src="../../assets/icons/eye.svg" alt="" />
              </button>
            </div>
          </div>
        </div>

        <!-- <nuxt-link to="/brands/dashboard">
                    <button class="rounded bg-[#5331E8] py-4 w-full text-white">
                        Go To Dashboard
                    </button>
                </nuxt-link> -->
        <button
          @click="submitLogin"
          class="rounded flex gap-2 justify-center bg-[#5331E8] py-4 w-full text-white"
        >
          Go To Dashboard
          <Spinner :loading="loading" />
        </button>
      </div>
    </div>

    <div class="flex justify-between relative basis-1/5 items-end">
      <div>
        <img
          class="object-cover h-auto md:h-48"
          src="../../assets/images/Brands/Group 186.svg"
          alt=""
        />
      </div>

      <div>
        <img class="object-cover" src="../../assets/images/Brands/Group 188.svg" alt="" />
      </div>

      <div>
        <img class="object-cover" src="../../assets/images/Brands/Group 187.svg" alt="" />
      </div>
      <div>
        <img class="object-cover" src="../../assets/images/Brands/Group 185.svg" alt="" />
      </div>
      <div>
        <img class="object-cover" src="../../assets/images/Brands/Group 184.svg" alt="" />
      </div>
      <div>
        <img class="object-cover" src="../../assets/images/Brands/path384.svg" alt="" />
      </div>

      <div>
        <img class="object-cover" src="../../assets/images/Brands/path382.svg" alt="" />
      </div>

      <div>
        <img
          class="object-cover h-auto md:h-48"
          src="../../assets/images/Brands/Group 183.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
