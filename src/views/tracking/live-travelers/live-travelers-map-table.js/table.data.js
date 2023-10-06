// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import { chipStatus } from 'src/components/states/chips'

// ** Icon import
import { Icon } from '@iconify/react'

export const columns = () => {
  return [
    {
      name: 'Location',
      sortable: true,
      selector: row => row.location
    },

    {
      name: 'Speed(KM/H)',
      sortable: true,
      selector: row => row.speed
    },

    {
      name: 'Ignition',
      sortable: true,
      selector: row => row.ignition
    },
    {
      name: 'Date & Time',
      sortable: true,
      selector: row => `${row.date.split('T')[0]}\n${row.date.split('T')[1]}`
    }
  ]
}

export const rows = [
  {
    location: 'Jeddah, Makkah Region, Saudi Arabia',
    date: '2021-05-01T12:00:00',
    speed: '0',
    ignition: 'off',
    date: '14-09-2021 08:53:09 PM'
  }
]
