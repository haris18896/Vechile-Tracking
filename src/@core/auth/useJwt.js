// ** JWT Service Import
import JwtService from './jwtServices'

// ** Export Service as useJwt
export default function useJwt(jwtOverrideConfig) {
  const jwt = new JwtService(jwtOverrideConfig)
  
return {
    jwt
  }
}

