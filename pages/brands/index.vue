<script setup lang="ts">
import UserRoles from '../../enums/userRoles';

definePageMeta({
  
})
const toast = useToast()
const userStore = useUserStore();
const email = ref<string>("");
const password = ref<string>("");
const loading = ref(false);

const submitLogin = async (e: Event) => {
    const body = {
        password: password.value,
        email: email.value,
    }
    loading.value = true
    const res = await userStore.login(body);
    loading.value = false
    if(!res) {
        toast.add({ title: "Error logging in"})
        return
    }
    if (res.message) {
         toast.add({ title: res.message })
    }
    if (userStore.user && userStore.user.role_id === UserRoles.BRAND) {
        navigateTo('/brands/dashboard')
    }
}

</script>


<template>
   <div class="flex flex-col h-screen">
        <div class="flex items-center justify-center place-items-center basis-4/5">
            <div class="flex flex-col gap-5 w-[500px] ">
                <img src="../../assets/icons/Brand-Aktivate-Icon.svg" class="h-20" alt="">

                <h1 class="text-center text-xl font-bold">Welcome back</h1>
                <p class="text-center">Lorem ipsum dolor, sit amet consecteturdip </p>



                <div class="flex flex-col items-center gap-5 justify-center">
                    <div class="flex flex-col w-full ">
                        <label for="">Email </label>
                        <input v-model="email" type="email" placeholder="Your Email Address" class="border rounded border-black py-3 px-2">
                    </div>

                    <div class="flex flex-col w-full ">
                        <label for="">Password</label>
                        <input v-model="password" type="password" placeholder="Your Password" class="border rounded   border-black py-3 px-2">
                    </div>
                </div>


                <!-- <nuxt-link to="/brands/dashboard">
                    <button class="rounded bg-[#5331E8] py-4 w-full text-white">
                        Go To Dashboard
                    </button>
                </nuxt-link> -->
                <button @click="submitLogin" class="rounded flex gap-2 justify-center bg-[#5331E8] py-4 w-full text-white">
                    Go To Dashboard
                    <Spinner :loading="loading"/>
                </button>
            </div>
        </div>

        <div class=" flex justify-between relative basis-1/5 items-end">
            <div>
                <img class="object-cover" src="../../assets/images/Brands/Group 186.svg" alt="">
            </div>

            <div>
                <img class="object-cover" src="../../assets/images/Brands/Group 188.svg" alt="">
            </div>

            <div>
                <img class="object-cover" src="../../assets/images/Brands/Group 187.svg" alt="">
            </div>
            <div>
                <img class="object-cover" src="../../assets/images/Brands/Group 185.svg" alt="">
            </div>
            <div>
                <img class="object-cover" src="../../assets/images/Brands/Group 184.svg" alt="">
            </div>
            <div>
                <img class="object-cover" src="../../assets/images/Brands/path384.svg" alt="">
            </div>

            <div>
                <img class="object-cover" src="../../assets/images/Brands/path382.svg" alt="">
            </div>


            <div>
                <img class="object-cover" src="../../assets/images/Brands/Group 183.svg" alt="">
            </div>

        </div>
   </div>
</template>