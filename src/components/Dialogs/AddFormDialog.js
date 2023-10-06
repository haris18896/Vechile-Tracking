import React from 'react'

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
import ButtonIcon from '../buttons/ButtonIcon'

function AddFormDialog({
  id,
  open,
  close,
  children,
  context,
  title,
  submit,
  agree,
  cancel,
  save,
  bg,
  noBackdrop,
  titleBg,
  btnFull,
  ...rest
}) {
  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby={id}
      sx={{ backgroundColor: noBackdrop ? 'transparent' : '#10234b90' }}
      hideBackdrop
      {...rest}
    >
      <DialogTitle id={id} sx={{ background: titleBg }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 3 }}>{context}</DialogContentText>
        {children}
      </DialogContent>
      {save ? (
        <DialogActions className='dialog-actions-dense'>
          <ButtonIcon color='orange' onClick={submit} fullWidth={btnFull}>
            {save}
          </ButtonIcon>
        </DialogActions>
      ) : (
        <DialogActions className='dialog-actions-dense'>
          {cancel && (
            <ButtonIcon
              sx={{
                '&.MuiButtonBase-root': {
                  padding: cancel?.length > 3 || agree?.length > 3 ? '0.25rem 1rem' : '0.25rem 1.4rem'
                }
              }}
              color='error'
              onClick={close}
            >
              {cancel}
            </ButtonIcon>
          )}

          {agree && (
            <ButtonIcon
              fullWidth={btnFull}
              sx={{
                '&.MuiButtonBase-root': {
                  padding: cancel?.length > 3 || agree?.length > 3 ? '0.25rem 1rem' : '0.25rem 1.4rem'
                }
              }}
              color='success'
              onClick={submit}
            >
              {agree}
            </ButtonIcon>
          )}
        </DialogActions>
      )}
    </Dialog>
  )
}

AddFormDialog.propTypes = {
  id: PropTypes.string,
  open: PropTypes.bool,
  close: PropTypes.func,
  children: PropTypes.node,
  context: PropTypes.string,
  title: PropTypes.string,
  submit: PropTypes.func,
  agree: PropTypes.string,
  cancel: PropTypes.string
}

export default AddFormDialog
