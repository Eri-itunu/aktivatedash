<script setup lang="ts">
import { useToast } from '@/components/ui/toast'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { computed, ref } from 'vue'
import { useBankServices } from '@/composables/useBankServices'

// Load bank-related composables
const {
  useGetBanksQuery,
  useValidateAccountMutation,
  useSaveBankAccountMutation,
  useGetBankAccountQuery
} = useBankServices()

// Bank data
const { data: banks } = useGetBanksQuery()
const { data:MyBank} = useGetBankAccountQuery()

const{ mutate:SaveAccount } = useSaveBankAccountMutation()
// Format for USelectMenu
const formattedBanks = computed(() =>
  banks.value?.map((bank) => ({
    label: bank.name,
    value: bank.name,
    code: bank.code
  })) ?? []
)

const handleSaveAccount = () => {
  if (!accountDetails.value || !bankCode.value) return

  SaveAccount({
    accountNumber: accountDetails.value.account_number,
    accountName: accountDetails.value.account_name,
    bankCode: bankCode.value.code,
    bankName: bankCode.value.value,
    currency: 'NGN',
  })
}


// Form schema
const validationSchema = toTypedSchema(
  zod.object({
    bankCode: zod.object({
      value: zod.string().min(1, 'Bank name is required'),
      code: zod.string().min(1, 'Bank code is required'),
    }),
    accountNumber: zod.string()
      .regex(/^\d{10}$/, 'Account number must be 10 digits')
  })
)

// Setup form
const { handleSubmit, errors } = useForm({ validationSchema })
const { value: bankCode } = useField<{ value: string; code: string }>('bankCode')
const { value: accountNumber } = useField<string>('accountNumber')

// Mutation
const { mutate: validateAccount, isPending, data:accountDetails } = useValidateAccountMutation()

// Output
const accountName = ref('')
const toast = useToast()

// Submission handler
const onSubmit = handleSubmit((values) => {
  console.log(values)

  validateAccount({
    bankCode: values.bankCode.code,
    accountNumber: values.accountNumber
  })
})
</script>


<template>
  <Dialog>
    <DialogTrigger class="bg-purplebg rounded-[100px] font-bold w-full p-2 text-black" >Add Bank</DialogTrigger>
    <DialogContent>
      <DialogHeader>
       
        <DialogTitle>{{MyBank?.bankAccount!=null ? 'Account Details':'Verify Bank Account'}}</DialogTitle>
        <DialogDescription>
            
          <form v-if="!MyBank?.bankAccount" @submit="onSubmit" class="flex flex-col gap-4 w-full mt-4">
            <!-- Bank selection -->
            <div class="flex flex-col gap-1">
              <label class="text-xs">Bank</label>
              <USelectMenu
                v-model="bankCode"
                :options="formattedBanks"
                option-attribute="label"
                searchable
                searchable-placeholder="Search a bank..."
                placeholder="Select a bank"
                class="w-full"
                >
                <template #label>
                    <span class="truncate">{{ bankCode?.value || 'Select a bank' }}</span>
                </template>

                <template #option="{ option: bank }">
                    <span class="truncate">{{ bank.label }}</span>
                </template>
                </USelectMenu>
                <span class="text-red-500 text-sm">
                {{ errors.bankCode  }}
                </span>
            </div>

            <!-- Account number -->
            <div class="flex flex-col gap-1">
              <label class="text-xs">Account Number</label>
              <input
                v-model="accountNumber"
                maxlength="10"
                placeholder="Enter 10-digit account number"
                class="border bg-transparent rounded-[4px] border-[#9A9898]/50 p-2"
              />
              <span class="text-red-500 text-sm">{{ errors.accountNumber }}</span>
            </div>

            <!-- Submit button -->
            <button
              type="submit"
              :disabled="isPending"
              class="w-full py-3 text-sm font-medium text-white bg-purple1 rounded-[4px] disabled:opacity-50"
            >
              <template v-if="isPending">Verifying...</template>
              <template v-else>Verify Account</template>
            </button>

            <!-- Display result -->
            <div v-if="accountDetails" class="text-green-600 font-medium">
              <p>Account Number: {{ accountDetails.account_number }}</p>
              <p>Account Name: {{ accountDetails.account_name }}</p>
            </div>
          </form>
          
          <div v-else>
            <p>Bank: {{ MyBank?.bankAccount.bankName }}</p>
            <p>Account Name: {{ MyBank?.bankAccount.accountName }}</p>
            <p>Account Number: {{ MyBank?.bankAccount.accountNumber }}</p>
          </div>

        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <button
            v-if="!MyBank?.bankAccount"
            class="bg-purple1 text-white px-4 py-2 rounded-md"
            :disabled="!accountDetails"
            @click="handleSaveAccount"
        >
          Save Bank
        </button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
