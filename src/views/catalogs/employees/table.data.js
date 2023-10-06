import React, { useState } from 'react'

// ** Third Party Imports
import { Icon } from '@iconify/react'

// ** custom components
import CustomChip from 'src/@core/components/mui/chip'
import AlertDialog from 'src/components/Dialogs/AlertDialog'

export const columns = ({ ability, router }) => {
  // ** States
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [idx, setIdx] = useState(null)

  // ** Delete Modal
  const handleDeleteOpen = id => {
    setIdx(id)
    setDeleteOpen(true)
  }

  const handleDeleteClose = () => {
    setDeleteOpen(false)
  }

  return [
    {
      name: 'Employee Type',
      selector: row => row?.employeeType
    },
    {
      name: 'Name',
      selector: row => row?.name
    },
    {
      name: 'Department',
      selector: row => row?.department
    },
    {
      name: 'Tag ID',
      selector: row => row?.tagId
    },
    {
      name: 'Mobile No.',
      selector: row => row?.mobileNo
    },
    {
      name: 'Location',
      selector: row => row?.location
    },
    {
      name: 'Pickup Time',
      selector: row => row?.pickupTime
    },
    {
      name: 'Drop Off Time',
      selector: row => row?.dropOffTime
    },
    {
      name: 'Actions',
      width: '150px',
      cell: row => (
        <>
          {ability.can('update', 'update-employees') && (
            <CustomChip
              onClick={() => router.push(`/catalogs/employees/edit/${row.id}`)}
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

          {ability.can('delete', 'delete-employees') && (
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
            close={() => handleDeleteClose()}
            submit={() =>
              console.log('dispatch(deleteOfficeLocationAction({id: idx, callBack: () => handleDeleteClose()}))')
            }
            context='Are you sure you want to delete this employee?'
          />
        </>
      )
    }
  ]
}

export const rows = [
  {
    employeeType: 'Employee',
    name: 'Haris Ahmad Khan',
    department: 'IT',
    tagId: '123123',
    mobileNo: '03459100704',
    location: 'Riyadh, Saudi Arabia',
    pickupTime: '12:00 pm',
    dropOffTime: '12:00 am'
  },
  {
    employeeType: 'Employee',
    name: 'Haris Ahmad Khan',
    department: 'IT',
    tagId: '123123',
    mobileNo: '03459100704',
    location: 'Riyadh, Saudi Arabia',
    pickupTime: '12:00 pm',
    dropOffTime: '12:00 am'
  },
  {
    employeeType: 'Employee',
    name: 'Haris Ahmad Khan',
    department: 'IT',
    tagId: '123123',
    mobileNo: '03459100704',
    location: 'Riyadh, Saudi Arabia',
    pickupTime: '12:00 pm',
    dropOffTime: '12:00 am'
  },
  {
    employeeType: 'Employee',
    name: 'Haris Ahmad Khan',
    department: 'IT',
    tagId: '123123',
    mobileNo: '03459100704',
    location: 'Riyadh, Saudi Arabia',
    pickupTime: '12:00 pm',
    dropOffTime: '12:00 am'
  },
  {
    employeeType: 'Employee',
    name: 'Haris Ahmad Khan',
    department: 'IT',
    tagId: '123123',
    mobileNo: '03459100704',
    location: 'Riyadh, Saudi Arabia',
    pickupTime: '12:00 pm',
    dropOffTime: '12:00 am'
  },
  {
    employeeType: 'Employee',
    name: 'Haris Ahmad Khan',
    department: 'IT',
    tagId: '123123',
    mobileNo: '03459100704',
    location: 'Riyadh, Saudi Arabia',
    pickupTime: '12:00 pm',
    dropOffTime: '12:00 am'
  },
  {
    employeeType: 'Employee',
    name: 'Haris Ahmad Khan',
    department: 'IT',
    tagId: '123123',
    mobileNo: '03459100704',
    location: 'Riyadh, Saudi Arabia',
    pickupTime: '12:00 pm',
    dropOffTime: '12:00 am'
  }
]
