/* eslint-disable react/no-deprecated */
import React, { createClass } from 'react'
import { withGoogleMap, withScriptjs, GoogleMap, Polyline, Marker } from 'react-google-maps'
import cloneDeep from 'lodash/cloneDeep'

const car =
  'M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z'

const icon = {
  path: car,
  scale: 0.7,
  strokeColor: 'white',
  strokeWeight: 0.1,
  fillOpacity: 1,
  fillColor: '#404040',
  offset: '5%',
  rotation: 240

  // anchor: new window.google.maps.Point(10, 10)
}

class GoogleMapComponent extends React.Component {
  constructor(props) {
    console.log('🚀 ~ file: map.js:23 ~ GoogleMapComponent ~ constructor ~ props:', props)
    super(props)
    this.state = {
      progress: [],
      directions: null,
      myPath: [],
      simulating: false,
      path: props?.polylineData || [],
      stops: props?.polylineData || [],
      center: props?.center
    }
  }

  velocity = 100
  initialDate = new Date()

  getDistance = () => {
    // seconds between when the component loaded and now
    const differentInTime = (new Date() - this.initialDate) / 1000 // pass to seconds

    return differentInTime * this.velocity // d = v*t -- thanks Newton!
  }

  componentDidMount = () => {
    this.interval = window.setInterval(this.moveObject, 1000)
  }

  componentWillUnmount = () => {
    window.clearInterval(this.interval)
  }

  moveObject = () => {
    this.setState({ progress: [] })
    const distance = this.getDistance()
    if (!distance) {
      return
    }

    let progress = this.state.path.filter(coordinates => coordinates.distance < distance)

    const nextLine = this.state.path.find(coordinates => coordinates.distance > distance)

    if (!nextLine) {
      this.setState({ progress })
      window.clearInterval(this.interval)

      return // it's the end!
    }
    const lastLine = progress[progress.length - 1]

    const lastLineLatLng = new window.google.maps.LatLng(lastLine.lat, lastLine.lng)

    const nextLineLatLng = new window.google.maps.LatLng(nextLine.lat, nextLine.lng)

    // distance of this line
    const totalDistance = nextLine.distance - lastLine.distance
    const percentage = (distance - lastLine.distance) / totalDistance

    const position = window.google.maps.geometry.spherical.interpolate(lastLineLatLng, nextLineLatLng, percentage)

    progress = progress.concat(position)
    this.setState({ progress })
  }

  componentWillMount = () => {
    this.calculatePath()
  }
  calculatePath = () => {
    this.setState(prevState => {
      return {
        path: prevState.path.map((coordinates, i, array) => {
          if (i === 0) {
            return { ...coordinates, distance: 0 } // it begins here!
          }

          const { lat: lat1, lng: lng1 } = coordinates
          const latLong1 = new window.google.maps.LatLng(lat1, lng1)

          const { lat: lat2, lng: lng2 } = array[0]
          const latLong2 = new window.google.maps.LatLng(lat2, lng2)

          // in meters:
          const distance = window.google.maps.geometry.spherical.computeDistanceBetween(latLong1, latLong2)

          return { ...coordinates, distance }
        })
      }
    })
  }

  startSimmulator = () => {
    this.setState(
      {
        progress: [],
        simulating: true
      },
      () => {
        window.clearInterval(this.interval)
        this.interval = 0
        this.calculatePath()
        this.interval = window.setInterval(this.moveObject, 500)
      }
    )
  }
  toggleSimulation = () => {
    if (this.state.simulating) {
      // If simulating, stop it
      window.clearInterval(this.interval)
      this.setState({ simulating: false, progress: [] })
    } else {
      // If not simulating, start it
      this.startSimmulator()
    }
  }
  componentDidUpdate = () => {
    const distance = this.getDistance()
    if (!distance) {
      return
    }
    if (!this.state.startTracking) return

    let progress = this.state.path.filter(coordinates => coordinates.distance < distance)

    const nextLine = this.state.path.find(coordinates => coordinates.distance > distance)

    let point1, point2

    if (nextLine) {
      point1 = progress[progress.length - 1]
      point2 = nextLine
    } else {
      // it's the end, so use the latest 2
      point1 = progress[progress.length - 2]
      point2 = progress[progress.length - 1]
    }

    const point1LatLng = new window.google.maps.LatLng(point1.lat, point1.lng)
    const point2LatLng = new window.google.maps.LatLng(point2.lat, point2.lng)

    const angle = window.google.maps.geometry.spherical.computeHeading(point1LatLng, point2LatLng)
    const actualAngle = angle - 90

    const markerUrl =
      'https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png'
    const marker = document.querySelector(`[src="${markerUrl}"]`)

    if (marker) {
      // when it hasn't loaded, it's null
      marker.style.transform = `rotate(${actualAngle}deg)`
    }
  }

  render = () => {
    const icon1 = {
      url: 'https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png',
      scaledSize: new window.google.maps.Size(30, 30),

      // anchor: { x: 10, y: 10 },
      anchor: new window.google.maps.Point(15, 15),
      scale: 0.7
    }

    return (
      <>
        <GoogleMap defaultZoom={16} defaultCenter={{ lat: this.state.center.lat, lng: this.state.center.lng }}>
          {/* <button onClick={this.startSimmulator}>Start Simmulator</button> */}
          {/* <button onClick={this.toggleSimulation}>
            {this.state.simulating ? 'Stop Simulator' : 'Start Simulator'}
          </button> */}
          <Polyline
            traffic={new window.google.maps.TrafficLayer()}
            path={this.state.path}
            options={{
              strokeColor: '#0088FF',
              strokeWeight: 6,
              strokeOpacity: 0.6
            }}
          />

          {this.state.stops.map((stop, index) => (
            <>
              <Marker
                key={stop.id}
                position={{
                  lat: stop.lat,
                  lng: stop.lng
                }}
                title={stop.id}
                label={`${index + 1}`}
              />
            </>
          ))}

          {this.state.progress && (
            <>
              <Polyline path={this.state.progress} options={{ strokeColor: 'red' }} />

              <Marker icon={icon1} position={this.state.progress[this.state.progress.length - 1]} />
            </>
          )}
          {/* <TrafficLayer autoUpdate /> */}
        </GoogleMap>
      </>
    )
  }
}

export const LiveMapComponent = withScriptjs(withGoogleMap(GoogleMapComponent))

export const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA5Lt3E5gYb-lfogvaSpCrvCpocLqHwNOI`

// export default () => (
//   <MapComponent
//     googleMapURL={mapURL}
//     loadingElement={<div style={{ height: `100%` }} />}
//     containerElement={<div style={{ height: `600px`, width: '600px' }} />}
//     mapElement={<div style={{ height: `100%` }} />}
//   />
// )
