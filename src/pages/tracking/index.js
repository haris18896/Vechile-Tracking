import React from 'react'

import LiveTracking from 'src/views/tracking/live-tracking'
import Dashboard from '../dashboard'

function Tracking() {
  return (
    <>
      <LiveTracking />
    </>
  )
}

export default Tracking

Tracking.acl = {
  action: 'manage',
  subject: 'manage-live-tracking'
}

Tracking.AuthGuard = true
