import React from 'react'
import Garage from 'src/views/tracking/live-tracking/garage/garage'
import PoliceStation from 'src/views/tracking/live-tracking/police-station/police-station'


function Search() {
  return (
    <>
        <PoliceStation />
    </>
  )
}

Search.acl = {
  action: 'manage',
  subject: 'manage-police-station'
}

export default Search
