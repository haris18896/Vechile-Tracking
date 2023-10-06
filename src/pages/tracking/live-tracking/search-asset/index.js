import React from 'react'
import SearchAsset from 'src/views/tracking/live-tracking/asset/search-asset'
import SearchDriver from 'src/views/tracking/live-tracking/driver/search-driver'
import Navigation from 'src/views/tracking/live-tracking/navigation/navigation'

function Search() {
  return (
    <>
        <SearchAsset />
    </>
  )
}

Search.acl = {
  action: 'manage',
  subject: 'manage-live-tracking-search-asset'
}

Search.AuthGuard = true

export default Search
