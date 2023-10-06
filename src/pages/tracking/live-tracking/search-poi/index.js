import React from 'react'
import SearchPOI from 'src/views/tracking/live-tracking/search-poi/search-poi'

function Poi() {
  return (
    <>
      <SearchPOI />
    </>
  )
}

export default Poi

Poi.acl = {
  action: 'manage',
  subject: 'manage-live-tracking-search-poi'
}

Poi.AuthGuard = true
