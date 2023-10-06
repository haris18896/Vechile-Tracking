import React from 'react'

import LiveTravelersMap from 'src/views/tracking/live-travelers/live-travelers-map'

function LiveTravelers() {
  return <LiveTravelersMap />
}

export default LiveTravelers

LiveTravelers.acl = {
  action: 'manage',
  subject: 'manage-live-travers'
}

LiveTravelers.AuthGuard = true
