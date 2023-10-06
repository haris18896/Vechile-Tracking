import { useRef, useState } from 'react'

// ** Next Imports
import Image from 'next/image'

// ** Google Maps Drawing Library
import { DrawingManager } from '@react-google-maps/api'

// ** MUI Imports
import { Button, Grid } from '@mui/material'

// Custom Styles
import { useMapStyles } from 'src/styles/pages/tracking'

const DrawGeofence = ({ geofenceValues, changeGeofence, geofence, getGeofencePoints, geofenceRef }) => {
  // ** Set Drawing Mode to the Required type -- Rectangle, Circle or Polygon
  const [drawingMode, setDrawingMode] = useState(null)

  // ** Map Styles
  const mapStyles = useMapStyles()

  // ** Function Too Be Executed When Drawing Done
  const onOverLayComplete = e => {
    if (geofenceRef.current) geofenceRef.current.setMap(null)

    // ** Circle
    if (e.type === 'circle') {
      // ** Getting address of the center
      new window.google.maps.Geocoder().geocode({ location: e.overlay.getCenter().toJSON() }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const address = results[0].formatted_address
          console.log(address)

          // Call your function to handle the address here
          getGeofencePoints(
            {
              type: e.type,
              cords: e.overlay.getCenter().toJSON(),
              radius: e.type === 'circle' ? e.overlay.getRadius() : null
            },
            address
          )
        } else {
          console.error('Reverse geocoding failed:', status)
        }
      })
      geofenceRef.current = e.overlay
    }
    // ** Rectangle
    if (e.type === 'rectangle') {
      // ** Destructure the bounds of the corner
      const bounds = e.overlay.getBounds()

      // ** Calculate Center of the Rectangle
      const center = {
        lat: (bounds.getNorthEast().lat() + bounds.getSouthWest().lat()) / 2,
        lng: (bounds.getNorthEast().lng() + bounds.getSouthWest().lng()) / 2
      }

      // ** Get the address of the centre of triangle
      new window.google.maps.Geocoder().geocode({ location: center }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const address = results[0].formatted_address

          getGeofencePoints(
            {
              type: e.type,
              cords: bounds,
              center: center
            },
            address
          )
        } else {
          console.error('Reverse geocoding failed:', status)
        }
      })

      geofenceRef.current = e.overlay
    }

    // ** For Shape with more then 2 cordinates
    if (e.type === 'polygon') {
      // ** Destructure path return all the coordinates in an array
      const path = e.overlay.getPath()

      const coordinates = path.getArray().map(x => ({
        lat: x.lat(),
        lng: x.lng()
      }))

      console.log(path, '+', coordinates)

      // ** Function return Center for polygon
      const center = calculatePolygonCenter(coordinates)

      // ** Getting addres of the center
      new window.google.maps.Geocoder().geocode({ location: center }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const address = results[0].formatted_address

          getGeofencePoints(
            {
              type: e.type,
              cords: coordinates,
              center: center
            },
            address
          )
        } else {
          console.error('Reverse geocoding failed:', status)
        }
      })

      geofenceRef.current = e.overlay
    }
  }

  // ** CSS Properties For The Drawing Svgs for -- Rectangle Circle and Polygon
  const overlayProps = {
    drawingControl: false,
    circleOptions: {
      fillColor: `#db1617`,
      fillOpacity: 0.45,
      strokeWeight: 4,
      strokeOpacity: 0.7,
      clickable: false,
      editable: true,
      zIndex: 1,
      strokeColor: `#d5d5d4`
    },
    polygonOptions: {
      fillColor: `#db1617`,
      fillOpacity: 0.45,
      strokeWeight: 4,
      strokeOpacity: 0.7,
      clickable: false,
      editable: true,
      zIndex: 1,
      strokeColor: `#d5d5d4`
    },
    rectangleOptions: {
      fillColor: `#db1617`,
      fillOpacity: 0.45,
      strokeWeight: 4,
      strokeOpacity: 0.7,
      clickable: false,
      editable: true,
      zIndex: 1,
      strokeColor: `#d5d5d4`
    }
  }

  return (
    <>
      <DrawingManager
        onLoad={e => console.log(e)}
        drawingMode={drawingMode}
        options={overlayProps}
        onOverlayComplete={onOverLayComplete}
      />
      <Grid
        container
        className={mapStyles.geofence}
        sx={{ width: 'max-content', gap: '15px', background: '#0F224B', padding: '0.8rem', borderRadius: '50px' }}
      >
        {geofence.map((item, index) => (
          <Grid
            item
            key={item.id}
            sx={{ background: geofenceValues === item.type ? '#FF8B00' : '#F4F8F81A', borderRadius: '50%' }}
          >
            <Button
              sx={{ width: '45px', height: '45px', minWidth: 'unset' }}
              onClick={() => {
                if (geofenceRef.current) geofenceRef.current.setMap(null)
                changeGeofence(item.type)
                setDrawingMode(item.type)
              }}
            >
              <Image src={item.icon} alt={item.title} width={index === 0 ? 12 : 18} height={index === 0 ? 12 : 18} />
            </Button>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

function calculatePolygonCenter(coordinates) {
  const len = coordinates.length
  let x = 0
  let y = 0
  for (let i = 0; i < len; i++) {
    x += coordinates[i].lng
    y += coordinates[i].lat
  }
  x /= len
  y /= len

  return { lat: y, lng: x }
}

export default DrawGeofence
