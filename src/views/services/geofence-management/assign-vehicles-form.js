import React, { useState } from 'react'

// ** MUI
import { Autocomplete, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material'

// ** Custom Components
import { SettingsWrapper } from 'src/styles/pages/settings'
import { FieldWrapper, TextInput, TextLabel } from 'src/styles/components/input'
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import { useCommonStyles } from 'src/styles/common'
import { Icon } from '@iconify/react'

import CustomChip from 'src/@core/components/mui/chip'


function AssignVehiclesForm({ formik }) {
  const styles = useCommonStyles()

  const handleDeleteVehicles = id =>{
    const newSelected = formik.values?.assignedVehicles?.filter(vehicle => vehicle.id !== id)
    formik.setFieldValue("assignedVehicles",newSelected )
  }

  const handleSelectedVehicles = (vehicle) => {
    const newArr = JSON.parse(JSON.stringify(formik.values?.selectedVehicles));
    newArr[vehicle.id - 1].checked = !newArr[vehicle.id - 1].checked;
    formik.setFieldValue('selectedVehicles', newArr);
  };

  const handleAssignedVehicles = (vehicle) => {
    const newArr = JSON.parse(JSON.stringify(formik.values?.assignedVehicles));
    newArr[vehicle.id - 1].checked = !newArr[vehicle.id - 1].checked;
    formik.setFieldValue('assignedVehicles', newArr);
  };


  return (
    <SettingsWrapper>
      <Grid container space={2}>
        <Grid item xs={12} sm={6}>
          <Grid item xs={12} md={8}>
            <FieldWrapper>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values?.allVehicles || false}
                    onChange={() => formik.setFieldValue('allVehicles', !formik.values?.allVehicles)}
                    name='select-vehicles'
                    color='primary'
                    sx={{ marginLeft: '0.5rem' }}
                  />
                }
                label='Select Vehicles'
                className={styles.checkboxOrange}
              />
            </FieldWrapper>
            <Grid container px={10}>
                  <Grid item xs={12}>
                    {formik.values?.selectedVehicles?.map(vehicle => (
                      <FormControlLabel
                        key={vehicle?.label}
                        sx={{ width: '100%' }}
                        control={
                          <Checkbox
                            // defaultValue={false}
                            sx={{
                              '&.Mui-checked': {
                                color: '#FF8B00'
                              }
                            }}
                            checked = {formik.values?.allVehicles || formik.values?.selectedVehicles[vehicle.id - 1]?.checked}
                            onChange={() => handleSelectedVehicles(vehicle)}
                          />
                        }
             
                        label={
                          <Typography sx={{ fontWeight: '600', textAlign: 'center', fontSize: '0.875rem' }}>
                            {vehicle.label}
                          </Typography>
                        }
                      />
                    ))}
                  </Grid>
                </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Grid item xs={12} md={8}>
            <FieldWrapper>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.allAssignedVehicles}
                    onChange={() => formik.setFieldValue('allAssignedVehicles', !formik.values.allAssignedVehicles)}
                    name='assigned-vehicles'
                    color='primary'
                    sx={{ marginLeft: '0.5rem' }}
                  />
                }
                label='Assigned Vehicles'
                className={styles.checkboxOrange}
              />
            </FieldWrapper>
            <Grid container px={10}>
                  
                    {formik.values?.assignedVehicles?.map(vehicle => (
                      <Grid item xs={12}  key={vehicle?.id} display="flex" justifyContent="space-between">
                      <FormControlLabel
                        sx={{ width: '100%' }}
                        control={
                          <Checkbox
                            defaultValue={false}
                            sx={{
                              '&.Mui-checked': {
                                color: '#FF8B00'
                              }
                            }}
                            checked = {formik.values?.allAssignedVehicles || formik.values?.assignedVehicles[vehicle.id - 1]?.checked}
                            onChange={() => handleAssignedVehicles(vehicle)}
                          />
                        }
                        label={
                          <Typography sx={{ fontWeight: '600', textAlign: 'center', fontSize: '0.875rem' }}>
                            {vehicle.label}
                          </Typography>
                        }
                      />

                      <CustomChip
                      onClick={() => handleDeleteVehicles(vehicle.id)}
                      size='small'
                      skin='light'
                      label={<Icon icon='iconoir:cancel' width='15' height='15' color='error' style={{ marginTop: '4px' }} />}
                      color='error'
                      sx={{
                        padding: '0.9rem 0rem',
                        marginLeft: 5,
                        "&.MuiButtonBase-root:hover ":{
                          color: '#fff'
                        }
                      }}
                      />

                      </Grid>
                    ))}
                </Grid>
          </Grid>
        </Grid>
      </Grid>
    </SettingsWrapper>
  )
}

export default AssignVehiclesForm
