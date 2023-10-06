import React from 'react'
import SearchAddress from 'src/views/tracking/live-tracking/address'
import SearchAsset from 'src/views/tracking/live-tracking/asset/search-asset'
import SearchDriver from 'src/views/tracking/live-tracking/driver/search-driver'
import Navigation from 'src/views/tracking/live-tracking/navigation/navigation'

function Search() {
  return (
    <>
      <SearchAddress />
    </>
  )
}

Search.acl = {
  action: 'manage',
  subject: 'manage-live-tracking-search-address'
}

Search.AuthGuard = true

export default Search
