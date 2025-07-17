import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const instance = axios.create({
    baseURL: config.public.API_URL as string,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  instance.interceptors.request.use((request) => {
    const userStore = useUserStore() // moved inside
    const token = userStore.accessToken

    const isAuthRoute = ['/auth', 'onboarding'].some((path) =>
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
      console.error('Axios error:', error.message)
      if (error.code === 'ECONNRESET') {
        console.error('🔌 Connection reset by peer')
      }

      if (error.response?.status === 401) {
        console.log('Unauthorized error')
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
