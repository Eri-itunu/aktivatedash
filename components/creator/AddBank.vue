<template>
    <Dialog>
        <DialogTrigger>
       Add Bank
        </DialogTrigger>
        <DialogContent>
        <DialogHeader>
            <DialogTitle>Verify Bank Account</DialogTitle>
            <DialogDescription>
                <USelectMenu
                    v-model="selectedBank"
                    :options="formattedBanks"
                    searchable
                    searchable-placeholder="Search a bank..."
                    class="w-48"
                    placeholder="Select a bank"
                    />
            </DialogDescription>
        </DialogHeader>

        <DialogFooter>
            Save changes
        </DialogFooter>
        </DialogContent>
    </Dialog>
</template>


<script setup lang="ts">
    import { useBankServices } from "@/composables/useBankServices";
    const {useGetBanksQuery,
    useGetBankAccountQuery,
    useValidateAccountMutation,
    useSaveBankAccountMutation,} = useBankServices()

// ✅ These will automatically fetch on load
const { data: banks, isLoading: loadingBanks } = useGetBanksQuery()
const formattedBanks = computed(() => 
  banks.value?.map((bank) => ({
    label: bank.name,
    value: bank.code,
  })) ?? []
);
const selectedBank = ref('');

</script>