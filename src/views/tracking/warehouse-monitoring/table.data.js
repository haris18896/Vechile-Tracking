import { Icon } from '@iconify/react'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FieldHorizontalWrapper, FieldWrapper } from 'src/styles/components/input'

export const columns = () => {
  return [
    {
      name: 'Account Name',
      sortable: false,
      selector: row => row.accountName,
    },
    {
      name: 'Warehouse Name',
      sortable: false,
      selector: row => row.warehouse
    },
    {
      name: 'License No.',
      sortable: false,
      selector: row => row.licenseNo
    },
    {
      name: 'Inventory',
      sortable: false,
      minWidth: '250px',
      cell: row => (
        <FieldWrapper sx={{ width: '100%' }}>
          <Typography variant='body2' color='success.main' component='p'>
            Name
          </Typography>
          <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
            Medical Appliances
          </Typography>

          <Typography variant='body2' color='success.main' component='p'>
            Asset
          </Typography>
          <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
            Warehouse Store 2
          </Typography>

          <Typography variant='body2' color='success.main' component='p'>
            Date/Time
          </Typography>
          <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
            2021-09-09 12:00:00
          </Typography>

          <Typography variant='body2' color='text.success' sx={{ fontWeight: 'bold' }} component='h4'>
            Sensor Details
          </Typography>

          <Typography variant='body2' color='success.main' component='p'>
            Temp
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
              Sensor 1
            </Typography>
            <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
              Sensor 2
            </Typography>
            <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
              Sensor 3
            </Typography>
          </Box>

          <Typography variant='body2' color='success.main' component='p'>
            Humidity
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
              Sensor 1
            </Typography>
            <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
              Sensor 2
            </Typography>
            <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
              Sensor 3
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <Typography variant='body2' color='success.main' component='p'>
              Average Temp
            </Typography>
            <Typography variant='body2' color='success.main' component='p'>
              Average Temp
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <Typography variant='body2' color='text.success' component='p'>
              N/A
            </Typography>
            <Typography variant='body2' color='text.success' component='p'>
              N/A
            </Typography>
          </Box>
        </FieldWrapper>
      )
    },
    {
      name: 'Inventory',
      sortable: false,
      minWidth: '250px',
      cell: row => (
        <FieldWrapper sx={{ width: '100%' }}>
          <Typography variant='body2' color='success.main' component='p'>
            Name
          </Typography>
          <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
            Medical Appliances
          </Typography>

          <Typography variant='body2' color='success.main' component='p'>
            Asset
          </Typography>
          <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
            Warehouse Store 2
          </Typography>

          <Typography variant='body2' color='success.main' component='p'>
            Date/Time
          </Typography>
          <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
            2021-09-09 12:00:00
          </Typography>

          <Typography variant='body2' color='text.success' sx={{ fontWeight: 'bold' }} component='h4'>
            Sensor Details
          </Typography>

          <Typography variant='body2' color='success.main' component='p'>
            Temp
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
              Sensor 1
            </Typography>
            <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
              Sensor 2
            </Typography>
            <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
              Sensor 3
            </Typography>
          </Box>

          <Typography variant='body2' color='success.main' component='p'>
            Humidity
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
              Sensor 1
            </Typography>
            <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
              Sensor 2
            </Typography>
            <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
              Sensor 3
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <Typography variant='body2' color='success.main' component='p'>
              Average Temp
            </Typography>
            <Typography variant='body2' color='success.main' component='p'>
              Average Temp
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <Typography variant='body2' color='text.success' component='p'>
              N/A
            </Typography>
            <Typography variant='body2' color='text.success' component='p'>
              N/A
            </Typography>
          </Box>
        </FieldWrapper>
      )
    },
    {
      name: 'Inventory',
      sortable: false,
      minWidth: '250px',
      cell: row => (
        <FieldWrapper sx={{ width: '100%' }}>
          <Typography variant='body2' color='success.main' component='p'>
            Name
          </Typography>
          <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
            Medical Appliances
          </Typography>

          <Typography variant='body2' color='success.main' component='p'>
            Asset
          </Typography>
          <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
            Warehouse Store 2
          </Typography>

          <Typography variant='body2' color='success.main' component='p'>
            Date/Time
          </Typography>
          <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
            2021-09-09 12:00:00
          </Typography>

          <Typography variant='body2' color='text.success' sx={{ fontWeight: 'bold' }} component='h4'>
            Sensor Details
          </Typography>

          <Typography variant='body2' color='success.main' component='p'>
            Temp
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
              Sensor 1
            </Typography>
            <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
              Sensor 2
            </Typography>
            <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
              Sensor 3
            </Typography>
          </Box>

          <Typography variant='body2' color='success.main' component='p'>
            Humidity
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
              Sensor 1
            </Typography>
            <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
              Sensor 2
            </Typography>
            <Typography variant='body2' color='text.primary' component='p' sx={{ marginBottom: '0.25rem' }}>
              Sensor 3
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <Typography variant='body2' color='success.main' component='p'>
              Average Temp
            </Typography>
            <Typography variant='body2' color='success.main' component='p'>
              Average Temp
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <Typography variant='body2' color='text.success' component='p'>
              N/A
            </Typography>
            <Typography variant='body2' color='text.success' component='p'>
              N/A
            </Typography>
          </Box>
        </FieldWrapper>
      )
    },

    {
      name: 'Address',
      sortable: false,
      selector: row => row.address
    },
  ]
}

export const rows = [
  {
    accountName: 'Haris',
    warehouse: 'Medical warehouse Jeddah',
    licenseNo: '067856778776678',
    inventory: 'cell',
    inventory2: 'cell 2',
    inventory3: 'cell 3',
    address: 'As Sa`adah District, As Sa..'
  },
  {
    accountName: 'Haris',
    warehouse: 'Medical warehouse Jeddah',
    licenseNo: '067856778776678',
    inventory: 'cell',
    inventory2: 'cell 2',
    inventory3: 'cell 3',
    address: 'As Sa`adah District, As Sa..'

  },
  {
    accountName: 'Haris',
    warehouse: 'Medical warehouse Jeddah',
    licenseNo: '067856778776678',
    inventory: 'cell',
    inventory2: 'cell 2',
    inventory3: 'cell 3',
    address: 'As Sa`adah District, As Sa..'

  }
]
