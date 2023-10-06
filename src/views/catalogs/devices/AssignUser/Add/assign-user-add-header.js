import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI
import Grid from '@mui/material/Grid'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'

// ** Styles
import { HeaderLabel } from 'src/styles/components/input'
import { ServicesWrapper } from 'src/styles/pages/services'

function AssignUserAddHeader(props) {
  const { handleSubmit } = props
  const router = useRouter()
  const {pathname} = router;

  return (
    <ServicesWrapper>
      <Grid container spacing={4}>

      <Grid item xs={12} sm mb={{ xs: 2, sm: 0 }}>
      <HeaderLabel>{pathname === "/catalogs/devices/assign-user/[edit]" ?  "Edit Device Details" : "Add Device Details"}</HeaderLabel>
      </Grid>

      <Grid item>
      <ButtonIcon
      sx={{ width: 120 }}
      color='grey'
      iconWidth={20}
      iconHeight={15}
      startIcon={'ic:round-arrow-back-ios-new'}
      onClick={() => router.back()}
      >
      Back
      </ButtonIcon>
      </Grid>

      <Grid item>
      <ButtonIcon
      sx={{ width: 120 }}
      color='success'
      iconWidth={30}
      iconHeight={'auto'}
      startIcon={'material-symbols:check-small-rounded'}
      onClick={handleSubmit}
      >
      Save
      </ButtonIcon>
      </Grid>

      <Grid item>
      <ButtonIcon
      sx={{ width: 120 }}
      color='grey'
      iconWidth={30}
      iconHeight={20}
      startIcon={'prime:times'}
      onClick={() => router.back()}
      >
      Cancel
      </ButtonIcon>
      </Grid>
      </Grid>
    </ServicesWrapper>
  )
}

export default AssignUserAddHeader
