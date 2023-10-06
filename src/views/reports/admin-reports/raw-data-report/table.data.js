// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import { chipStatus } from 'src/components/states/chips'

// ** Icon import
import { Icon } from '@iconify/react'

export const columns = () => {
  return [
    {
      name: 'Asset Name',
      sortable: true,
      selector: row => row.name
    },

    {
      name: 'Raw Data',
      sortable: true,
      selector: row => row.raw_data
    },
    {
      name: 'Date/Time',
      sortable: true,
      selector: row => `${row.date.split('T')[0]}\n${row.date.split('T')[1]}`
    },
  ]
}

export const rows = [
  {
    name: '1006 DSB',
    raw_data: '098432 9438 090321 3892189',
    date: '2021-05-01T12:00:00',
  },
  {
    name: '1006 DSB',
    raw_data: '098432 9438 090321 3892189',
    date: '2021-05-01T12:00:00',
  },

  {
    name: '1006 DSB',
    raw_data: '098432 9438 090321 3892189',
    date: '2021-05-01T12:00:00',
  },
  {
    name: '1006 DSB',
    raw_data: '098432 9438 090321 3892189',
    date: '2021-05-01T12:00:00',
  },
  {
    name: '1006 DSB',
    raw_data: '098432 9438 090321 3892189',
    date: '2021-05-01T12:00:00',
  },
  {
    name: '1006 DSB',
    raw_data: '098432 9438 090321 3892189',
    date: '2021-05-01T12:00:00',
  },
  {
    name: '1006 DSB',
    raw_data: '098432 9438 090321 3892189',
    date: '2021-05-01T12:00:00',
  },
  {
    name: '1006 DSB',
    raw_data: '098432 9438 090321 3892189',
    date: '2021-05-01T12:00:00',
  },
  {
    name: '1006 DSB',
    raw_data: '098432 9438 090321 3892189',
    date: '2021-05-01T12:00:00',
  },
  {
    name: '1006 DSB',
    raw_data: '098432 9438 090321 3892189',
    date: '2021-05-01T12:00:00',
  },
  {
    name: '1006 DSB',
    raw_data: '098432 9438 090321 3892189',
    date: '2021-05-01T12:00:00',
  },
  {
    name: '1006 DSB',
    raw_data: '098432 9438 090321 3892189',
    date: '2021-05-01T12:00:00',
  },
  {
    name: '1006 DSB',
    raw_data: '098432 9438 090321 3892189',
    date: '2021-05-01T12:00:00',
  },
  {
    name: '1006 DSB',
    raw_data: '098432 9438 090321 3892189',
    date: '2021-05-01T12:00:00',
  },
  {
    name: '1006 DSB',
    raw_data: '098432 9438 090321 3892189',
    date: '2021-05-01T12:00:00',
  },
  {
    name: '1006 DSB',
    raw_data: '098432 9438 090321 3892189',
    date: '2021-05-01T12:00:00',
  },
  {
    name: '1006 DSB',
    raw_data: '098432 9438 090321 3892189',
    date: '2021-05-01T12:00:00',
  },
]
