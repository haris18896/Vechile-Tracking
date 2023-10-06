import React from 'react'
import DistanceMeasure from 'src/views/tracking/live-tracking/distance-measure/distance-measure'


function Distance() {
  return (
    <>
        <DistanceMeasure />
    </>
  )
}

Distance.acl = {
  action: 'manage',
  subject: 'manage-distance-measure'
}

export default Distance
