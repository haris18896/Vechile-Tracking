import React, { useState } from 'react'

// ** MUI
import { Box, Typography } from '@mui/material'

// ** Third Party Imports
import { Icon } from '@iconify/react'

// ** custom components
import CustomChip from 'src/@core/components/mui/chip'

// ** utils
import { writeToClipboard } from 'src/configs/utils'

export const columns = ({ ability, handleOpenDialog, handleUpdate, updateAbility, deleteAbility }) => {
  return [
    {
      name: 'Name',
      sortable: true,
      cell: row => (
        <Typography className='capitalized' variant='body' color='textPrimary'>
          {row?.company_name || '--'}
        </Typography>
      )
    },

    {
      name: 'POC',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.poc_name || '--'}
        </Typography>
      )
    },

    {
      name: 'POC Contact',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.mobile || '--'}
        </Typography>
      )
    },

    {
      name: 'POC Email',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.poc_email || '--'}
        </Typography>
      )
    },

    {
      name: 'Commercial Record Number',
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.commerical_record_no || '--'}
        </Typography>
      )
    },

    {
      name: 'Identity Number',
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.identity_number || '--'}
        </Typography>
      )
    },

    {
      name: 'Manager',
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.manager_name || '--'}
        </Typography>
      )
    },

    {
      name: 'Manager Email',
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.manager_email || '--'}
        </Typography>
      )
    },

    {
      name: 'Manager Phone',
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.manager_phone || '--'}
        </Typography>
      )
    },
    {
      name: 'Technical Manager',
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.technical_name || '--'}
        </Typography>
      )
    },
    {
      name: 'Technical Manager Email',
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.technical_email || '--'}
        </Typography>
      )
    },
    {
      name: 'Technical Manager Phone',
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.technical_phone || '--'}
        </Typography>
      )
    },
    {
      name: 'CS Manager',
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.cs_account_manager || '--'}
        </Typography>
      )
    },
    {
      name: 'CS Manager Email',
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.cs_account_manager_email || '--'}
        </Typography>
      )
    },
    {
      name: 'CS Manager Phone',
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.cs_account_manager_phone || '--'}
        </Typography>
      )
    },
    {
      name: 'LOGIN',
      sortable: true,
      minWidth: "200px",
      cell: row => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <Typography variant='body' color='textPrimary'>
            {/* {row?.created_at.split('T')[0]} */}
            {`${row?.subdomain}.sparning.ai` || '--'}
          </Typography>
          <Icon
            icon='line-md:clipboard-check'
            width='25'
            height='25'
            color='#FF8B00'
            onClick={() => writeToClipboard(`${row?.subdomain}.sparning.ai`)}
          />
        </Box>
      )
    },
    {
      name: 'Status',
      sortable: false,
      cell: row => (
        <CustomChip
          size='small'
          label='Active'
          color='success'
          skin='light'
          sx={{
            padding: '0.4rem 0.5rem',
            '& .MuiChip-label': {
              fontSize: '0.85rem',
              fontWeight: 600
            }
          }}
        />
      )
    },
    {
      name: 'Actions',
      sortable: false,
      cell: row => {
        return (
          <div className='flex items-center justify-content-between'>
            {ability.can('update', `${updateAbility}`) && (
              <CustomChip
                onClick={() => handleUpdate(row)}
                size='small'
                label={
                  <Icon icon='ri:edit-2-line' width='15' height='15' color='success' style={{ marginTop: '4px' }} />
                }
                color='success'
                skin='light'
                sx={{
                  padding: '0.95rem 0rem',
                  marginRight: '0.5rem'
                }}
              />
            )}

            {ability.can('delete', `${deleteAbility}`) && (
              <CustomChip
                size='small'
                skin='light'
                onClick={() => handleOpenDialog('delete', row)}
                label={<Icon icon='iconoir:cancel' width='15' height='15' color='error' style={{ marginTop: '4px' }} />}
                color='error'
                sx={{
                  padding: '0.9rem 0rem'
                }}
              />
            )}
          </div>
        )
      }
    }
  ]
}

export const rows = [
  {
    id: 1223,
    company_name: 'ABC X123M',
    poc_name: 'N/A',
    poc_contact: '9232385777',
    poc_email: 'hellopoc2@gmail.com',
    created_at: '11 May 2012',
    slug: '156'
  },
  {
    id: 1223,
    company_name: 'TRT GHL11',
    poc_name: 'N/A',
    poc_contact: '92323213222',
    poc_email: 'hellopoc2@gmail.com',
    created_at: '11 May 2012',
    slug: '321'
  }
]
