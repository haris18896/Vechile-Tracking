// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import { chipStatus } from 'src/components/states/chips'

// ** Icon import
import { Icon } from '@iconify/react'

export const columns = () => {
  return [
    {
      name: 'Email Details',
      sortable: true,
      selector: row => row.details
    },
    {
      name: 'CC Details',
      sortable: true,
      selector: row => row.cc_details
    },
    {
      name: 'Report Names',
      sortable: true,
      selector: row => row.reports
    },
  ]
}

export const rows = [
  {
    details: 'Cofidential',
    cc_details: 'CTO',
    reports: 'N/A',
  },
  {
    details: 'Cofidential',
    cc_details: 'CTO',
    reports: 'N/A',
  },
  {
    details: 'Cofidential',
    cc_details: 'CTO',
    reports: 'N/A',
  },
  {
    details: 'Cofidential',
    cc_details: 'CTO',
    reports: 'N/A',
  },
  {
    details: 'Cofidential',
    cc_details: 'CTO',
    reports: 'N/A',
  },
  {
    details: 'Cofidential',
    cc_details: 'CTO',
    reports: 'N/A',
  },
  {
    details: 'Cofidential',
    cc_details: 'CTO',
    reports: 'N/A',
  },
  {
    details: 'Cofidential',
    cc_details: 'CTO',
    reports: 'N/A',
  },
  {
    details: 'Cofidential',
    cc_details: 'CTO',
    reports: 'N/A',
  },
  {
    details: 'Cofidential',
    cc_details: 'CTO',
    reports: 'N/A',
  },
  {
    details: 'Cofidential',
    cc_details: 'CTO',
    reports: 'N/A',
  },
  {
    details: 'Cofidential',
    cc_details: 'CTO',
    reports: 'N/A',
  },
  {
    details: 'Cofidential',
    cc_details: 'CTO',
    reports: 'N/A',
  },
  {
    details: 'Cofidential',
    cc_details: 'CTO',
    reports: 'N/A',
  },
  {
    details: 'Cofidential',
    cc_details: 'CTO',
    reports: 'N/A',
  },

]
