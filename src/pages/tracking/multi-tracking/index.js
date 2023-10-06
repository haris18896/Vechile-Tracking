import React from 'react'
import MultiTrackingMap from 'src/views/tracking/multi-tracking/multi-tracking'

function MultiTracking() {
  return <MultiTrackingMap />
}

export default MultiTracking

MultiTracking.acl = {
  action: 'manage',
  subject: 'manage-multi-tracking'
}

MultiTracking.AuthGuard = true
