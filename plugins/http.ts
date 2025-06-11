import axios from 'axios'
import { useUserStore } from '@/stores/userStore'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const userStore = useUserStore() // ✅ correct usage in plugin

  const instance = axios.create({
    baseURL: config.public.API_URL as string,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  instance.interceptors.request.use((request) => {
    const token = userStore.accessToken

    const isAuthRoute = ['/auth','onboarding'].some((path) =>
      request.url?.includes(path)
    )

    if (token && !isAuthRoute) {
      request.headers.Authorization = `Bearer ${token}`
    }

    return request
  })

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // userStore.logout()
        console.log("Unauthorized error")
      }
      return Promise.reject(error)
    }
  )

  return {
    provide: {
      http: instance,
    },
  }
})
