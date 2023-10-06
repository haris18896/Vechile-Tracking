import { Circle, Polygon, Rectangle } from '@react-google-maps/api'
import React from 'react'

const ShowGeofence = ({ showGeofenceVal }) => {
  // ** Style Options Like Draw GeoFence
  const styleOptions = {
    fillColor: `#db1617`,
    fillOpacity: 0.45,
    strokeWeight: 4,
    strokeOpacity: 0.7,
    clickable: false,
    editable: true,
    zIndex: 1,
    strokeColor: `#d5d5d4`
  }

  return showGeofenceVal?.map(list => {
    return list.type === 'polygon' ? (
      <Polygon options={styleOptions} paths={list?.cords} path={list?.cords} />
    ) : list.type === 'circle' ? (
      <Circle options={styleOptions} radius={list?.radius} center={list?.cords} />
    ) : list.type === 'rectangle' ? (
      <Rectangle options={styleOptions} bounds={list?.cords} />
    ) : null
  })
}

export default ShowGeofence
