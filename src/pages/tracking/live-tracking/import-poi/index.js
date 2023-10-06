import React from 'react'
import ImportPOI from 'src/views/tracking/live-tracking/import-poi/import-poi'

function Poi() {
  return (
    <>
      <ImportPOI />
    </>
  )
}

Poi.acl = {
  action: 'manage',
  subject: 'manage-live-tracking-import-poi'
}
Poi.AuthGuard = true

export default Poi
