import React, { useState } from 'react'

// ** Third Party Imports
import { Icon } from '@iconify/react'

// ** custom components
import CustomChip from 'src/@core/components/mui/chip'
import AlertDialog from 'src/components/Dialogs/AlertDialog'

export const columns = ({ ability, router }) => {
  // ** States
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [waslRegister, setWaslRegister] = useState(false)
  const [idx, setIdx] = useState(null)

  // ** Delete Modal
  const handleDeleteOpen = id => {
    setIdx(id)
    setDeleteOpen(true)
  }

  const handleWaslRegisterModalOpen = id => {
    setIdx(id)
    setWaslRegister(true)
  }

  return [
    {
      name: 'Fuel Calibration Name',
      selector: row => row?.fuelCalibrationName
    },
    {
      name: 'Fuel Tank Capacity',
      selector: row => row?.fuelTankCapacity
    },
    {
      name: 'Actions',
      width: '150px',
      cell: row => (
        <>
          {ability.can('update', 'update-fuel-calibration') && (
            <CustomChip
              onClick={() => router.push(`/catalogs/fuel-calibration/edit/${row.id}`)}
              size='small'
              label={<Icon icon='ri:edit-2-line' width='15' height='15' color='success' style={{ marginTop: '4px' }} />}
              color='success'
              skin='light'
              sx={{
                padding: '0.95rem 0rem',
                marginRight: '0.5rem'
              }}
            />
          )}

          {ability.can('delete', 'delete-fuel-calibration') && (
            <CustomChip
              onClick={() => handleDeleteOpen(row.id)}
              size='small'
              skin='light'
              label={<Icon icon='iconoir:cancel' width='15' height='15' color='error' style={{ marginTop: '4px' }} />}
              color='error'
              sx={{
                padding: '0.9rem 0rem'
              }}
            />
          )}

          <AlertDialog
            IconWd='35'
            IconHt='35'
            iconColor='#FC3B61'
            open={deleteOpen}
            id='delete-Modal'
            icon='tabler:bell-ringing'
            close={() => setDeleteOpen(false)}
            submit={() =>
              console.log('dispatch(deleteFuelCalibrationAction({id: idx, callBack: () => handleDeleteClose()}))')
            }
            context='Are you sure you want to delete this fuel calibration record?'
          />
        </>
      )
    }
  ]
}

export const rows = [
  {
    id: 1,
    fuelCalibrationName: 'Fuel Calibration 1',
    fuelTankCapacity: '12825'
  },
  {
    id: 2,
    fuelCalibrationName: 'Fuel Calibration 1',
    fuelTankCapacity: '12825'
  },
  {
    id: 3,
    fuelCalibrationName: 'Fuel Calibration 1',
    fuelTankCapacity: '12825'
  },
  {
    id: 4,
    fuelCalibrationName: 'Fuel Calibration 1',
    fuelTankCapacity: '12825'
  },
  {
    id: 5,
    fuelCalibrationName: 'Fuel Calibration 1',
    fuelTankCapacity: '12825'
  },
  {
    id: 6,
    fuelCalibrationName: 'Fuel Calibration 1',
    fuelTankCapacity: '12825'
  },
  {
    id: 7,
    fuelCalibrationName: 'Fuel Calibration 1',
    fuelTankCapacity: '12825'
  }
]
