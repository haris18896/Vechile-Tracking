import { toast } from 'react-hot-toast'

export const isObjEmpty = obj => Object.keys(obj).length === 0

export const writeToClipboard = async text => {
  // await Clipboard.setString(text)
  try {
    await navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy!', err)
  }
}

export const readFromClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText()

    return text
  } catch (err) {
    console.error('Failed to read clipboard contents: ', err)
  }
}

export const checkIfWithinFence = (currentLatitude, currentLongitude) => {
  for (const fence of dummyData) {
    const distance = getDistanceFromLatLonInKm(currentLatitude, currentLongitude, fence.latitude, fence.longitude)
    if (distance <= fence.radius / 1000) {
      setIsWithinFence(true)

      return
    }
  }
  setIsWithinFence(false)
}

export const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c

  return d
}

export const deg2rad = deg => {
  return deg * (Math.PI / 180)
}

export const handleKeyPress = event => {
  if (event.key === ' ' && !event.target.value) {
    // prevent space character from being entered
    event.preventDefault()
  }
}
