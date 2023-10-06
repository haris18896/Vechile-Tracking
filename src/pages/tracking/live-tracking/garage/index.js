import React from 'react'
import Garage from 'src/views/tracking/live-tracking/garage/garage'


function Search() {
  return (
    <>
        <Garage />
    </>
  )
}

Search.acl = {
  action: 'manage',
  subject: 'manage-garage'
}

export default Search
