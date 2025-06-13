// ~/composables/useLogin.ts
import { useMutation } from '@tanstack/vue-query'
import { logBrand, signUpBrand,verifyBrand,forgotPassword, resetPassword,resetOtp } from '@/api/brand/auth';
import { useUserStore } from '@/stores/userStore'


export const useBrandAuth = () => {

  const toast = useToast()
  const userStore = useUserStore();
  const router = useRouter()
  const isCooldown =ref(false)
    const {
        mutate: brandLogin,
        isPending: isLogging
    } =  useMutation({
        mutationFn: (payload: { email: string; password: string }) => logBrand(payload),

        onSuccess: (data) => {
            console.log('Login response:', data)
            toast.add({
                title: 'Login Successful',
                description: `Welcome back, ${data.user.email}`,
            })

            userStore.setUser(data.user)
            userStore.setAccessToken(data.token)

            router.push('/brands/dashboard')
        },

        onError: (error: any, variables) => {
            console.log(error)
            const message =
                error?.response?.data?.message ||
                error?.message ||
                'An unexpected error occurred'
            if(error?.response?.data?.message == "Email not verified" ||
                error?.message == "Email not verified" || error.code =="EE_UNVERIFIED_EMAIL" || error?.response?.data?.code == "EE_UNVERIFIED_EMAIL" ){
                  userStore.unverifiedEmail = variables.email
                  router.push('/brands/dashboard')
                }
            toast.add({
                title: 'Login Failed',
                description: message,
            })
        },
  })

  const {
  mutate: brandSignUp,
  status,
  isPending
} =  useMutation({
    mutationFn: (payload: { email: string,
    brandName: string,
    password: string,
    contactPersonName: string,
    contactPersonPhone: string}) => signUpBrand(payload),

    onSuccess: (data,variables) => {
      console.log('Login response:', data)
      userStore.unverifiedEmail = variables.email
      toast.add({
        title: 'Verify email',
      })

      userStore.setUser(data.user)
      router.push('/brands/verify')
    },

    onError: (error: any) => {
      console.log(error)
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'An unexpected error occurred'
      toast.add({
        title: 'Signup Failed',
        description: message,
      })
    },
  })


  //Authenticate a brand with their otp
    const {
        mutate: authenticateBrand,
        isPending: pendingBrand
    } =  useMutation({
        mutationFn: (payload: { email: string,
        otp: string}) => verifyBrand(payload),

        onSuccess: (data) => {
            console.log('Login response:', data)
            toast.add({
                title: 'Verification complete',
            })

            router.push('/brands')
        },

        onError: (error: any) => {
            console.log(error)
            const message =
                error?.response?.data?.message ||
                error?.message ||
                'An unexpected error occurred'
            toast.add({
                title: 'Signup Failed',
                description: message,
            })
        },
    })


    //Brand forgot password email
    const {
        mutate: forgotBrandPassword,
        isPending: pendingPass
    } =  useMutation({
        mutationFn: (payload: { email: string}) => forgotPassword(payload),

        onSuccess: (data,variables) => {
            console.log('Login response:', data)
            userStore.unverifiedEmail = variables.email
            toast.add({
                title: 'Code sent to email address',
            })

            router.push('/brands/new-password')
        },

        onError: (error: any) => {
            console.log(error)
            const message =
                error?.response?.data?.message ||
                error?.message ||
                'An unexpected error occurred'
            toast.add({
                title: 'Reset Failed',
                description: message,
            })
        },
    })



    //Confirming brands password reset
    const {
        mutate: confirmPasswordReset,
        isPending: pendingPassReset
    } =  useMutation({
    mutationFn: (payload: { email: string, otp:string, newPassword:string}) => resetPassword(payload),

     onSuccess: (data) => {
      console.log('Login response:', data)
      toast.add({
        title: 'Password reset successfully',
      })

      router.push('/brands/')
    },

    onError: (error: any) => {
      console.log(error)
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'An unexpected error occurred'
      toast.add({
        title: 'Reset Failed',
        description: message,
      })
    },
  })

  //Resending OTP
    const {
        mutate: resendOtp,
        
    } =  useMutation({
    mutationFn: (payload: { email: string}) => resetOtp(payload),

     onSuccess: (data) => {
      console.log('Login response:', data)
      toast.add({
        title: 'Password reset successfully',
      })
        isCooldown.value = true
        setTimeout(() => {
        isCooldown.value = false
        }, 30_000)
      router.push('/brands/')
    },

    onError: (error: any) => {
      console.log(error)
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'An unexpected error occurred'
      toast.add({
        title: 'Reset Failed',
        description: message,
      })
    },
  })

  
  return {
    brandLogin,
    brandSignUp,
    authenticateBrand,
    forgotBrandPassword,
    resendOtp,
    pendingBrand,
    confirmPasswordReset,
    pendingPassReset,
    pendingPass,
    isCooldown,
    status,
    isPending,
    isLogging
  }
}

