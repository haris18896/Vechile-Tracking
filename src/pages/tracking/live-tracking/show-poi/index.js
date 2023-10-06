import React from 'react'
import ShowPOI from 'src/views/tracking/live-tracking/show-poi/show-poi'

function Poi() {
  return (
    <>
      <ShowPOI />
    </>
  )
}

Poi.acl = {
  action: 'manage',
  subject: 'manage-live-tracking-show-poi'
}

Poi.AuthGuard = true

export default Poi
