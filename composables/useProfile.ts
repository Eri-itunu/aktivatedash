import { useMutation, useQuery } from '@tanstack/vue-query'
import { getCountries, getStates, getProfile ,createUpdateProfile} from '@/api/creator/profile.creator'
import { useUserStore } from '@/stores/userStore'
import type { updateBody } from '@/api/creator/profile.creator'

export const useProfile = () => {
    const toast = useToast()

    const {
    data: profileData,
    isLoading: loadingProfile,
    error: profileError,
    } = useQuery({
    queryKey: ['get-profile'],
    queryFn: getProfile,
   
    });

    const {
    data: countryData,
    isLoading: loadingCountries,
    error: countryError,
    } = useQuery({
    queryKey: ['get-countries'],
    queryFn: getCountries,
    
    });


    const { mutate: getCountryState, isPending, data } = useMutation({
        mutationFn: ({ countryCode }: { countryCode?: string } = {}) => getStates(countryCode),
        onSuccess: (data) => {
            
        },
        onError: ()=>{
            toast.add({title: "Unable to fetch states, please try again later"})
        }
       
    })

    const { mutate: updateProfile, isPending:updatePending } = useMutation({
        mutationFn: (payload: updateBody) =>
            createUpdateProfile(payload),
        onSuccess: (data) => {
            toast.add({
                title: "Updated successfully "
            })
        },
        onError(error, variables, context) {
            toast.add({
                title: "Updated failed "
            })
        },
    })




    return{
        profileData,
        loadingProfile,
        countryData,
        loadingCountries,
        getCountryState,
        isPending,
        data,
        updateProfile,
        updatePending
    }
}