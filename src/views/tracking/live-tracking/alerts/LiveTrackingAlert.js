import React from 'react'

// ** third party components
import PropTypes from 'prop-types'

// ** MUI
import { Box } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

// ** Custom Components
import { Icon } from '@iconify/react'

function LiveTrackingAlert({ id, open, close, children, context, title, icon, IconWd, IconHt, iconColor, value }) {
  return (
    <Dialog open={open} onClose={close} aria-labelledby={id}>
      <DialogContent
        sx={{
          width: '35vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          {title && (
            <DialogTitle sx={{ padding: 0, fontWeight: '600' }} id={id}>
              {title}
            </DialogTitle>
          )}
          {icon && (
            <Icon
              color={iconColor}
              icon={icon}
              width={IconWd}
              height={IconHt}
              style={{ cursor: 'pointer' }}
              onClick={close}
            />
          )}
        </Box>

        <DialogContentText sx={{ mb: 3, textAlign: 'center', width: '80%' }}>{context}</DialogContentText>
        {children}
      </DialogContent>
    </Dialog>
  )
}

LiveTrackingAlert.propTypes = {
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
  iconColor: PropTypes.string,
  value: PropTypes.number
}

export default LiveTrackingAlert
