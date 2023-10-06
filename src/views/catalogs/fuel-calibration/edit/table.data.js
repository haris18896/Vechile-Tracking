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
      name: 'ID',
      selector: row => row?.id
    },
    {
      name: 'Fuel (Liters)',
      selector: row => row?.fuel
    },
    {
      name: '%',
      selector: row => row?.percentage
    },
    {
      name: 'CM',
      selector: row => row?.cm
    },
    {
      name: 'Remove',
      width: '150px',
      cell: row => (
        <>
          {/* {ability.can('delete', 'delete-fuel-calibration') && ( */}
          <CustomChip
            onClick={() => handleDeleteOpen(row.id)}
            size='small'
            skin='light'
            label={<Icon icon='iconoir:cancel' width='15' height='15' color='error' />}
            color='error'
            sx={{
              padding: '0.9rem 0rem',
              display: 'none'
            }}
          />
          {/* )} */}
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
    fuelCalibrationName: 'Fuel Calibration 1',
    fuelTankCapacity: '12825'
  },
  {
    fuelCalibrationName: 'Fuel Calibration 1',
    fuelTankCapacity: '12825'
  },
  {
    fuelCalibrationName: 'Fuel Calibration 1',
    fuelTankCapacity: '12825'
  },
  {
    fuelCalibrationName: 'Fuel Calibration 1',
    fuelTankCapacity: '12825'
  },
  {
    fuelCalibrationName: 'Fuel Calibration 1',
    fuelTankCapacity: '12825'
  },
  {
    fuelCalibrationName: 'Fuel Calibration 1',
    fuelTankCapacity: '12825'
  },
  {
    fuelCalibrationName: 'Fuel Calibration 1',
    fuelTankCapacity: '12825'
  }
]
