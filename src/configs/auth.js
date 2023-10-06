import { MAIN_URL } from './constants'

export default {
  meEndpoint: '/auth/me',
  loginEndpoint: `${MAIN_URL}/login`,
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
