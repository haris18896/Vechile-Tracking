// ** Third Party Components
import { Icon } from '@iconify/react'

// ** custom components
import { useCommonStyles } from 'src/styles/common'

// ** States
import { useState } from 'react'

// ** MUI
import { Box, Menu, MenuItem, TextField, Typography } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'

// ** UTils and Componenents
import { getNull } from 'src/utilities/utils'
import { chipStatus } from 'src/components/states/chips'
import CustomChip from 'src/@core/components/mui/chip'

export const columns = ({ setShowMap, setCenter }) => {
  // ** Styles
  const styles = useCommonStyles()

  // ** Opens the DropDown for Share
  const [open, setOpen] = useState(false)

  const handleTooltipClose = () => {
    setOpen(false)
  }

  const handleTooltipOpen = text => {
    setOpen(true)
    navigator.clipboard.writeText(text)
    setTimeout(() => {
      setOpen(false)
    }, 2000)
  }

  //Export Options
  const handleOption = event => {
    const { value } = event.currentTarget.dataset
  }

  const [anchorEl, setAnchorEl] = useState(null)

  const openMenu = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
    setOpen(false)
  }

  const socialOptions = [
    { name: 'Facebook', icon: 'logos:facebook' },
    { name: 'Twitter', icon: 'skill-icons:twitter' },
    { name: 'Email', icon: 'ic:sharp-email', color: '#757575' },
    { name: 'Skype', icon: 'logos:skype' },
    { name: 'Whatsapp', icon: 'logos:whatsapp-icon' }
  ]

  return [
    {
      name: 'Asset Name',
      minWidth: '140px',
      selector: row => {
        return getNull(row?.asset?.name) ? <div>N/A</div> : <div>{row?.asset?.name}</div>
      },
      conditionalCellStyles: [
        {
          when: row => row,
          classNames: ['break-word']
        }
      ]
    },

    {
      name: 'Plate No',
      selector: row => {
        return getNull(row?.asset?.plate_no) ? <div>N/A</div> : <div>{row?.asset?.plate_no}</div>
      }
    },

    {
      name: 'Asset Type',
      selector: row => {
        return getNull(row?.asset?.asset_type?.name) ? <div>N/A</div> : <div>{row?.asset?.asset_type?.name}</div>
      }
    },

    {
      name: 'Serial No',
      selector: row => {
        return getNull(row?.serial_number) ? <div>N/A</div> : <div>{row?.serial_number}</div>
      }
    },

    {
      name: 'Driver Name',
      selector: row => {
        return getNull(row?.driver_name) ? <div>N/A</div> : <div>{row?.driver_name}</div>
      },
      minWidth: '120px'
    },

    {
      name: 'Device Type',
      selector: row => {
        return getNull(row?.source_device) ? <div>N/A</div> : <div>{row?.source_device}</div>
      },
      minWidth: '120px'
    },

    {
      name: 'IMEI No',
      selector: row => {
        return getNull(row?.asset?.imei_number) ? <div>N/A</div> : <div>{row?.asset?.imei_number} KM</div>
      }
    },

    {
      name: 'Location',
      selector: row => {
        return getNull(row?.location) ? <div>N/A</div> : <div>{row?.location}</div>
      },
      minWidth: '160px',
      conditionalCellStyles: [
        {
          when: row => row.location,
          classNames: ['break-word']
        }
      ]
    },

    {
      name: 'Ignition',
      sortable: true,
      cell: row => {
        return getNull(row?.power) ? (
          <div style={{ textAlign: 'center', width: '100%' }}>N/A</div>
        ) : (
          <CustomChip
            size='small'
            skin='light'
            color={chipStatus[row.power]?.color}
            label={
              <Icon icon={chipStatus[row.power]?.icon} width='15' height='15' color={chipStatus[row.power]?.color} />
            }
            sx={{
              padding: '0.9rem 0rem',
              margin: 'auto'
            }}
          />
        )
      }
    },

    // {
    //   name: 'Distance',
    //   selector: row => {
    //     return getNull(row?.distance) ? <div>N/A</div> : <div>{row?.distance} KM</div>
    //   }
    // },

    // {
    //   name: 'Direction',
    //   selector: row => {
    //     return getNull(row?.direction) ? <div>N/A</div> : <div>{row?.direction}</div>
    //   }
    // },

    {
      name: 'Speed',
      selector: row => {
        return getNull(row?.speed) ? <div>N/A</div> : <div>{row?.speed} KM/H</div>
      }
    },

    {
      name: 'Date/Time',
      sortable: true,
      selector: row =>
        getNull(row?.timestamp) ? 'N/A' : `${row.timestamp.split(' ')[0]}\n${row.timestamp.split(' ')[1]}`,
      minWidth: '120px',
      conditionalCellStyles: [
        {
          when: row => row,
          classNames: ['break-word']
        }
      ]
    },

    {
      name: 'GPS',
      cell: row => (
        <CustomChip
          size='small'
          label={<Icon icon='bi:cursor-fill' width='15' height='15' color='success' style={{ marginTop: '4px' }} />}
          color={chipStatus[row.gps]?.color}
          skin='light'
          sx={{
            padding: '0.95rem 0rem'
          }}
        />
      )
    },

    // {
    //   name: 'Alert',
    //   cell: row => (
    //     <CustomChip
    //       size='small'
    //       label={
    //         <Icon icon='mingcute:alert-fill' width='15' height='15' color='success' style={{ marginTop: '4px' }} />
    //       }
    //       color={chipStatus[row.power]?.color}
    //       skin='light'
    //       sx={{
    //         padding: '0.95rem 0rem'
    //       }}
    //     />
    //   )
    // },

    {
      name: 'Power',
      cell: row => (
        <CustomChip
          size='small'
          label={<Icon icon='mdi:power-off' width='15' height='15' color='success' style={{ marginTop: '4px' }} />}
          color={chipStatus[row.power]?.color}
          skin='light'
          sx={{
            padding: '0.95rem 0rem'
          }}
        />
      )
    },

    // {
    //   name: 'Temperature',
    //   selector: row => {
    //     return getNull(row?.temperature) ? <div>N/A</div> : <div>{row?.temperature} V</div>
    //   },
    //   minWidth: '120px'
    // },

    {
      name: 'Seat Belt',
      selector: row => {
        return getNull(row?.seatbelt) ? <div>N/A</div> : <div>{row?.seatbelt}</div>
      }
    },

    // {
    //   name: 'Door',
    //   selector: row => {
    //     return getNull(row?.door) ? <div>N/A</div> : <div>{row?.door}</div>
    //   }
    // },

    // {
    //   name: 'Panic',
    //   selector: row => {
    //     return getNull(row?.panic) ? <div>N/A</div> : <div>{row?.panic}</div>
    //   }
    // },

    // {
    //   name: 'last Speed',
    //   selector: row => {
    //     return getNull(row?.last_speed) ? <div>N/A</div> : <div>{row?.last_speed} KM/H</div>
    //   },
    //   minWidth: '120px'
    // },

    // {
    //   name: 'Last Seatbelt',
    //   selector: row => {
    //     return getNull(row?.last_seatbelt) ? <div>N/A</div> : <div>{row?.last_seat_belt}</div>
    //   },
    //   minWidth: '120px'
    // },

    // {
    //   name: 'Last Door',
    //   selector: row => {
    //     return getNull(row?.last_door) ? <div>N/A</div> : <div>{row?.last_door}</div>
    //   }
    // },

    // {
    //   name: 'Defined Speed',
    //   selector: row => {
    //     return getNull(row?.defined_speed) ? <div>N/A</div> : <div>{row?.defined_speed} KM/H</div>
    //   },
    //   minWidth: '130px'
    // },

    // {
    //   name: 'Over Speed',
    //   selector: row => {
    //     return getNull(row?.over_speed) ? <div>N/A</div> : <div>{row?.over_speed} KM/H</div>
    //   },
    //   minWidth: '120px'
    // },

    // {
    //   name: 'Load Voltage',
    //   selector: row => {
    //     return getNull(row?.load_voltage) ? <div>N/A</div> : <div>{row?.load_voltage} V</div>
    //   },
    //   minWidth: '120px'
    // },

    {
      name: 'Maps',
      cell: row => {
        return (
          <div>
            <CustomChip
              size='small'
              onClick={() => {
                setShowMap(true)
                if (!(getNull(row?.latitude) && getNull(row?.longitude)))
                  setCenter({ lat: parseFloat(row?.latitude), lng: parseFloat(row?.longitude) })
              }}
              label={<Icon icon='mdi:map-marker' width='15' height='15' color='success' style={{ marginTop: '4px' }} />}
              color='success'
              skin='light'
              sx={{
                padding: '0.95rem 0rem'
              }}
            />
          </div>
        )
      }
    },

    {
      name: 'Share',
      cell: row => {
        return (
          <div>
            <CustomChip
              size='small'
              label={
                <Icon icon='mdi:arrow-top-right' width='15' height='15' color='success' style={{ marginTop: '6px' }} />
              }
              color='secondary'
              sx={{
                padding: '0.95rem 0rem'
              }}
              onClick={handleClick}
            />

            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseMenu}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
              className={styles.socialStyles}
            >
              {socialOptions.map((item, index) => (
                <MenuItem
                  onClick={handleOption}
                  sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px' }}
                  key={item.name}
                  data-value={item.name}
                >
                  <Icon icon={item.icon} fontSize={20} color={item.color} style={{ flexShrink: 0 }} />
                  {item.name}
                </MenuItem>
              ))}

              <Box sx={{ padding: '6px 1rem' }}>
                <Typography sx={{ fontWeight: '500', color: '#D1D5DB' }}> Link to Share </Typography>
                <Tooltip
                  onClose={handleTooltipClose}
                  open={open}
                  sx={{
                    '& .MuiTooltip-popper': {
                      background: '#000'
                    }
                  }}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title='Link Copied'
                >
                  <TextField
                    variant='standard'
                    onClick={() => handleTooltipOpen(row?.link)}
                    defaultValue={row?.link}
                    InputProps={{
                      readOnly: true
                    }}
                    sx={{
                      width: '100%',

                      '& .MuiInputBase-input': {
                        cursor: 'pointer'
                      },

                      '& .MuiInputBase-root:before': {
                        borderBottom: '2px solid #d5d5d5'
                      },
                      '& .MuiInputBase-root:before': {
                        borderBottom: '2px solid #d5d5d5'
                      }
                    }}
                  />
                </Tooltip>
              </Box>
            </Menu>
          </div>
        )
      }
    }
  ]
}
