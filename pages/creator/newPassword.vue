<script lang="ts" setup>

import { ref } from 'vue';

definePageMeta({
    colorMode: 'light',
})

const loading = ref(false);

const password = ref<string>("");
const retypePassword = ref<string>("");
const showPassword = ref(false);
const secondPassword = ref(false)
const OTP = ref<string>("")
const userStore = useUserStore()
const toast = useToast()
const config = useRuntimeConfig()
const API_URL = config.public.API_URL 

const {forgotemail} = storeToRefs(userStore);

const inputType = computed( () =>
    showPassword.value ? 'text' : 'password'
)

const inputTypeTwo = computed( () =>
    secondPassword.value ? 'text' : 'password'
)
const  toggleVisibility = (e: Event) => {
    showPassword.value = !showPassword.value;
}

const toggleSecondVisibility = (e:Event) =>{
    secondPassword.value = !secondPassword.value
}

const  resetEmail = async() =>{
   
    try{
        if(password.value !== retypePassword.value ){
        toast.add({title:"Passwords do not match"})
        return
        }
        console.log(forgotemail)
        const res = await $fetch<ResponseMessage>(`${API_URL}/auth/reset-password`, {
            method: 'post',
            body: { email: forgotemail.value, otp: OTP.value, newPassword: password.value }
        })

        toast.add({title:res.message})
        setTimeout(() => {
            navigateTo('/creator/login')
        }, 3000);
    }
    catch(error:any){
        toast.add({title:error})
    }

}


</script>


<template>
    <nuxt-link class="flex justify-end w-" to="/creator/login">
        <div class="p-4">
            <signBlackButton message="Login"  />
        </div>
    </nuxt-link>

    <div class="px-4 md:px-16 mb-24 flex flex-col gap-6">
        <h2 class="text-3xl font-semibold">Set Password</h2>
       
    </div>

    

    <div class="flex flex-col gap-5">
        <div class="px-4 md:px-16">
            <input v-model="OTP" class="p-4" type="text" placeholder="enter OTP"
        </div>

        <div class="flex gap-2 px-4 md:px-16">
            <div class="flex flex-col w-full md:w-1/2">
                <label for="">New Password </label>
                <div class=" flex justify-between items-center border p-3 border-1 border-black rounded-md">
                    <input :type="inputType" class="w-full outline-none pl-2" v-model="password" :placeholder="`enter password`">
                    <button type="button" @click="toggleVisibility">
                    {{ showPassword ? '' : '' }} <img src="../../assets/icons/eye.svg" alt="">
                    </button>
                </div>
            </div>
            <div class="flex flex-col w-full md:w-1/2">
                <label for="">Confirm Password </label>
                <div class=" flex justify-between items-center border p-3 border-1 border-black rounded-md">
                    <input :type="inputTypeTwo" class="w-full outline-none pl-2" v-model="retypePassword" :placeholder="`enter password`">
                    <button type="button" @click="toggleSecondVisibility">
                    {{ secondPassword ? '' : '' }} <img src="../../assets/icons/eye.svg" alt="">
                    </button>
                </div>
            </div>

        </div>

        

        
        
        <div  class="pb-5 md:pb-0" >
            <authButton @click="resetEmail" message="Confirm Password" :loading="loading"/>
        </div>
    </div>
</template>