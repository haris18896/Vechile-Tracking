import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useState } from 'react'
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import { useCommonStyles } from 'src/styles/common'
import { TextInput, TextLabel } from 'src/styles/components/input'

const FleetModal = ({ open, handleClose, title, handleSubmit }) => {
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
      <DialogActions className='dialog-actions-dense' sx={{ justifyContent: 'start' }}>
        <ButtonIcon color='success' sx={{ width: 120 }} type='submit'>
          Add
        </ButtonIcon>
        <ButtonIcon color='error' sx={{ width: 120 }} onClick={handleClose}>
          Cancel
        </ButtonIcon>
      </DialogActions>
    </Dialog>
  )
}

export default FleetModal
