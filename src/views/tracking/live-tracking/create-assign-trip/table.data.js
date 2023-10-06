// ** Third Party Imports
import { Icon } from '@iconify/react'

// ** custom components
import CustomChip from 'src/@core/components/mui/chip'

export const columns = props => {
  const { router, slug, update } = props

  return [
    {
      name: 'Trip Code',
      selector: row => row.trip_code
    },

    {
      name: 'Trip Name',
      selector: row => row.trip_name
    },

    {
      name: 'Zone Details',
      selector: row => row.zone_details
    },

  ]
}

export const rows = [
  {
    trip_name: 'Trip to Norther Areas',
    trip_code: 'north001',
    zone_details: 'N/A'
  }
]