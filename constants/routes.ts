
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/creator-signup',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },  

  PLATFORMS: {
    GET_LINK_REQUEST: '/platform/platform-link-request',
    VERIFY_PLATFORM: (requestId: string) => `/platform/platform-link-request/${requestId}/verify`,
    POST_LINK_REQUEST: '/platform/platform-link-request',
    GET_PLATFORM_PROFILES : '/platform/get-my-platform-profiles'
  },
}
