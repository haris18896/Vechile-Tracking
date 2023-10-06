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

//Modal for Route Management
const Modal = ({ open, handleClose, title, handleSubmit, vehicles }) => {
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
      <DialogTitle id='add-permission' sx={{ fontWeight: '700', color: '#556485' }}>
        {title}
      </DialogTitle>
      <form name='add-permissions' onSubmit={handleSubmit(asset)}>
        <DialogContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container rowSpacing={5} columnSpacing={5}>
              <Grid item xs={12}>
                <Grid container mb={5} sx={{ alignItems: { xs: 'start', sm: 'center' } }} rowSpacing={1}>
                  <Grid item xs={12}>
                    <Typography variant='body' sx={{ fontWeight: '600', color: '#556485' }}>
                      Search Asset
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name='assetName'
                      id='outlined-basic'
                      variant='outlined'
                      placeholder=''
                      value={asset}
                      onChange={e => setAsset(e.target.value)}
                      className={styles.TextField}
                    ></TextField>
                  </Grid>
                </Grid>
              </Grid>
              {/* Vehicles Checkboxes */}
              <Grid item xs={6}>
                <Grid
                  container
                  rowSpacing={1}
                  sx={{ background: '#FF8B00', padding: '0.2rem 1rem', borderRadius: '50px' }}
                  mb={3}
                >
                  <FormControlLabel
                    className={formControl.Check}
                    control={
                      <Checkbox
                        defaultValue={false}
                        sx={{
                          color: '#fff',
                          '&.Mui-checked': {
                            color: '#fff'
                          }
                        }}
                      />
                    }
                    label={
                      <Typography
                        sx={{
                          fontWeight: '600',
                          textAlign: 'center',
                          color: '#fff'
                        }}
                      >
                        Vehicles
                      </Typography>
                    }
                  />
                </Grid>

                <Grid container sx={{ padding: '0.2rem 1rem' }}>
                  <Grid item xs={12}>
                    {vehicles.map(vehicle => (
                      <FormControlLabel
                        key={vehicle.name}
                        sx={{ width: '100%' }}
                        control={
                          <Checkbox
                            defaultValue={false}
                            sx={{
                              '&.Mui-checked': {
                                color: '#FF8B00'
                              }
                            }}
                          />
                        }
                        label={
                          <Typography sx={{ fontWeight: '600', textAlign: 'center', fontSize: '0.875rem' }}>
                            {vehicle.name}
                          </Typography>
                        }
                      />
                    ))}
                  </Grid>
                </Grid>
              </Grid>
              {/* Assign Vehicles Checkboxes */}
              <Grid item xs={6}>
                <Grid
                  container
                  rowSpacing={1}
                  sx={{ background: '#FF8B00', padding: '0.2rem 1rem', borderRadius: '50px' }}
                  mb={3}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultValue={false}
                        sx={{
                          color: '#fff',
                          '&.Mui-checked': {
                            color: '#fff'
                          }
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ fontWeight: '600', color: '#fff', textAlign: 'center' }}>
                        Assigned Vehicles
                      </Typography>
                    }
                  />
                </Grid>

                <Grid container sx={{ padding: '0.2rem 1rem' }}>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultValue={false}
                          sx={{
                            '&.Mui-checked': {
                              color: '#FF8B00'
                            }
                          }}
                        />
                      }
                      label={
                        <Typography sx={{ fontWeight: '600', textAlign: 'center', fontSize: '0.875rem' }}>
                          3575 VAB
                        </Typography>
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
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

export default Modal
