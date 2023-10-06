// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import { chipStatus } from 'src/components/states/chips'

// ** Icon import
import { Icon } from '@iconify/react'

export const columns = () => {
  return [
    {
      name: 'Vehicle No',
      sortable: true,
      selector: row => row.vehicle_no
    },
    {
      name: 'Sim No.',
      sortable: true,
      selector: row => row.sim_no
    },
    {
      name: 'From Date',
      sortable: true,
      selector: row => `${row.date.split('T')[0]}\n${row.date.split('T')[1]}`
    },
    {
      name: 'To Date',
      sortable: true,
      selector: row => `${row.date.split('T')[0]}\n${row.date.split('T')[1]}`
    },
    {
      name: 'Bytes Recieved',
      sortable: true,
      selector: row => row.bytes_recieved
    },
  ]
}

export const rows = [
  {
    vehicle_no: '769IJA',
    sim_no: '01241-32321',
    date: '2021-05-01T12:00:00',
    bytes_recieved: '2453'
  },
  {
    vehicle_no: '769IJA',
    sim_no: '01241-32321',
    date: '2021-05-01T12:00:00',
    bytes_recieved: '2453'
  },
  {
    vehicle_no: '769IJA',
    sim_no: '01241-32321',
    date: '2021-05-01T12:00:00',
    bytes_recieved: '2453'
  },
  {
    vehicle_no: '769IJA',
    sim_no: '01241-32321',
    date: '2021-05-01T12:00:00',
    bytes_recieved: '2453'
  },
  {
    vehicle_no: '769IJA',
    sim_no: '01241-32321',
    date: '2021-05-01T12:00:00',
    bytes_recieved: '2453'
  },
  {
    vehicle_no: '769IJA',
    sim_no: '01241-32321',
    date: '2021-05-01T12:00:00',
    bytes_recieved: '2453'
  },
  {
    vehicle_no: '769IJA',
    sim_no: '01241-32321',
    date: '2021-05-01T12:00:00',
    bytes_recieved: '2453'
  },
  {
    vehicle_no: '769IJA',
    sim_no: '01241-32321',
    date: '2021-05-01T12:00:00',
    bytes_recieved: '2453'
  },
  {
    vehicle_no: '769IJA',
    sim_no: '01241-32321',
    date: '2021-05-01T12:00:00',
    bytes_recieved: '2453'
  },
  {
    vehicle_no: '769IJA',
    sim_no: '01241-32321',
    date: '2021-05-01T12:00:00',
    bytes_recieved: '2453'
  },
  {
    vehicle_no: '769IJA',
    sim_no: '01241-32321',
    date: '2021-05-01T12:00:00',
    bytes_recieved: '2453'
  },
  {
    vehicle_no: '769IJA',
    sim_no: '01241-32321',
    date: '2021-05-01T12:00:00',
    bytes_recieved: '2453'
  },
  {
    vehicle_no: '769IJA',
    sim_no: '01241-32321',
    date: '2021-05-01T12:00:00',
    bytes_recieved: '2453'
  },
  {
    vehicle_no: '769IJA',
    sim_no: '01241-32321',
    date: '2021-05-01T12:00:00',
    bytes_recieved: '2453'
  },
  {
    vehicle_no: '769IJA',
    sim_no: '01241-32321',
    date: '2021-05-01T12:00:00',
    bytes_recieved: '2453'
  },

]
