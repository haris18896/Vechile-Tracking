import React from 'react'

// ** Hooks
import useMediaQuery from 'src/hooks/useMediaQuery'

// ** Custom components
import { HeaderLabel } from 'src/styles/components/input'
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import { InLineBlock, SpaceBetweenWrapper } from 'src/styles/common'

// ** MUI
import { Typography } from '@mui/material'

function SettingsHeaderAddEdit(props) {
  const { title, isRTL, back, backAction, submit, submitText, loading } = props

  // ** Media Query
  const phone = useMediaQuery('(max-width: 500px)')

  return (
    <SpaceBetweenWrapper>
      <HeaderLabel sx={{ mr: 4 }}>{title}</HeaderLabel>

      <InLineBlock phone={`${phone}`}>
        <ButtonIcon
          color='grey'
          iconWidth={20}
          iconHeight={15}
          fullWidth={phone ? true : false}
          onClick={backAction}
          startIcon={!isRTL ? 'ic:round-arrow-back-ios-new' : 'ic:round-arrow-forward-ios'}
        >
          <Typography sx={{ px: '0.5rem' }} className='capitalized' variant='body'>
            {back}
          </Typography>
        </ButtonIcon>

        <ButtonIcon
          iconWidth={20}
          iconHeight={15}
          sx={{ marginLeft: '1rem' }}
          startIcon={'ph:check-bold'}
          fullWidth={phone}
          loading={loading}
          color={loading ? 'grey' : 'success'}
          onClick={submit}
        >
          <Typography sx={{ px: '0.5rem' }} className='capitalized' variant='body'>
            {submitText}
          </Typography>
        </ButtonIcon>
      </InLineBlock>
    </SpaceBetweenWrapper>
  )
}

export default SettingsHeaderAddEdit
