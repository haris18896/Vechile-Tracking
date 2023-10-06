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
      name: 'Vehicle',
      selector: row => row?.fuel
    },
    {
      name: 'SensorId',
      selector: row => row?.percentage
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
