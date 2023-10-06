import React from 'react'
import CreatePOI from 'src/views/tracking/live-tracking/create-poi/create-poi'

function Poi() {
  return (
    <>
      <CreatePOI />
    </>
  )
}

Poi.acl = {
  action: 'manage',
  subject: 'manage-live-tracking-create-poi'
}

Poi.AuthGuard = true

export default Poi
