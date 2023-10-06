import React from 'react'
import DrawGeofence from 'src/views/tracking/live-tracking/draw-geofence/draw-geofence'

function Geofence() {
  return (
    <>
      <DrawGeofence />
    </>
  )
}

Geofence.acl = {
  action: 'manage',
  subject: 'manage-live-tracking-draw-geofence'
}

Geofence.AuthGuard = true

export default Geofence
