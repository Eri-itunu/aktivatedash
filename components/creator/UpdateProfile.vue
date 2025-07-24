<script setup lang="ts">
import { getStates } from '@/api/creator/profile.creator'
import { useProfile } from '@/composables/useProfile'
import { useUserStore } from '@/stores/userStore'
import { useField } from 'vee-validate'
import { computed, ref, watch } from 'vue'
import { z } from 'zod'

// Load composables and state
const { profileData, countryData, getCountryState, isPending, data, updateProfile, updatePending } = useProfile()
const userStore = useUserStore()
// Format country and state data for selects
const formattedCountries = computed(() =>
  countryData.value?.map((country) => ({
    label: country.name,
    value: country.code,
  })) ?? []
)

const formattedStates = computed(() =>
  data.value?.map((state) => ({
    label: state.name,
  })) ?? []
)

// Zod validation schema
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
    z.object({
      label: z.string(),
      value: z.string(),
    }),
    z.null(),
    z.undefined()
  ]),
  stateCode: z.union([
    z.object({
      label: z.string(),
      value: z.string(),
    }),
    z.null(),
    z.undefined()
  ]),
})


// Reactive form state

const website = ref('')
const bioCopy = ref('')
const { value: countryCode } = useField<{ label: string; value: string }>('countryCode')
const { value: stateCode } = useField<{ label: string }>('stateCode')

getCountryState();

// Bio character count
const bioCount = computed(() => bioCopy.value.length)

// Load initial profile data
watch(profileData, (data) => {
  if (data) {
    website.value = data.profile.website || ''
    bioCopy.value = data.profile.bio || ''
    stateCode.value.label = data.profile.state || ''
    countryCode.value.label = countryCodeToName[data.profile.countryCode] || ''
    
  }
}, { immediate: true })
watch(countryCode, (data) =>{
  if(data){
    getStates(countryCode.value.value)
  }
})

const countryCodeToName: Record<string, string> = {
  NG: "Nigeria",
  DZ: "Algeria",
  AO: "Angola",
  BJ: "Benin",
  BW: "Botswana",
  BF: "Burkina Faso",
  CM: "Cameroon",
  CI: "Ivory Coast",
  EG: "Egypt",
  ET: "Ethiopia",
  GM: "Gambia",
  GH: "Ghana",
  KE: "Kenya",
  LR: "Liberia",
  ML: "Mali",
  RW: "Rwanda",
  MA: "Morocco",
  NE: "Niger",
  MZ: "Mozambique",
  NA: "Namibia",
  SL: "Sierra Leone",
  TG: "Togo",
  TZ: "Tanzania",
  SD: "Sudan",
  SN: "Senegal",
  ZA: "South Africa",
  SS: "South Sudan",
  ZM: "Zambia",
  ZW: "Zimbabwe",
  UG: "Uganda"
};



const pushUpdateProfile = () => {
  const formValues = {
    firstName:  profileData?.value?.profile.firstName,
    lastName:  profileData?.value?.profile.lastName,
    website: website.value,
    bio: bioCopy.value,
    countryCode: countryCode.value.value,
    stateCode: stateCode.value.label,
  }
  const result = profileSchema.safeParse(formValues)

  updateProfile(formValues)
  
  console.log('Form Values:', formValues)
}
</script>




<template>
    <Dialog>
          <DialogTrigger>
            <button
              class="rounded-[100px] px-4 py-2 bg-purplebg font-bold w-full text-[#090618]"
            >
              Edit Profile
            </button>
          </DialogTrigger>

          <DialogContent>
            <div class="">

            <div class="text-purplelabel px-4 flex flex-col gap-4">
              <div>
                <p>Full Name</p>
                <p class="border-[0.5px] p-2 rounded-md w-full bg-transparent">
                  {{ profileData?.profile.firstName }}
                  {{ profileData?.profile.lastName }}
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

                <div class="flex flex-col gap-1">
                <label class="text-xs">Country</label>
                <USelectMenu
                    v-model="countryCode"
                    :options="formattedCountries"
                    option-attribute="label"
                    searchable
                    searchable-placeholder="Search for countries..."
                    placeholder="Select a country"
                    class="w-full"
                    >
                    <template #label>
                        <span class="truncate">{{ countryCode?.label || 'Select a country' }}</span>
                    </template>

                    <template #option="{ option: country }">
                        <span class="truncate">{{ country.label }}</span>
                    </template>
                    </USelectMenu>
                    <!-- <span class="text-red-500 text-sm">
                    {{ errors.bankCode  }}
                    </span> -->
                </div>

                <div v-if="data"  class="flex flex-col gap-1">
                <label class="text-xs">State</label>
                <USelectMenu
                    v-model="stateCode"
                    :options="formattedStates"
                    option-attribute="label"
                    searchable
                    searchable-placeholder="Search for states..."
                    placeholder="Select a state"
                    class="w-full"
                    >
                    <template #label>
                        <span class="truncate">{{ stateCode?.label || 'Select a state' }}</span>
                    </template>

                    <template #option="{ option: state }">
                        <span class="truncate">{{ state.label }}</span>
                    </template>
                    </USelectMenu>
                    <!-- <span class="text-red-500 text-sm">
                    {{ errors.bankCode  }}
                    </span> -->
                </div>

              

              <div>
                <p>Bio</p>
                <textarea
                  class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
                  cols="30"
                  rows="4"
                  :placeholder="bioCopy"
                  v-model="bioCopy"
                ></textarea>
                <p> {{ bioCount }}/300</p>
              </div>
            </div>

            <div class="px-4">
              <button @click="pushUpdateProfile" class="w-full rounded-lg p-2">
                Save Profile
              </button>
            </div>
          </div>
          </DialogContent>
        </Dialog>


</template>