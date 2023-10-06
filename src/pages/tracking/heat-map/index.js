import React from 'react'
import HeatMapMain from 'src/views/tracking/heat-map/heat-map'
import DetailedTracking from "../detailed-tracking";

function HeatMap() {
  return (
    <>
      <HeatMapMain />
    </>
  )
}

export default HeatMap

HeatMap.acl = {
  action: 'manage',
  subject: 'manage-heat-map'
}

HeatMap.AuthGuard = true
