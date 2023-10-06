// ** Third Party Imports
import { Icon } from '@iconify/react'

// ** custom components
import CustomChip from 'src/@core/components/mui/chip'

export const columns = props => {
  const { router, slug, update } = props

  return [
    {
      name: 'Location Code',
      selector: row => row.location_code
    },

    {
      name: 'Location Name',
      selector: row => row.location_name
    },

    {
      name: 'Location Details',
      selector: row => row.location_details
    },

  ]
}

export const rows = [
  {
    location_name: 'Trip to Norther Areas',
    location_code: 'north001',
    location_details: 'N/A'
  }
]
