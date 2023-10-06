import React from 'react'
import ImportGeofence from 'src/views/tracking/live-tracking/import-geofence/import-geofence'

function Geofence() {
  return (
    <>
      <ImportGeofence />
    </>
  )
}

Geofence.acl = {
  action: 'manage',
  subject: 'manage-live-tracking-import-geofence'
}

Geofence.AuthGuard = true

export default Geofence
