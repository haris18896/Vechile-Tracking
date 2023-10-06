// GoogleMapLoader.js
import { useJsApiLoader } from '@react-google-maps/api'

const GoogleMapLoader = ({ children }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCpw_-yCs_z9hcqqp4-n-QKnE1REYOBFJo',
    libraries: ['drawing', 'places']
  })

  return children(isLoaded)
}

export default GoogleMapLoader
