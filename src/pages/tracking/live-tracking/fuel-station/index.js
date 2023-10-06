import React from 'react'
import FuelStation from 'src/views/tracking/live-tracking/fuel-station/fuel-station'


function Search() {
  return (
    <>
        <FuelStation />
    </>
  )
}

Search.acl = {
  action: 'manage',
  subject: 'manage-fuel-station'
}

export default Search
