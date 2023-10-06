import React from 'react'
import { useTranslation } from 'react-i18next'

// ** Third Party package
import toast from 'react-hot-toast'
import { Icon } from '@iconify/react'

// ** MUI
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar'
import { Avatar, ToastTitle, ToastContent, ToastTitleWrapper, ToastWrapper } from 'src/styles/common'

export const ToastComponent = ({ id, title, msg, icon }) => {
  const { t } = useTranslation()

  return (
    <ToastWrapper>
      <Icon icon='icon-park-solid:check-one' color='green' width='30' height='30' />
      <Box>
        {title && (
          <ToastTitleWrapper>
            <ToastTitle variant={'body'}>{t(`${title}`)}</ToastTitle>
            <Icon icon={'ic:sharp-cancel'} color={'#b9bdba'} width={20} height={20} onClick={() => toast.dismiss(id)} />
          </ToastTitleWrapper>
        )}

        <ToastTitleWrapper>
          <ToastContent title={title} variant={'body2'}>
            {t(`${msg}`)}
          </ToastContent>
          {!title && (
            <Icon icon={'ic:sharp-cancel'} color={'#b9bdba'} width={30} height={30} onClick={() => toast.dismiss(id)} />
          )}
        </ToastTitleWrapper>
      </Box>
    </ToastWrapper>
  )
}
