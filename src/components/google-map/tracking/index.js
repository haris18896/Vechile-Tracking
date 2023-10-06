import React, { useState, useEffect, useRef } from 'react'

// ** Google Map API
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api'

// ** Spinner
import FallbackSpinner from 'src/@core/components/spinner'

import ButtonIcon from 'src/components/buttons/ButtonIcon'
import { StyledSpeedDial, useMapStyles } from 'src/styles/pages/tracking'
import { Box, Button, Grid, SpeedDialAction, SpeedDialIcon, Typography } from '@mui/material'

import { Icon } from '@iconify/react'

import { useRouter } from 'next/router'
import Image from 'next/image'

import ReactSpeedometer from 'react-d3-speedometer'

const containerStyle = {
  width: '100%',
  height: '100%'
}

function TrackingGoogleMapComponent({
  zoom,
  center,
  mapClick,
  customContainer,
  children,
  tracking,
  heatMap,
  handleHeatMap,
  heatMapOptions,
  route,
  markers,
  liveTracking,
  trackingAlerts,
  handleOpen,
  geofence,
  changeGeofence,
  geofenceValues,
  speedometer,
  drawer,
  drawerWidth,
  vehicleCountTrackingLive
}) {
  const [count, setCount] = useState(0)
  const [hidden, setHidden] = useState(false)
  const [direction, setDirection] = useState('left')

  const mapRef = useRef(null)
  const mapStyles = useMapStyles()

  // Speed Dial States
  const [speedDial, setSpeedDial] = useState(false)
  const [speedDialAction, setSpeedDialAction] = useState({})

  const router = useRouter()

  const [mapButtons, setMapButtons] = useState({
    lock: false,
    transit: false,
    traffic: false
  })

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCpw_-yCs_z9hcqqp4-n-QKnE1REYOBFJo',
    libraries: ['drawing', 'places']
  })

  useEffect(() => {
    // ** controls the movement of the google control button to move them away when drawer is open
    if (isLoaded) {
      const gmControlContainer = document.querySelector('.gmnoprint')
      if (gmControlContainer && window.matchMedia('(min-width: 1200px)').matches) {
        if (drawer) {
          gmControlContainer.style.transition = '.3s ease'
          gmControlContainer.style.marginTop = '80px' // Adjust this value to move the button container up or down
          gmControlContainer.style.marginLeft = drawerWidth + 20 + 'px' // Adjust this value to move the button container left or right
        } else {
          gmControlContainer.style.marginTop = '10px'
          gmControlContainer.style.marginLeft = '10px'
        }
      }
    }
  }, [isLoaded, drawer, drawerWidth])

  useEffect(() => {
    if (mapRef.current) {
      // ** Calculate the optimal bounds that encompass all markers more then one
      if (markers && markers.length > 1) {
        const minLat = Math.min(...markers.map(marker => marker.latitude))
        const maxLat = Math.max(...markers.map(marker => marker.latitude))
        const minLng = Math.min(...markers.map(marker => marker.longitude))
        const maxLng = Math.max(...markers.map(marker => marker.longitude))

        const optimalBounds = {
          north: maxLat,
          south: minLat,
          east: maxLng,
          west: minLng
        }

        // ** Set the map's center and bounds to fit all markers
        mapRef.current.fitBounds(optimalBounds)
      }

      //** Setting the zoom for one marker
      if (markers && markers.length === 1) {
        const optimalBound = markers.map(e => {
          return {
            north: parseFloat(e.latitude),
            south: parseFloat(e.latitude),
            east: parseFloat(e.longitude),
            west: parseFloat(e.longitude)
          }
        })

        mapRef.current.fitBounds(optimalBound[0])
        mapRef.current.setZoom(20)
      }
    }
  }, [markers, mapRef])

  const actions = [
    { name: 'Copy', title: 'Toggle Heatmap', slug: 'heatmap' },
    { name: 'Save', title: 'Change Gradient', slug: 'gradient' },
    { name: 'Print', title: 'Change Opacity', slug: 'opacity' },
    { name: 'Share', title: 'Change Radius', slug: 'radius' }
  ]

  const LiveTrackingActions = [
    {
      src: '/images/icons/tracking-icons/trip.svg',
      name: 'createAssign',
      menu: [
        {
          title: 'Create/Assign Trip',
          src: '/images/icons/tracking-icons/create-assign-trip.svg',
          url: '/tracking/live-tracking/create-assign-trip'
        }
      ]
    },

    {
      src: '/images/icons/tracking-icons/measure.svg',
      name: 'distanceMeasure',
      menu: [
        {
          title: 'Distance Measure',
          src: '/images/icons/tracking-icons/distance-measure.svg',
          url: '/tracking/live-tracking/distance-measure'
        }
      ]
    },

    {
      src: '/images/icons/tracking-icons/search.svg',
      name: 'search',

      menu: [
        {
          title: 'Nearest Asset',
          src: '/images/icons/tracking-icons/nearest-asset.svg',
          url: '/tracking/live-tracking/nearest-asset'
        },
        { title: 'Garage', src: '/images/icons/tracking-icons/garage.svg', url: '/tracking/live-tracking/garage' },
        { title: 'Navigation', src: '/images/icons/tracking-icons/nav.svg', url: '/tracking/live-tracking/navigation' },
        { title: 'Clear Map', src: '/images/icons/tracking-icons/clear-map.svg', url: '/tracking' },
        {
          title: 'Driver',
          src: '/images/icons/tracking-icons/driver.svg',
          url: '/tracking/live-tracking/search-driver'
        },
        {
          title: 'Police Station',
          src: '/images/icons/tracking-icons/police-station.svg',
          url: '/tracking/live-tracking/police-station'
        },
        {
          title: 'Fuel Station',
          src: '/images/icons/tracking-icons/fuel-station.svg',
          url: '/tracking/live-tracking/fuel-station'
        },
        {
          title: 'Hospital',
          src: '/images/icons/tracking-icons/hospital-ic.svg',
          url: '/tracking/live-tracking/hospital'
        },
        {
          title: 'Search Asset',
          src: '/images/icons/tracking-icons/search-asset.svg',
          url: '/tracking/live-tracking/search-asset'
        },
        {
          title: 'Search Address',
          src: '/images/icons/tracking-icons/search-address.svg',
          url: '/tracking/live-tracking/search-address'
        }
      ]
    },

    {
      src: '/images/icons/tracking-icons/geofence.svg',
      name: 'geofence',
      menu: [
        {
          title: 'Draw Geofence',
          src: '/images/icons/tracking-icons/draw-geo.svg',
          url: '/tracking/live-tracking/draw-geofence'
        },
        {
          title: 'Show Geofence',
          src: '/images/icons/tracking-icons/show-geo.svg',
          url: '/tracking/live-tracking/show-geofence'
        },
        {
          title: 'Import From Excel',
          src: '/images/icons/tracking-icons/xls-ic.svg',
          url: '/tracking/live-tracking/import-geofence'
        }
      ]
    },

    {
      src: '/images/icons/tracking-icons/poi.svg',
      name: 'tracking',
      menu: [
        { title: 'Clear POI', src: '/images/icons/tracking-icons/clear-poi.svg' },
        {
          title: 'Search POI',
          src: '/images/icons/tracking-icons/search-poi.svg',
          url: '/tracking/live-tracking/search-poi'
        },
        {
          title: 'Import POI from KML',
          src: '/images/icons/tracking-icons/kml-ic.svg',
          url: '/tracking/live-tracking/import-poi'
        },
        {
          title: 'New POI',
          src: '/images/icons/tracking-icons/new-poi.svg',
          url: '/tracking/live-tracking/create-poi'
        },
        { title: 'Show POI', src: '/images/icons/tracking-icons/show-poi.svg', url: '/tracking/live-tracking/show-poi' }
      ]
    }
  ]

  if (count === 8227) setCount(0)
  if (!isLoaded) return <FallbackSpinner />

  return (
    <>
      <GoogleMap
        onLoad={map => (mapRef.current = map)}
        center={center}
        zoom={zoom}
        mapContainerStyle={customContainer ? customContainer : containerStyle}
        onClick={mapClick}
      >
        {/* Displaying Marker or directions here, here we can add as many marker as we want */}
        {children}
        {markers?.map((item, index) => {
          return (
            <Marker
              key={index}
              position={
                item?.lat
                  ? item?.lat
                  : {
                      lat: Number(item.latitude),
                      lng: Number(item.longitude)
                    }
              }
              options={{
                // animation: 4,
                icon: {
                  url: '/images/vehicles/blue.png',
                  scaledSize: new window.google.maps.Size(40, 40)
                }
              }}
              // icon={<MapMarker />}
            />
          )
        })}

        {(tracking || route) && (
          <Box sx={{ flexGrow: 1 }} mx={2}>
            <Grid
              container
              justifyContent='right'
              className={mapStyles.Map}
              wrap='wrap'
              sx={{ marginTop: { xs: '4rem', lg: 0 } }}
            >
              <Grid item xs={12} lg flexGrow='0 !important' textAlign='right'>
                <ButtonIcon
                  startIcon={mapButtons.lock ? 'material-symbols:lock' : 'material-symbols:lock'}
                  iconColor={mapButtons.lock ? '#fff' : '#FF8B00'}
                  color={mapButtons.lock ? 'darkBlueNoHover' : 'orange_outlined_white'}
                  onClick={() => setMapButtons({ ...mapButtons, lock: !mapButtons.lock })}
                >
                  {mapButtons.lock ? 'Unlock' : 'Lock'}
                </ButtonIcon>
              </Grid>
              {tracking && (
                <>
                  <Grid item xs={12} lg flexGrow='0 !important' textAlign='right'>
                    <ButtonIcon
                      startIcon={'ph:arrows-left-right'}
                      iconColor={mapButtons.transit ? '#fff' : '#FF8B00'}
                      color={mapButtons.transit ? 'darkBlueNoHover' : 'orange_outlined_white'}
                      onClick={() => setMapButtons({ ...mapButtons, transit: !mapButtons.transit })}
                    >
                      Transit
                    </ButtonIcon>
                  </Grid>
                  <Grid item xs={12} lg flexGrow='0 !important' textAlign='right'>
                    <ButtonIcon
                      startIcon={'material-symbols:traffic'}
                      iconColor={mapButtons.traffic ? '#fff' : '#FF8B00'}
                      color={mapButtons.traffic ? 'darkBlueNoHover' : 'orange_outlined_white'}
                      onClick={() => setMapButtons({ ...mapButtons, traffic: !mapButtons.traffic })}
                    >
                      Traffic
                    </ButtonIcon>
                  </Grid>

                  <Grid sx={{ marginLeft: '4rem' }}>
                    <Icon icon='radix-icons:enter-full-screen' />
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        )}

        {/* {dashboard && (
          <Grid sx={{ position: 'absolute', top: { xs: '70px', sm: '13px' }, left: { xs: '10px', sm: '230px' } }}>
            <ButtonIcon
              // sx={{
              //   background: '#FF454C1A !important',
              //   borderColor: '#FC3B61',
              //   '&.MuiButtonBase-root:hover': {
              //     background: '#FC3B61 !important'
              //   }
              // }}
              startIcon={'ic:round-remove-red-eye'}
              color='error-outlined'

              // onClick={() => }
            >
              Live Tracking
            </ButtonIcon>
          </Grid>
        )} */}

        {heatMap && (
          <Box className={mapStyles.HeatMap}>
            <StyledSpeedDial
              ariaLabel='Heat Map Speed dial'
              hidden={hidden}
              icon={
                <SpeedDialIcon
                  onClick={() => {
                    setSpeedDial(!speedDial)
                  }}
                />
              }
              open={speedDial}
              direction={direction}
            >
              {actions.map(action => (
                <SpeedDialAction
                  key={action.name}
                  icon={
                    <ButtonIcon
                      // sx={{
                      //   width: 200,
                      //   '&.MuiButtonBase-root': {
                      //     background: heatMapOptions[action.slug] ? '#FF8B00 !important' : '#47587969 !important'
                      //   }
                      // }}
                      iconColor='#FF8B00'
                      color='prmiary'
                      onClick={() => handleHeatMap(action.slug, !heatMapOptions[action.slug])}
                    >
                      {action.title}
                    </ButtonIcon>
                  }
                />
              ))}
            </StyledSpeedDial>
          </Box>
        )}
        {liveTracking && (
          <Box className={mapStyles.LiveTracking}>
            <StyledSpeedDial
              ariaLabel='Live Tracking Map Speed dial'
              open={speedDial}
              hidden={hidden}
              icon={
                <SpeedDialIcon
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& .MuiSvgIcon-root': {
                      width: '1.35em',
                      height: '1.35em'
                    }
                  }}
                  onClick={() => {
                    setSpeedDial(!speedDial)
                    setSpeedDialAction({})
                  }}
                />
              }
              sx={{
                '& .MuiButtonBase-root': {
                  background: speedDial ? '#0F224B !important' : '#FF8B00 !important'
                }
              }}
            >
              {LiveTrackingActions.map(action => (
                <SpeedDialAction
                  PopperProps={{
                    disablePortal: false
                  }}
                  key={action.name}
                  icon={<Image src={action.src} alt='Tracking Icon' width={25} height={25} />}
                  disableHoverListener={speedDialAction[action.name]}
                  disableFocusListener
                  disableClickaway
                  onClick={() => setSpeedDialAction({ [action.name]: !speedDialAction[action.name] })}
                  sx={{
                    '&.MuiFab-circular': {
                      background: speedDialAction[action.name] ? '#FF8B00 !important' : '#F4F8F81A !important'
                    },

                    '&.MuiSpeedDialAction-staticTooltip > .MuiButtonBase-root ': {
                      background: speedDialAction[action.name] ? '#FF8B00 !important' : '#F4F8F81A !important'
                    },

                    '& .MuiSpeedDialAction-staticTooltipLabel': {
                      background: '#0F224B',
                      width:
                        action.menu.length > 6
                          ? '300px'
                          : action.menu.length < 6 && action.menu.length > 1
                          ? '250px'
                          : 'auto',
                      marginRight: '12px'
                    }
                  }}
                  arrow
                  TooltipClasses='dialer-tooltip'
                  tooltipOpen={speedDialAction[action.name]}
                  tooltipTitle={
                    speedDialAction[action.name] ? (
                      <Grid
                        container
                        sx={{
                          background: '#0F224B',
                          width: 'calc(100% + 16px)',
                          marginLeft: '-8px',
                          padding: '0.8rem '
                        }}
                        py={2}
                      >
                        {action.menu.map((item, index) => (
                          <Grid
                            item
                            key={index}
                            xs={action.menu.length > 6 ? 3 : action.menu.length < 6 && action.menu.length > 1 ? 4 : 12}
                          >
                            <Button
                              variant='normal'
                              sx={{ display: 'flex', flexDirection: 'column', padding: '0.5rem' }}
                              onClick={() => router.push(item.url)}
                            >
                              <Image src={item.src} alt='Tracking Icon' width={25} height={25} />
                              <Typography sx={{ color: '#556485', fontSize: '10px' }} mt={1.5}>
                                {item.title}
                              </Typography>
                            </Button>
                          </Grid>
                        ))}
                      </Grid>
                    ) : (
                      ''
                    )
                  }
                />
              ))}
            </StyledSpeedDial>
          </Box>
        )}

        {geofence && (
          <Grid
            container
            className={mapStyles.geofence}
            sx={{ width: 'max-content', gap: '15px', background: '#0F224B', padding: '0.8rem', borderRadius: '50px' }}
          >
            {geofence.map((item, index) => (
              <Grid
                item
                key={item.id}
                sx={{ background: geofenceValues[item.type] ? '#FF8B00' : '#F4F8F81A', borderRadius: '50%' }}
              >
                <Button
                  sx={{ width: '45px', height: '45px', minWidth: 'unset' }}
                  onClick={() => changeGeofence(item.type)}
                >
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={index === 0 ? 12 : 18}
                    height={index === 0 ? 12 : 18}
                  />
                </Button>
              </Grid>
            ))}
          </Grid>
        )}

        {trackingAlerts && (
          <Box sx={{ flexGrow: 1 }} mx={2}>
            <Grid
              container
              id='alert-buttons'
              justifyContent='right'
              className={mapStyles.LiveTracking}
              wrap='wrap'
              columnSpacing={3}
            >
              <Grid item>
                <ButtonIcon
                  startIcon={'ic:round-notifications'}
                  endIcon={'lucide:maximize-2'}
                  iconColor='#FFF'
                  color='main'
                  onClick={() => handleOpen('vehicle')}
                >
                  <Grid display='flex' flexDirection='column'>
                    <Typography sx={{ fontSize: '12px', color: '#fff' }}>Vehicle Expiry Alert</Typography>
                    <Typography sx={{ fontSize: '16px', color: '#fff', fontWeight: '700', textAlign: 'start' }}>
                      {vehicleCountTrackingLive}
                    </Typography>
                  </Grid>
                </ButtonIcon>
              </Grid>
              {/* <Grid item>
                <ButtonIcon
                  startIcon={'ic:round-notifications'}
                  endIcon={'lucide:maximize-2'}
                  iconColor='#FFF'
                  color='main'
                  onClick={() => handleOpen('account')}
                >
                  <Grid display='flex' flexDirection='column'>
                    <Typography sx={{ fontSize: '12px', color: '#fff' }}>Account Expiry Alert</Typography>
                    <Typography sx={{ fontSize: '16px', color: '#fff', fontWeight: '700', textAlign: 'start' }}>
                      17
                    </Typography>
                  </Grid>
                </ButtonIcon>
              </Grid> */}
            </Grid>
          </Box>
        )}

        {speedometer && (
          <Box
            className='boxxxx'
            sx={{
              position: 'absolute',
              top: { xs: 'calc(50% + 20px)', lg: 'calc(0% + 80px)' },
              right: '4.5rem',
              background: '#fff',
              padding: '1.5rem',
              boxShadow: '0px 3px 10px #00000029',
              borderRadius: '20px'
            }}
          >
            <ReactSpeedometer
              minValue={20}
              maxValue={220}
              value={120}
              currentValueText={'${value}'}
              maxSegmentLabels={5}
              customSegmentStops={[20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220]}
              height={190}
              ringWidth={12}
              forceRender={true}
              segmentColors={[
                '#00ABBE',
                '#00ABBE',
                '#00ABBE',
                '#00ABBE',
                '#00ABBE',
                '#47587969',
                '#47587969',
                '#47587969',
                '#47587969',
                '#47587969',
                '#47587969'
              ]}
              needleColor={'transparent'}
              needleHeightRatio='0'
              valueTextFontSize={24} // Set the font size of the text
            />
            <Typography
              sx={{
                color: '#C0C5D0',
                fontSize: '0.875rem',
                fontWeight: '300',
                textAlign: 'center',
                transform: 'translateY(-70px)'
              }}
            >
              KM/H
            </Typography>

            <Typography
              sx={{
                color: '#556485',
                fontSize: '1rem',
                fontWeight: '500',
                textAlign: 'center',
                transform: 'translateY(-50px)',
                marginBottom: '-35px'
              }}
            >
              SPEEDOMETER
            </Typography>
          </Box>
        )}

        {/* <Polyline
          traffic={new window.google.maps.TrafficLayer()}
          path={track_2}
          options={{
            // strokeColor: 'transparent',
            strokeWeight: 3,
            strokeOpacity: 0.6
          }}
        /> */}
      </GoogleMap>
    </>
  )
}

export default TrackingGoogleMapComponent
