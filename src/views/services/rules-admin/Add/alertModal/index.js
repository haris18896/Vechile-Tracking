import {
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import { useCommonStyles } from 'src/styles/common'
import { TextInput, TextLabel } from 'src/styles/components/input'

import { useCustomStyles } from 'src/styles/pages/services/edit'
import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'
import { Icon } from '@iconify/react'


const AlertModal = ({ open, handleClose, title, handleSubmit, alertDetails, formik }) => {
  const [asset, setAsset] = useState('')
  const styles = useCustomStyles({ modalBg: '#fff' })

  const formControl = makeStyles((theme, props) => ({
    Check: {
      '& .MuiButtonBase-root': {
        color: '#fff'
      }
    }
  }))

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='add-permission'
      className={styles.Modal}
      PaperProps={{ sx: { width: '80%' } }}
    >
      <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}
          px={5}
        >
            <DialogTitle sx={{ padding: 0, fontWeight: '600', color: '#556485' }}>
              {title}
            </DialogTitle>
            <Icon
              color="#000"
              icon="uil:times"
              width={25}
              height={25}
              style={{ cursor: 'pointer' }}
              onClick={handleClose}
            />
    
        </Box>
      <form name='add-permissions' onSubmit={handleSubmit(asset)}>
        <DialogContent>
          <Box sx={{flex: 1}}>
              <Grid container spacing={4}>
                {alertDetails?.map(alert => (
                      <Grid item xs={12} md={6} key={alert.value} display="flex" alignItems="center">
                        <Box sx={{ borderRadius: '50px', background: formik.values?.[alert.value] ? "#2FC17E" : "#C0C5D0", width: 120, 
                        display: 'flex', alignItems:'center', flexShrink: 0 }}>
                        <Switch
                          checked={formik.values?.[alert.value]}
                          onChange={() => formik.setFieldValue(alert.value, !formik.values?.[alert.value])}
                          inputProps={{ 'aria-label': 'controlled' }}
                          sx={{ "& .MuiSwitch-thumb":{ width: '15px', height: '15px', background: formik.values?.[alert.value] ? "#2FC17E" : "#C0C5D0"  },
                                "& .MuiSwitch-track":{ borderRadius: '50px', height: '20px', background: "#fff !important"},
                                "& .MuiSwitch-switchBase":{ left: formik.values?.[alert.value] ? '0px' : '5px', top: '5px'}
                        }}
                        /> <Typography sx={{color: '#fff', fontSize: '0.8rem', fontWeight: '500'}}>ENABLE</Typography>
                        </Box>
                       <Typography sx={{ fontSize: '0.875rem', fontWeight: '600', color: '#556485'}} ml={3}>{alert.label}</Typography>
                      </Grid>
                ))}
            
              </Grid>
          </Box>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <ButtonIcon type='submit' color='orange' sx={{ width: '100%' }}>
            Save
          </ButtonIcon>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AlertModal
