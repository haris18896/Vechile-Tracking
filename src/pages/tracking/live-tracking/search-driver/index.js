import React from 'react'
import SearchDriver from 'src/views/tracking/live-tracking/driver/search-driver'
import Navigation from 'src/views/tracking/live-tracking/navigation/navigation'

function Search() {
  return (
    <>
      <SearchDriver />
    </>
  )
}

Search.acl = {
  action: 'manage',
  subject: 'manage-live-tracking-search-driver'
}

Search.AuthGuard = true

export default Search
