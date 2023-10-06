import React from 'react'
import { useTranslation } from 'react-i18next'

// ** third party components
import PropTypes from 'prop-types'

// ** MUI
import { Box } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

// ** Custom Components
import { Icon } from '@iconify/react'
import ButtonIcon from '../buttons/ButtonIcon'

function AlertDialog({ id, open, close, children, context, title, icon, submit, IconWd, IconHt, iconColor, bg }) {
  const { t } = useTranslation()

  return (
    <Dialog open={open} onClose={close} aria-labelledby={id} sx={{ '& .MuiPaper-root': { background: bg } }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '1rem',
          flexDirection: 'column'
        }}
      >
        {title && (
          <DialogTitle sx={{ paddingBottom: '0', paddingTop: 0 }} id={id}>
            {title}
          </DialogTitle>
        )}
        {icon && <Icon color={iconColor} icon={icon} width={IconWd} height={IconHt} />}
      </Box>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <DialogContentText sx={{ mb: 3, textAlign: 'center', width: '80%' }}>{context}</DialogContentText>
        {children}
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ButtonIcon color='success' type='submit' onClick={submit}>
          {t('Yes')}
        </ButtonIcon>
        <ButtonIcon color='error' onClick={close}>
          {t('No')}
        </ButtonIcon>
      </DialogActions>
    </Dialog>
  )
}

AlertDialog.propTypes = {
  id: PropTypes.string,
  open: PropTypes.bool,
  close: PropTypes.func,
  children: PropTypes.node,
  context: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  submit: PropTypes.func,
  IconWd: PropTypes.string,
  IconHt: PropTypes.string,
  iconColor: PropTypes.string
}

export default AlertDialog
