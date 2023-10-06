import React from 'react'

// ** MUI
import { Typography } from '@mui/material'

// ** Styled Components
import { NoDataInTable } from 'src/styles/common'

// ** Third Party Packages
import { Icon } from '@iconify/react'
import Image from 'next/image'

function NoDataAvailable() {
  return (
    <NoDataInTable>
      <Image src="/images/icons/tracking-icons/no-data-sticker.svg" alt={'image'}  width={70} height={70}/>
      {/* <Icon icon='basil:box-solid' color='#0f224b' width='70' height='70' /> */}
      <Typography variant='body' sx={{ fontWeight: '600' }}>
        No data available
      </Typography>
    </NoDataInTable>
  )
}

export default NoDataAvailable
