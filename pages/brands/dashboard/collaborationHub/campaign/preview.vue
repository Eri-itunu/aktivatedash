<script setup lang="ts">
    definePageMeta({
        layout: "light",
    });


    import { useToast } from "@/components/ui/toast/use-toast";
    const { toast } = useToast();
    import { ArrowLeft, Plus } from 'lucide-vue-next';
    import { format } from "date-fns";
    import { QuillEditor } from '@vueup/vue-quill';
    import '@vueup/vue-quill/dist/vue-quill.snow.css';
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import axios from "axios";



    const createCollaboration = useCollabHubStore();
    const loading = ref(false);
    const userStore = useUserStore();
    const config = useRuntimeConfig();
    const API_URL = config.public.API_URL;
    


</script>
<template>
    <div  class=" text-black dark:text-white p-8 flex flex-col gap-8 min-h-screen bg-[#F5F5F5] dark:bg-dashbg " >

        <nuxt-link to="/brands/dashboard/collaborationHub/campaign" >
            <ArrowLeft />
        </nuxt-link>
        
        <BrandsCHubStage :campaign="true" :requirements="true" :deliverables="true" :compensation="true" />

    </div>

</template>