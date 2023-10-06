import React from 'react'
import ShowGeofence from 'src/views/tracking/live-tracking/show-geofence/show-geofence'

function Geofence() {
  return (
    <>
      <ShowGeofence />
    </>
  )
}

Geofence.acl = {
  action: 'manage',
  subject: 'manage-live-tracking-show-geofence'
}

Geofence.AuthGuard = true

export default Geofence
