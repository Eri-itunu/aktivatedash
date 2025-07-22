<template>
  <div class="flex flex-wrap flex-row gap-4 items-start">
    <!-- Uploaded Images with delete -->
    <div
      class="relative w-[300px] h-[200px] rounded overflow-hidden border border-gray-300 group"
    >
      <img :src="createCollaboration.fileUrl" class="object-scale-down w-full h-full" />

      <!-- Delete button -->
      <button
        @click="removeImage()"
        class="absolute top-0 right-0 m-1 h-8 w-8 rounded-full bg-black/50 hover:bg-black text-white p-0.5"
        title="Remove"
      >
        ✕
      </button>
    </div>

    <!-- Upload Dropzone -->
    <label
      v-if="createCollaboration.fileUrl.length < 1"
      class="w-[300px] h-[200px] border-2 border-dashed border-purple1 flex items-center justify-center cursor-pointer rounded-md text-purple1 hover:bg-purple1/10 relative"
    >
      <input
        type="file"
        accept="image/*"
        class="hidden"
        @change="onSelectFile"
      />
      <template v-if="isPending">
        <svg class="animate-spin h-6 w-6 text-purple1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      </template>
      <template v-else>
        <span class="text-xs text-center">Upload</span>
      </template>
    </label>
  </div>
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { API_ROUTES } from "@/constants/routes";
import type { AxiosResponse } from 'axios'
import type { APIResponse} from "types";
import { useToast } from '@/.nuxt/imports';
const createCollaboration = useCollabHubStore();

// Bound model from parent

const toast = useToast()

// Upload function
const uploadImage = async (file: File): Promise<string> => {
  const { $http } = useNuxtApp()
  const formData = new FormData()
  formData.append('file', file)
  createCollaboration.imageUrl = file[0]
    const http = $http as import('axios').AxiosInstance;
  const res: AxiosResponse<APIResponse<'url', string>> = await http.post(
    API_ROUTES.UPLOAD ,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  )

  return res.data.data.url
}

// Mutation handler
const { mutate: uploadMutate, isPending } = useMutation({
  mutationFn: uploadImage,
  onSuccess: (imageUrl) => {
    createCollaboration.fileUrl = imageUrl
  },
  onError: (error) => {
    toast.add({ title: error?.response?.data.message || 'Upload failed' })
  },
})

// File input handler
const onSelectFile = (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (!files?.length) return


  uploadMutate(files[0])
}

// Remove image
const removeImage = () => {
  createCollaboration.imageUrl = null;
  createCollaboration.fileUrl = "";
}
</script>

<style scoped>
input[type='file']::-webkit-file-upload-button {
  visibility: hidden;
}
</style>
