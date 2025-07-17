import { saveBankAccount, getBankAccount, validateAccount, getBanks } from '@/api/bank'
import { useQuery, useMutation } from '@tanstack/vue-query'


export const useBankServices = () => {
  const toast = useToast()
  const router = useRouter()

  // ✅ Query: Get all banks
  const useGetBanksQuery = () =>
    useQuery({
      queryKey: ['banks'],
      queryFn: getBanks,
    })

  // ✅ Query: Get user's bank account
  const useGetBankAccountQuery = () =>
    useQuery({
      queryKey: ['bank-account'],
      queryFn: getBankAccount,
    })

  // ✅ Mutation: Validate bank account
  const useValidateAccountMutation = () =>
    useMutation({
      mutationFn: (payload: { accountNumber: string; bankCode: string }) =>
        validateAccount(payload),

      onSuccess: () => {
        toast.add({
          title: 'Account Validated',
        })
      },

      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          'An unexpected error occurred'

        toast.add({
          title: 'Validation Failed',
          description: message,
        })
      },
    })

  // ✅ Mutation: Save bank account
  const useSaveBankAccountMutation = () =>
    useMutation({
      mutationFn: (payload: {
        accountNumber: string
        accountName: string
        bankName: string
        bankCode: string
        currency: string
      }) => saveBankAccount(payload),

      onSuccess: () => {
        toast.add({
          title: 'Bank Account Saved',
        })
        router.push('/brands/profile')
      },

      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          'An unexpected error occurred'

        toast.add({
          title: 'Save Failed',
          description: message,
        })
      },
    })

  // ✅ Expose all hooks
  return {
    useGetBanksQuery,
    useGetBankAccountQuery,
    useValidateAccountMutation,
    useSaveBankAccountMutation,
  }
}
