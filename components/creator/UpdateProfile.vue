<script setup lang="ts">
import { getStates } from '@/api/creator/profile.creator'
import { useProfile } from '@/composables/useProfile'
import { useUserStore } from '@/stores/userStore'
import { useField } from 'vee-validate'
import { computed, ref, watch } from 'vue'
import { z } from 'zod'

// Stores & composables
const userStore = useUserStore()
const {
  profileData,
  countryData,
  getCountryState,
  isPending,
  data: stateData,
  updateProfile,
  updatePending
} = useProfile()

// Zod schema
const profileSchema = z.object({
  website: z.union([
    z.string().url("Enter a valid website URL"),
    z.literal(''),
    z.null(),
    z.undefined()
  ]),
  bio: z.union([
    z.string().max(300, "Bio must be at most 300 characters"),
    z.literal(''),
    z.null(),
    z.undefined()
  ]),
  countryCode: z.union([
    z.string(),
    z.null(),
    z.undefined()
  ]),
  stateCode: z.union([
    z.string(),
    z.null(),
    z.undefined()
  ])
})

// Fields
const website = ref('')
const bioCopy = ref('')
const countryCode = ref('')
const stateCode = ref('')


// Country code map for pre-fill
const countryCodeToName: Record<string, string> = {
  NG: "Nigeria", DZ: "Algeria", AO: "Angola", BJ: "Benin", BW: "Botswana",
  BF: "Burkina Faso", CM: "Cameroon", CI: "Ivory Coast", EG: "Egypt",
  ET: "Ethiopia", GM: "Gambia", GH: "Ghana", KE: "Kenya", LR: "Liberia",
  ML: "Mali", RW: "Rwanda", MA: "Morocco", NE: "Niger", MZ: "Mozambique",
  NA: "Namibia", SL: "Sierra Leone", TG: "Togo", TZ: "Tanzania",
  SD: "Sudan", SN: "Senegal", ZA: "South Africa", SS: "South Sudan",
  ZM: "Zambia", ZW: "Zimbabwe", UG: "Uganda"
}

// Initial profile load
watch(profileData, (data) => {
  website.value = data?.profile.website || ''
  bioCopy.value = data?.profile.bio || ''
  countryCode.value = data?.profile.countryCode || ''
  stateCode.value = data?.profile.state || ''
}, { immediate: true })

watch(
  countryCode,
  (newValue) => {
    console.log(newValue)
    const countryName = countryCodeToName[newValue]
    if (countryName) {
      getCountryState({ countryCode: newValue })
    }
  },
  { immediate: true }
)

// Fetch states when country changes



// Char count
const bioCount = computed(() => bioCopy.value.length)

// Form submission
const pushUpdateProfile = () => {
  const formValues = {
    firstName: profileData?.value?.profile.firstName || '',
    lastName: profileData?.value?.profile.lastName || '',
    website: website.value,
    bio: bioCopy.value,
    countryCode: countryCode.value || '',
    state: stateCode.value || ''
  }
  console.log(formValues)
  const result = profileSchema.safeParse({
    website: formValues.website,
    bio: formValues.bio,
    countryCode: countryCode.value,
    state: stateCode.value
  })

  if (!result.success) {
    console.error(result.error.flatten())
    return
  }

  updateProfile(formValues)
  console.log('Updated Profile:', formValues)
}
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <button class="rounded-[100px] px-4 py-2 bg-purplebg font-bold w-full text-[#090618]">
        Edit Profile
      </button>
    </DialogTrigger>

    <DialogContent>
      <div class="text-purplelabel px-4 flex flex-col gap-4">
        <div>
          <p>Full Name</p>
          <p class="border-[0.5px] p-2 rounded-md w-full bg-transparent">
            {{ profileData?.profile.firstName }} {{ profileData?.profile.lastName }}
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
            v-model="website"
            class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
            type="text"
            placeholder="www.example.com"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-xs">Country</label>
          <USelectMenu
            searchable
            v-model="countryCode"
            :options="countryData"
            placeholder="Select Country"
            value-attribute="code"
            option-attribute="name"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-xs">State</label>
          <USelectMenu
            searchable
            v-model="stateCode"
            :options="stateData"
            placeholder="Select State"
            value-attribute="name"
            option-attribute="name"
          />
        </div>

        <div>
          <p>Bio</p>
          <textarea
            v-model="bioCopy"
            class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
            rows="4"
            placeholder="Your bio..."
          ></textarea>
          <p>{{ bioCount }}/300</p>
        </div>
      </div>

      <div class="px-4">
        <button @click="pushUpdateProfile" class="w-full rounded-lg p-2 bg-purplebg text-white">
          Save Profile
        </button>
      </div>
    </DialogContent>
  </Dialog>
</template>
