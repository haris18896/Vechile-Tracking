import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useState } from 'react'
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import { useCommonStyles } from 'src/styles/common'
import { TextInput, TextLabel } from 'src/styles/components/input'

const TrackingModal = ({ open, handleClose, title, handleSubmit }) => {
  const [email, setEmail] = useState('')
  const styles = useCommonStyles()

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='add-permission' className={styles.modal}>
      <DialogTitle id='add-permission'>{title}</DialogTitle>
      <DialogContent>
        <form name='add-permissions' onSubmit={handleSubmit(email)}>
          <div>
            <TextLabel id='email-id'>Email IDS</TextLabel>
            <TextInput
              id='email'
              autoFocus
              fullWidth
              type='text'
              placeholder='Enter email ID'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </form>
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <ButtonIcon color='error' onClick={handleClose}>
          Cancel
        </ButtonIcon>
        <ButtonIcon color='success' type='submit'>
          Add
        </ButtonIcon>
      </DialogActions>
    </Dialog>
  )
}

export default TrackingModal
