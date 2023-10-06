import React from 'react'
import CreatePOI from 'src/views/tracking/live-tracking/create-poi/create-poi'
import NearestAsset from 'src/views/tracking/live-tracking/nearest-asset/nearest-asset'

function Search() {
  return (
    <>
      <NearestAsset />
    </>
  )
}

Search.acl = {
  action: 'manage',
  subject: 'manage-live-tracking-nearest-asset'
}

Search.AuthGuard = true

export default Search
