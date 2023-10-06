import React from 'react'
import { Typography } from '@mui/material'

// ** custom components
import CustomChip from 'src/@core/components/mui/chip'
import AlertDialog from 'src/components/Dialogs/AlertDialog'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { approveDevicesAction, deleteDeviceAction } from 'src/store/catalogs/devices/devicesAction'
import { getNull } from 'src/utilities/utils'

let rowId = null

export const columns = ({ ability, page, limit }) => {
  const dispatch = useDispatch()
  // ** States
  const [deleteOpen, setDeleteOpen] = useState(false)

  // ** Delete Modal
  const handleDeleteOpen = id => {
    rowId = id
    setDeleteOpen(true)
  }

  const handleDeleteClose = () => {
    setDeleteOpen(false)
  }

  return [
    {
      name: 'ID',
      sortable: true,
      selector: row => row.id,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.id}
        </Typography>
      )
    },
    {
      name: 'IMEI',
      sortable: true,
      selector: row => row.imei,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.imei || '--'}
        </Typography>
      )
    },
    {
      name: 'Serial Number',
      sortable: true,
      selector: row => row.device_id,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.serial_number || '--'}
        </Typography>
      )
    },
    {
      name: 'Device Make',
      sortable: true,
      selector: row => row.customer_id,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.device_make_id || '--'}
        </Typography>
      )
    },
    {
      name: 'Device Model',
      sortable: true,
      selector: row => row.asset_id,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.device_model_id || '--'}
        </Typography>
      )
    },
    {
      name: 'Device Type ID',
      sortable: true,
      selector: row => row.device_type_id,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.device_type_id || '--'}
        </Typography>
      )
    },
    {
      name: 'Procurement Date',
      sortable: true,
      selector: row => row.procurement_date,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.procurement_date || '--'}
        </Typography>
      )
    },
    {
      name: 'Serial No.',
      sortable: true,
      selector: row => row.serial_no,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.serial_no || '--'}
        </Typography>
      )
    },
    {
      name: 'ERP Id',
      sortable: true,
      selector: row => row.erp_id,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.erp_id || '--'}
        </Typography>
      )
    },
    {
      name: 'OBD',
      sortable: true,
      selector: row => row.has_obd,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.has_obd || '--'}
        </Typography>
      )
    },
    {
      name: 'FirmWare',
      sortable: true,
      selector: row => row.firmware,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.firmware || '--'}
        </Typography>
      )
    },
    {
      name: 'configuration',
      sortable: true,
      selector: row => row.configuration,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.configuration || '--'}
        </Typography>
      )
    },
    {
      name: 'Manufacturing Date',
      sortable: true,
      selector: row => row.manufacturing_date,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.manufacturing_date || '--'}
        </Typography>
      )
    },
    {
      name: 'Selling Date',
      sortable: true,
      selector: row => row.selling_date,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.selling_date || '--'}
        </Typography>
      )
    },
    {
      name: 'Guarantee',
      sortable: true,
      selector: row => row.guarantee_duration,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.guarantee_duration || '--'}
        </Typography>
      )
    },
    {
      name: 'Info',
      sortable: true,
      selector: row => row.info,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.info || '--'}
        </Typography>
      )
    },
    {
      name: 'Customers',
      sortable: false,
      selector: row => row?.customer?.name,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.customer?.name || '--'}
        </Typography>
      )
    },
    {
      name: 'POC Name',
      sortable: false,
      selector: row => row?.customer?.poc_name,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.customer?.poc_name || '--'}
        </Typography>
      )
    },
    {
      name: 'POC Email',
      sortable: false,
      selector: row => row?.customer?.poc_email,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.customer?.poc_email || '--'}
        </Typography>
      )
    },
    {
      name: 'Customer Type',
      sortable: false,
      selector: row => row?.customer?.customer_type?.name,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.customer?.customer_type?.name || '--'}
        </Typography>
      )
    },
    {
      name: 'Status',
      sortable: false,
      selector: row => row.status,
      cell: row =>
        getNull(row?.status) ? (
          'N/A'
        ) : (
          <CustomChip
            size='small'
            skin='light'
            sx={{
              padding: '0.4rem 0.5rem',
              '& .MuiChip-label': {
                fontSize: '0.85rem',
                fontWeight: 600
              }
            }}
            color={
              row?.status === 'online' || row?.status === 'approve'
                ? 'success'
                : row?.status === 'offline'
                ? 'secondary'
                : row?.status === 'new'
                ? 'warning'
                : 'error'
            }
            label={row?.status || '--'}

            //   label='Active'
            //   color='success'
          />
        )
    },
    {
      name: 'Approve',
      sortable: false,
      cell: row => {
        return (
          <div className='flex items-center justify-content-between'>
            {!getNull(row?.status) && row?.status === 'pending' && (
              <CustomChip
                onClick={() => dispatch(approveDevicesAction({ device_id: row?.id, page: page, limit: limit }))}
                size='small'
                skin='light'
                label={
                  <Icon icon='iconoir:check' width='15' height='15' color='success' style={{ marginTop: '4px' }} />
                }
                color='success'
                sx={{
                  padding: '0.9rem 0rem',
                  marginLeft: '0.5rem',
                  cursor: 'pointer'
                }}
              />
            )}
          </div>
        )
      }
    },

    {
      name: 'Delete',
      sortable: false,
      cell: row => {
        return (
          <div className='flex items-center justify-content-between'>
            {ability.can('delete', 'delete-device') && (
              <CustomChip
                onClick={() => handleDeleteOpen(row.id)}
                size='small'
                skin='light'
                label={<Icon icon='iconoir:cancel' width='15' height='15' color='error' style={{ marginTop: '4px' }} />}
                color='error'
                sx={{
                  padding: '0.9rem 0rem',
                  marginLeft: '0.5rem'
                }}
              />
            )}

            <AlertDialog
              IconWd='35'
              IconHt='35'
              open={deleteOpen}
              iconColor='#FC3B61'
              id='delete-Modal'
              icon='tabler:bell-ringing'
              close={() => handleDeleteClose()}
              submit={async () => {
                await dispatch(deleteDeviceAction({ id: rowId }))
              }}
              context='Are you sure you want to delete this Device?'
            />
          </div>
        )
      }
    }
  ]
}
