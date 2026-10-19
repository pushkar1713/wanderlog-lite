/**
 * API configuration for the WanderLog backend.
 *
 * Set `EXPO_PUBLIC_API_URL` in your environment to point to the running
 * backend server. Defaults to the standard local Go backend port.
 */

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://w-backend-phi.vercel.app';

export const API_ENDPOINTS = {
  auth: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
  places: {
    nearbySearch: '/places/search/nearby',
    textSearch: '/places/search/text',
    details: (placeId: string) => `/places/${encodeURIComponent(placeId)}/details`,
    photo: '/places/photo',
  },
} as const;
