import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Checkbox, FormControlLabel, ListItem, Typography } from '@mui/material'
import { Autocomplete } from '@mui/material'


// ** Third Party Imports
import * as Yup from 'yup'
import moment from 'moment'
import { useFormik } from 'formik'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'

// ** Styles
import { SmallMapWrapper, useCommonStyles } from 'src/styles/common'
import { PlaceholderText, Required, SelectItem, useCustomStyles } from 'src/styles/pages/services/edit'
import { InputDatePicker, useDatepickerStyles } from 'src/styles/components/datepicker'
import { GraphsWrapper } from 'src/styles/pages/graphs'
import { TextInput, TextLabel, FieldWrapper, FieldHorizontalWrapper } from 'src/styles/components/input'

// ** utils
import { isObjEmpty } from 'src/configs/utils'
import { Icon } from '@iconify/react'

// ** Google Map
import { Marker } from '@react-google-maps/api'
import { TextField } from '@mui/material'
import { ReportsWrapper } from 'src/styles/pages/reports'
import { ServicesWrapper } from 'src/styles/pages/services'

function PartManagement({ slug, onChangeHandler, customers }) {
  const common = useCommonStyles()
  const customStyles = useCustomStyles()
  const datepickerStyles = useDatepickerStyles()
  

  // ** State
  const [open, setOpen] = useState(false)
  const [currentLocation, setCurrentLocation] = useState({})
  const [location, setLocation] = useState({})

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }, [])

  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  //Schema
  const schema = Yup.object().shape({
    customer_id: Yup.string().required('Account Number is required'),
    partNumber: Yup.string().required('Part Number is required'),
    manuFacture:Yup.string().required('Manufacture is required'),
    quantityHand:Yup.string().required('Quantity Hand is required'),
    costPerPart:Yup.string().required('cost per part is required'),
    type:Yup.string().required('Type is required'),
    supportVeichle:Yup.string().required('Support Veichle is Requird')
  });


  const formik = useFormik({
    initialValues: {
      customer_id: '',
      partNumber:'',
      manuFacture:'',
      quantityHand:'',
      costPerPart:'',
      type:'',
      supportVeichle:''

    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm })  => {
      if (isObjEmpty(formik.errors)) {
        const data = {
          
        }

        const role = useJwt.getUserData().role

        if (role === 'admin') {
          data.user_type = 'main_db_admin'
        }

        if (slug) {
          data.slug = slug
        }

        console.log('data to be submitted', data)

        resetForm()
        handleClose()

      }
    }
  })


  // ** Form Values
  
  // ========= Options =========

  const trackDataOptions = [
    { name: 'Select', slug: '' },
    { name: 'Tracking', slug: 'track-11' },
    { name: 'Tracking2', slug: 'track-12' }
  ]

  const assetOptions = [
    { name: 'Select', slug: '' },
    { name: 'Asset1', slug: 'asset-11' },
    { name: 'Asset2', slug: 'asset-12' }
  ]

  const timeOptions = ['12 am', '1 am', '2 am', '3 am']

  const time = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    // Add more options as needed
  ];
  
  const partNumber = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    // Add more options as needed
  ];

  const manuFacture = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  const quantityHand = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ]

  const costPerPart = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ]

  const type = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ]

  const supportVeichle = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ]
  // ========= States =========
  const [date, setDate] = useState('')

  const [values, setValues] = useState({
    trackVal: '',
    assetName: '',
    time: ''
  })

  // Change Handler
  const changeHandler = e => {
    e.preventDefault()
    const { value, name } = e.target
    setValues({ ...values, [name]: value })
  }

  // Destructuring values
  const { trackVal, assetName } = values

 
  

  return (
    <ServicesWrapper className='services-wrapper'>
      <Grid container spacing={2}>
        <Grid
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'start',
            width: '100%',
            gap: '20px'
          }}
        >
          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              flex: '1',
              alignItems: 'center'
            }}
          >
            <FieldHorizontalWrapper sx={{ gap: '10px', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
              <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center', display: 'flex' }}>
                Account <Required>*</Required>
              </Typography>
              <Autocomplete
                      id='customer_type'
                      name='country'
                      options={time}
                      value={time.find((option) => option.value === formik.values.customer_id)}
                      onChange={(e, value) => {
                        formik.setFieldValue('customer_id', value?.value);
                      }}
                    
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        padding: '4px !important',
                        borderWidth: '1px black !important',

                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '1px black !important',
                        color: 'black !important',
                        borderColor:
                          formik.touched.customer_id && formik.errors.customer_id ? '#E53E3E !important' : '#black !important'
                      },
                      '& .MuiAutocomplete-input.MuiOutlinedInput-input': {
                        color: 'black !important'
                      }
                    }}
                    // value={countriesList?.find(country => country.label === formik.values.country)}
                    className={common.AutoCompleteSelect}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select Account'
                        {...formik.getFieldProps('customer_id')}
                        error={formik.touched.customer_id && Boolean(formik.errors.customer_id)}
                        helperText={formik.touched.customer_id && formik.errors.customer_id}
                      />
                    )}                  
                  />
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper sx={{ gap: '10px', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
              <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center', display: 'flex' }}>
                Part Number<Required>*</Required>
              </Typography>
              <Autocomplete
                      id='partNumber'
                      name='country'
                      options={partNumber}
                      value={partNumber.find((option) => option.partNumber === formik.values.partNumber)}
                      onChange={(e, value) => {
                        formik.setFieldValue('partNumber', value?.value);
                      }}
                    
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        padding: '4px !important',
                        borderWidth: '1px black !important',

                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '1px black !important',
                        color: 'black !important',
                        borderColor:
                          formik.touched.partNumber && formik.errors.partNumber ? '#E53E3E !important' : '#black !important'
                      },
                      '& .MuiAutocomplete-input.MuiOutlinedInput-input': {
                        color: 'black !important'
                      }
                    }}
                    // value={countriesList?.find(country => country.label === formik.values.country)}
                    className={common.AutoCompleteSelect}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select your Part Number'
                        {...formik.getFieldProps('partNumber')}
                        error={formik.touched.partNumber && Boolean(formik.errors.partNumber)}
                        helperText={formik.touched.partNumber && formik.errors.partNumber}
                      />
                    )}                  
                  />
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper sx={{ gap: '10px', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
              <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center', display: 'flex' }}>
                Manufacturer<Required>*</Required>
              </Typography>
              <Autocomplete
                      id='manuFacture'
                      name='country'
                      options={manuFacture}
                      value={manuFacture.find((option) => option.value === formik.values.manuFacture)}
                      onChange={(e, value) => {
                        formik.setFieldValue('manuFacture', value?.value);
                      }}
                    
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        padding: '4px !important',
                        borderWidth: '1px black !important',

                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '1px black !important',
                        color: 'black !important',
                        borderColor:
                          formik.touched.manuFacture && formik.errors.manuFacture ? '#E53E3E !important' : '#black !important'
                      },
                      '& .MuiAutocomplete-input.MuiOutlinedInput-input': {
                        color: 'black !important'
                      }
                    }}
                    // value={countriesList?.find(country => country.label === formik.values.country)}
                    className={common.AutoCompleteSelect}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select your manuFacturer'
                        {...formik.getFieldProps('manuFacture')}
                        error={formik.touched.manuFacture && Boolean(formik.errors.manuFacture)}
                        helperText={formik.touched.manuFacture && formik.errors.manuFacture}
                      />
                    )}                  
                  />
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper sx={{ gap: '10px', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
              <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center', display: 'flex' }}>
                Quantity on Hand<Required>*</Required>
              </Typography>
              <Autocomplete
                      id='quantityHand'
                      name='country'
                      options={quantityHand}
                      value={quantityHand.find((option) => option.value === formik.values.quantityHand)}
                      onChange={(e, value) => {
                        formik.setFieldValue('quantityHand', value?.value);
                      }}
                    
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        padding: '4px !important',
                        borderWidth: '1px black !important',

                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '1px black !important',
                        color: 'black !important',
                        borderColor:
                          formik.touched.quantityHand && formik.errors.quantityHand ? '#E53E3E !important' : '#black !important'
                      },
                      '& .MuiAutocomplete-input.MuiOutlinedInput-input': {
                        color: 'black !important'
                      }
                    }}
                    // value={countriesList?.find(country => country.label === formik.values.country)}
                    className={common.AutoCompleteSelect}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select Your Quantity hand'
                        {...formik.getFieldProps('quantityHand')}
                        error={formik.touched.quantityHand && Boolean(formik.errors.quantityHand)}
                        helperText={formik.touched.quantityHand && formik.errors.quantityHand}
                      />
                    )}                  
                  />
            </FieldHorizontalWrapper>
          </Grid>

          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'center',
              width: '100%'
            }}
            md={6}
          >
            <FieldHorizontalWrapper sx={{ gap: '10px', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
              <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center', display: 'flex' }}>
                Cost Per Part<Required>*</Required>
              </Typography>
              <Autocomplete
                      id='costPerPart'
                      name='country'
                      options={costPerPart}
                      value={costPerPart.find((option) => option.value === formik.values.costPerPart)}
                      onChange={(e, value) => {
                        formik.setFieldValue('costPerPart', value?.value);
                      }}
                    
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        padding: '4px !important',
                        borderWidth: '1px black !important',

                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '1px black !important',
                        color: 'black !important',
                        borderColor:
                          formik.touched.costPerPart && formik.errors.costPerPart ? '#E53E3E !important' : '#black !important'
                      },
                      '& .MuiAutocomplete-input.MuiOutlinedInput-input': {
                        color: 'black !important'
                      }
                    }}
                    // value={countriesList?.find(country => country.label === formik.values.country)}
                    className={common.AutoCompleteSelect}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select Your cost per part'
                        {...formik.getFieldProps('costPerPart')}
                        error={formik.touched.costPerPart && Boolean(formik.errors.costPerPart)}
                        helperText={formik.touched.costPerPart && formik.errors.costPerPart}
                      />
                    )}                  
                  />
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper
              sx={{ gap: '10px', marginLeft: 'auto', flexDirection: 'column', alignItems: 'start', width: '100%' }}
            >
              <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center', display: 'flex' }}>
                Type<Required>*</Required>
              </Typography>
              <Autocomplete
                      id='type'
                      name='country'
                      options={type}
                      value={type.find((option) => option.value === formik.values.type)}
                      onChange={(e, value) => {
                        formik.setFieldValue('type', value?.value);
                      }}
                    
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        padding: '4px !important',
                        borderWidth: '1px black !important',

                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '1px black !important',
                        color: 'black !important',
                        borderColor:
                          formik.touched.type && formik.errors.type ? '#E53E3E !important' : '#black !important'
                      },
                      '& .MuiAutocomplete-input.MuiOutlinedInput-input': {
                        color: 'black !important'
                      }
                    }}
                    // value={countriesList?.find(country => country.label === formik.values.country)}
                    className={common.AutoCompleteSelect}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select Your Type'
                        {...formik.getFieldProps('type')}
                        error={formik.touched.type && Boolean(formik.errors.type)}
                        helperText={formik.touched.type && formik.errors.type}
                      />
                    )}                  
                  />
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper
              sx={{ gap: '10px', marginLeft: 'auto', flexDirection: 'column', alignItems: 'start', width: '100%' }}
            >
              <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center', display: 'flex' }}>
                Supported Vehicle<Required>*</Required>
              </Typography>
              <Autocomplete
                      id='supportVeichle'
                      name='country'
                      options={type}
                      value={supportVeichle.find((option) => option.value === formik.values.supportVeichle)}
                      onChange={(e, value) => {
                        formik.setFieldValue('supportVeichle', value?.value);
                      }}
                    
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        padding: '4px !important',
                        borderWidth: '1px black !important',

                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '1px black !important',
                        color: 'black !important',
                        borderColor:
                          formik.touched.supportVeichle && formik.errors.supportVeichle ? '#E53E3E !important' : '#black !important'
                      },
                      '& .MuiAutocomplete-input.MuiOutlinedInput-input': {
                        color: 'black !important'
                      }
                    }}
                    // value={countriesList?.find(country => country.label === formik.values.country)}
                    className={common.AutoCompleteSelect}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select Support Veichle'
                        {...formik.getFieldProps('supportVeichle')}
                        error={formik.touched.supportVeichle && Boolean(formik.errors.supportVeichle)}
                        helperText={formik.touched.supportVeichle && formik.errors.supportVeichle}
                      />
                    )}                  
                  />
            </FieldHorizontalWrapper>
          </Grid>
        </Grid>
      </Grid>
    </ServicesWrapper>
  )
}

export default PartManagement

PartManagement.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
