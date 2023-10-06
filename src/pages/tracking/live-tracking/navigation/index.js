import React from 'react'
import CreatePOI from 'src/views/tracking/live-tracking/create-poi/create-poi'
import Navigation from 'src/views/tracking/live-tracking/navigation/navigation'
import NearestAsset from 'src/views/tracking/live-tracking/nearest-asset/nearest-asset'

function Search() {
  return (
    <>
      <Navigation />
    </>
  )
}

Search.acl = {
  action: 'manage',
  subject: 'manage-live-tracking-navigation'
}

Search.AuthGuard = true

export default Search
