
import { useToast } from "@/components/ui/toast/use-toast";

export default defineNuxtRouteMiddleware((to, from) => {
    const user = useUserStore() 
    const { toast } = useToast();
    if (!user?.userProfile?.hasCollaborationHub) {
        toast({variant: 'destructive', title:"You don't have access to this feature. Contact our support team to upgrade your access" });
        return navigateTo('/brands/dashboard') 
    }
  })
 
