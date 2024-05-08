<script setup>




definePageMeta({
  layout: 'dashboard',
  colorMode:'dark'
})





</script>

<template>
     <div class="flex mt-8 flex-col md:flex-row gap-20">
        <div class="flex flex-col gap-2">

            <p class="text-center underline"> Change Avatar</p>
        </div>

        <div class="mt-4 md:w-[500px] flex gap-5 flex-col">
            <h1 class="text-3xl">{{userStore.userProfile?.first_name}} {{userStore.userProfile?.last_name}}</h1>

            <button class="w-[50%] py-1 bg-[#1D192F] rounded-[100px] text-purplelabel">
                {{userStore.user.email}}
            </button>

            <button class=" w-[50%] py-1 bg-[#1D192F] rounded-[100px] text-purplelabel">
                {{ userStore.user.phone_number }}
            </button>

            <p class="text-wrap">
                An influencer looking to collaborate with brands to reach their desired clientele
            </p>

            <div class="flex flex-row gap-5">
               
               
                <button @click="isOpen = true" class="rounded-[100px] px-4 py-2 bg-purplelabel text-[#090618]">
                    Edit Profile 
                </button>
                <button @click="isPass = true" class="rounded-[100px] px-4 py-2 bg-[#5331E8] text-white">
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
                    <h3 class="text-purplelabel font-semibold leading-6  dark:text-white">
                    Edit Profile
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
                </div>
                </template>

                <div class="text-purplelabel px-4">
                    <p>Full Name</p>
                    <input :placeholder = "userStore.userProfile.first_name" readonly class=" border-[0.5px] p-2 rounded-md w-full bg-transparent" type="text" name="" id="">

                    <p>Email Address</p>
                    <input :placeholder="userStore.user.email" readonly class="border-[0.5px] p-2 rounded-md w-full bg-transparent" type="text">

                    <p>Phone Number</p>
                    <input  class="border-[0.5px] p-2 rounded-md w-full bg-transparent" type="number" name="" id="">

                    <p>About Me</p>
                    <textarea class="border-[0.5px] p-2 rounded-md w-full bg-transparent" name="" id="" cols="30" rows="4"></textarea>
                </div>

                <div class="px-4">
                    <button class="w-full rounded-lg p-2">
                        Save Profile
                    </button>
                </div>
            </UCard>
        </UModal>
        <UModal v-model="isPass" prevent-close>
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                <div class="flex items-center justify-between text-purplelabel">
                    <h3 class="text-purplelabel font-semibold leading-6  dark:text-white">
                    Change Password
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isPass = false" />
                </div>
                </template>

                <div class="text-purplelabel px-4">
                    <p>Current Password</p>
                    <input  class=" border-[0.5px] p-2 rounded-md w-full bg-transparent" type="text" name="" id="">

                    <p>New Password</p>
                    <input v-model="NewPassword" class="border-[0.5px] p-2 rounded-md w-full bg-transparent" type="text">

                    <p>Confirm Password</p>
                    <input v-model="ConfirmPassword"  class="border-[0.5px] p-2 rounded-md w-full bg-transparent" type="text" name="" id="">

                </div>

                <div class="px-4">
                    <button class="w-full rounded-lg p-2">
                        Save Password
                    </button>
                </div>
            </UCard>
        </UModal>
    </div>
</template>