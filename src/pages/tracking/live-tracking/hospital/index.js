import React from 'react'
import Hospital from 'src/views/tracking/live-tracking/hospital/hospital'

function Search() {
  return (
    <>
        <Hospital />
    </>
  )
}

Search.acl = {
  action: 'manage',
  subject: 'manage-hospital'
}

export default Search
