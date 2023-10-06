/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

// ** Third Party Packages
import * as Yup from 'yup'
import moment from 'moment'
import validator from 'validator'
import { useFormik } from 'formik'

// ** Utils && hooks
import { UrlPattern, isObjEmpty } from 'src/utilities/utils'

// ** Custom components
import FormElement from 'src/components/form-element'
import { FileUploaderWrapper } from 'src/styles/common'
import { TextLabel } from 'src/styles/components/input'
import { FormControlLabel } from 'src/styles/pages/login'
import SelectElement from 'src/components/form-element/Select'
import { FieldHorizontalFlex } from 'src/styles/components/input'
import { SettingsWrapper, Title } from 'src/styles/pages/settings'
import SettingsHeaderAddEdit from 'src/views/SettingsHeaderAddEdit'
import PasswordElement from 'src/components/form-element/PasswordElement'
import DatePickerElement from 'src/components/form-element/DatePickerElement'
import FileUploaderRestrictions from 'src/components/FileUploader/file-uploader-restricted'

// ** Mui
import { Grid } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { useTheme } from '@mui/material/styles'

// ** Store
import { useDispatch, useSelector } from 'react-redux'
import {
  updateCustomerAction,
  getCustomerByIdAction,
  registerCustomerAction
} from 'src/store/settings/customers/customersActions'
import {
  resetUpdateCustomer,
  resetGetCustomerById,
  resetRegisterCustomer
} from 'src/store/settings/customers/customersSlice'
import { getAllCountriesAction, getAllStatesAction, getAllCitiesAction } from 'src/store/locations/locationsAction'
import { getAllActivitiesAction } from 'src/store/settings/activity/activityAction'

function AddEditResellerCustomers() {
  // ** Settings
  const theme = useTheme()

  // ** Translation
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  // ** router
  const router = useRouter()
  const { id, edit } = router.query

  // ** store
  const dispatch = useDispatch()
  const { getAllActivities } = useSelector(state => state.activity)
  const { loading, error, getCustomer } = useSelector(state => state.customers)

  const { citiesPending, statesPending, countriesPending, getAllCountriesList, getAllStatesList, getAllCitiesList } =
    useSelector(state => state.locations)

  const activitiesList = getAllActivities?.data?.map(country => {
    const firstLetter = country.name[0].toUpperCase()

    return {
      value: country.id,
      label: country.name,
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter
    }
  })

  const countriesList = getAllCountriesList?.data?.map(country => {
    const firstLetter = country.name[0].toUpperCase()

    return {
      value: country.id,
      label: country.name,
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter
    }
  })

  const statesList = getAllStatesList?.data?.map(state => {
    const firstLetter = state.name[0].toUpperCase()

    return {
      value: state.id,
      label: state.name,
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter
    }
  })

  const citiesList = getAllCitiesList?.data?.map(city => {
    const firstLetter = city.name[0].toUpperCase()

    return {
      value: city.id,
      label: city.name,
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter
    }
  })

  // ** Schema
  const schema = Yup.object().shape({
    company_name: Yup.string()
      .max(25, `${t('settings.customers.addEdit.company_nameMax25')}`)
      .when('plan', {
        is: 'company',
        then: Yup.string().required(`${t('settings.customers.addEdit.company_nameRequired')}`)
      }),
    subdomain: Yup.string().when('plan', {
      is: 'company',
      then: Yup.string()
        .test('alphabets', `${t('settings.customers.addEdit.subdomainAlphabets')}`, value => /^[A-Za-z]+$/.test(value))
        .required(`${t('settings.customers.addEdit.subdomainRequired')}`)
        .test('subdomain', `${t('settings.customers.addEdit.invalidSubdomain')}`, value => {
          if (!value) {
            return true
          }

          return validator.isAlpha(value)
        })
    }),
    name: Yup.string()
      .required(`${t('settings.customers.addEdit.nameRequired')}`)
      .max(25, `${t('settings.customers.addEdit.nameMax25')}`)
      .nullable(),
    address: Yup.string()
      .required(`${t('settings.customers.addEdit.addressRequired')}`)
      .max(50, `${t('settings.customers.addEdit.addressMax50')}`)
      .nullable(),
    mobile: Yup.string()
      .required(`${t('settings.customers.addEdit.mobileRequired')}`)
      .max(11, `${t('settings.customers.addEdit.mobileMax11')}`)
      .nullable(),
    email: Yup.string()
      .required(`${t('settings.customers.addEdit.emailRequired')}`)
      .email(`${t('auth.inValidEmail')}`)
      .nullable(),
    password: Yup.string()
      .test({
        name: 'requiredIfEdit',
        exclusive: true,
        message: `${t('settings.customers.addEdit.passwordRequired')}`,
        test: function (value) {
          return !edit ? !!value : true
        }
      })
      .test('', `${t('auth.signup.passwordTest')}`, value => {
        if (!value) {
          return true
        }

        return validator.isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minNumbers: 1,
          minUppercase: 1,
          minSymbols: 0
        })
      })
      .nullable(),
    password_confirmation: Yup.string()
      .nullable()
      .when('password', {
        is: password => !!password,
        then: Yup.string()
          .nullable()
          .required(`${t('settings.customers.addEdit.password_confirmationRequired')}`)
          .oneOf([Yup.ref('password'), null], `${t('settings.customers.addEdit.password_confirmationMatch')}`)
      }),
    plan: Yup.string()
      .required(`${t('settings.customers.addEdit.planRequired')}`)
      .oneOf(['company', 'individual'], t('settings.customers.addEdit.planEnum')),
    referral_code: Yup.string(),
    country_id: Yup.string(),
    state_id: Yup.string().when('country', {
      is: country_id => !!country_id,
      then: Yup.string().required(`${t('settings.customers.addEdit.stateRequired')}`)
    }),
    city_id: Yup.string()
      .when('country', {
        is: country_id => !!country_id,
        then: Yup.string().required(`${t('settings.customers.addEdit.city_idRequired')}`)
      })
      .when('state', {
        is: state_id => !!state_id,
        then: Yup.string().required(`${t('settings.customers.addEdit.city_idRequired')}`)
      }),
    manager_name: Yup.string()
      .required(`${t('settings.customers.addEdit.manager_nameRequired')}`)
      .max(50, `${t('settings.customers.addEdit.manager_nameMax50')}`),
    manager_email: Yup.string()
      .email(`${t('auth.inValidEmail')}`)
      .required(`${t('settings.customers.addEdit.manager_emailRequired')}`),
    manager_phone: Yup.string()
      .required(`${t('settings.customers.addEdit.manager_phoneRequired')}`)
      .max(11, `${t('settings.customers.addEdit.manager_phoneMax11')}`),
    cs_account_manager: Yup.string()
      .required(`${t('settings.customers.addEdit.cs_account_managerRequired')}`)
      .max(50, `${t('settings.customers.addEdit.cs_account_managerMax50')}`),
    cs_account_manager_email: Yup.string()
      .email(`${t('auth.inValidEmail')}`)
      .required(`${t('settings.customers.addEdit.cs_account_manager_emailRequired')}`),
    cs_account_manager_phone: Yup.string()
      .required(`${t('settings.customers.addEdit.cs_account_manager_phoneRequired')}`)
      .max(11, `${t('settings.customers.addEdit.cs_account_manager_phoneMax11')}`),
    identity_number: Yup.string()
      .required(`${t('settings.customers.addEdit.identity_numberRequired')}`)
      .max(20, `${t('settings.customers.addEdit.identity_numberMax20')}`),
    is_wasl: Yup.boolean(),
    tax_id: Yup.string(),
    technical_name: Yup.string()
      .required(`${t('settings.customers.addEdit.technical_nameRequired')}`)
      .max(20, `${t('settings.customers.addEdit.technical_nameMax20')}`),
    technical_email: Yup.string()
      .email(`${t('auth.inValidEmail')}`)
      .required(`${t('settings.customers.addEdit.technical_emailRequired')}`),
    technical_phone: Yup.string()
      .required(`${t('settings.customers.addEdit.technical_phoneRequired')}`)
      .max(11, `${t('settings.customers.addEdit.technical_phoneMax11')}`),
    website: Yup.string().matches(UrlPattern, t('errors.invalidWebsiteFormat')),
    commerical_record_no: Yup.string()
      .required(`${t('settings.customers.addEdit.commerical_record_noRequired')}`)
      .max(70, `${t('settings.customers.addEdit.commerical_record_noMax70')}`),
    // commercial_record_issue_date: Yup.string()
    //   .when('commerical_record_no', {
    //     is: commerical_record_no => !!commerical_record_no,
    //     then: Yup.string().required(`${t('settings.customers.addEdit.commercial_record_issue_dateRequired')}`)
    //   })
    //   .nullable(),
    dob: Yup.string().nullable(),
    is_mdvr: Yup.boolean(),
    activity_id: Yup.string().when('is_wasl', {
      is: true,
      then: Yup.string().required(t('settings.customers.addEdit.activity_idRequired'))
    }),
    register_type: Yup.string().when('is_wasl', {
      is: true,
      then: Yup.string().required(t('settings.customers.addEdit.register_typeRequired'))
    }),
    extension_no: Yup.string(),
    dob_format: Yup.string(),
    image: Yup.mixed().test('fileType', `${t('errors.in-valid-file')}`, value => {
      const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']

      return value && SUPPORTED_FORMATS.includes(value.type)
    })
  })

  const formik = useFormik({
    initialValues: {
      name: getCustomer?.data?.name || '',
      dob: getCustomer?.data?.dob || null,
      image: getCustomer?.data?.image || '',
      email: getCustomer?.data?.email || '',
      mobile: getCustomer?.data?.mobile || '',
      tax_id: getCustomer?.data?.tax_id || '',
      website: getCustomer?.data?.website || '',
      city_id: getCustomer?.data?.city_id || '',
      address: getCustomer?.data?.address || '',
      is_wasl: getCustomer?.data?.is_wasl || 0,
      plan: getCustomer?.data?.plan || 'company',
      password: getCustomer?.data?.password || '',
      is_mdvr: getCustomer?.data?.is_mdvr || false,
      subdomain: getCustomer?.data?.subdomain || '',
      state_id: parseInt(getCustomer?.data?.state_id) || '',
      country_id: getCustomer?.data?.country_id || '',
      dob_format: getCustomer?.data?.dob_format || '',
      activity_id: getCustomer?.data?.activity_id || '',
      manager_name: getCustomer?.data?.manager_name || '',
      company_name: getCustomer?.data?.company_name || '',
      extension_no: getCustomer?.data?.extension_no || '',
      referral_code: getCustomer?.data?.referral_code || '',
      manager_email: getCustomer?.data?.manager_email || '',
      manager_phone: getCustomer?.data?.manager_phone || '',
      register_type: getCustomer?.data?.register_type || '',
      technical_name: getCustomer?.data?.technical_name || '',
      identity_number: getCustomer?.data?.identity_number || '',
      technical_email: getCustomer?.data?.technical_email || '',
      technical_phone: getCustomer?.data?.technical_phone || '',
      cs_account_manager: getCustomer?.data?.cs_account_manager || '',
      commerical_record_no: getCustomer?.data?.commerical_record_no || '',
      password_confirmation: getCustomer?.data?.password_confirmation || '',
      cs_account_manager_email: getCustomer?.data?.cs_account_manager_email || '',
      cs_account_manager_phone: getCustomer?.data?.cs_account_manager_phone || ''
      // commercial_record_issue_date: getCustomer?.data?.commercial_record_issue_date || null
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const data = new FormData()
        data.append('name', values.name)
        data.append('plan', values.plan)
        data.append('image', values.image)
        data.append('email', values.email)
        data.append('mobile', values.mobile)
        data.append('tax_id', values.tax_id)
        data.append('is_wasl', values.is_wasl)
        data.append('address', values.address)
        data.append('is_mdvr', values.is_mdvr)
        data.append('city_id', values.city_id)
        data.append('website', values.website)
        data.append('password', values.password)
        data.append('subdomain', values.subdomain)
        data.append('dob_format', values.dob_format)
        data.append('country_id', values.country_id)
        data.append('state_id', `${values.state_id}`)
        data.append('activity_id', values.activity_id)
        data.append('manager_name', values.manager_name)
        data.append('company_name', values.company_name)
        data.append('extension_no', values.extension_no)
        data.append('referral_code', values.referral_code)
        data.append('manager_email', values.manager_email)
        data.append('manager_phone', values.manager_phone)
        data.append('register_type', values.register_type)
        data.append('technical_name', values.technical_name)
        data.append('identity_number', values.identity_number)
        data.append('technical_email', values.technical_email)
        data.append('technical_phone', values.technical_phone)
        data.append('cs_account_manager', values.cs_account_manager)
        data.append('commerical_record_no', values.commerical_record_no)
        data.append('dob', moment(values.dob).format('YYYY-MM-DD'))
        data.append('password_confirmation', values.password_confirmation)
        data.append('cs_account_manager_phone', values.cs_account_manager_phone)
        data.append('cs_account_manager_email', values.cs_account_manager_email)
        // data.append('commercial_record_issue_date', moment(values.commercial_record_issue_date).format('DD-MM-YYYY'))

        if (edit) {
          dispatch(updateCustomerAction({ id, data, callback: () => router.push('/reseller-settings/customers') }))
        } else {
          dispatch(registerCustomerAction({ data, callback: () => router.push('/reseller-settings/customers') }))
        }
      }
    }
  })

  useEffect(() => {
    if (id && edit) {
      dispatch(getCustomerByIdAction(id))
    }

    return () => {
      dispatch(resetUpdateCustomer())
      dispatch(resetGetCustomerById())
      dispatch(resetRegisterCustomer())
    }
  }, [id])

  useEffect(() => {
    dispatch(getAllCountriesAction({ page: 1, limit: 500 }))
    dispatch(getAllActivitiesAction({ page: 1, limit: 'all' }))
  }, [])

  useEffect(() => {
    if (formik.values.country_id) {
      dispatch(getAllStatesAction({ page: 1, limit: 250, countryId: formik.values.country_id }))
    }
  }, [formik.values.country_id])

  useEffect(() => {
    if (formik.values.state_id) {
      dispatch(getAllCitiesAction({ page: 1, limit: 250, stateId: formik.values.state_id }))
    }
  }, [formik.values.state_id])

  useEffect(() => {
    if (!!formik.values.company_name) {
      const { company_name } = formik.values
      const sanitizedCompanyName = company_name.replace(/[^a-zA-Z\s]/g, '')
      const subdomain = sanitizedCompanyName.replace(/\s/g, '')
      formik.setFieldValue('subdomain', subdomain)
    }
  }, [formik.values.company_name])

  return (
    <SettingsWrapper>
      <SettingsHeaderAddEdit
        isRTL={isRTL}
        back={t('back')}
        loading={loading}
        submit={() => formik.handleSubmit()}
        submitText={edit ? t('update') : t('save')}
        backAction={() => router.push('/reseller-settings/customers')}
        title={
          edit
            ? `${t('edit')} ${t('settings.customers.customers')}`
            : `${t('add')} ${t('settings.customers.customers')}`
        }
      />

      <form name='customers-form' onSubmit={formik.handleSubmit}>
        <Grid container sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6}>
            <Title>Account Details</Title>
            <Grid item xs={12} sm={10} md={8}>
              <FieldHorizontalFlex>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={formik.values.plan}
                      checked={formik.values.plan === 'company'}
                      onChange={() => formik.setFieldValue('plan', 'company')}
                      name='plan'
                      color='primary'
                    />
                  }
                  color={theme.palette.text.primary}
                  label={t('auth.signup.company')}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value={formik.values.plan}
                      checked={formik.values.plan === 'individual'}
                      onChange={() => formik.setFieldValue('plan', 'individual')}
                      name='plan'
                      color='primary'
                    />
                  }
                  color={theme.palette.text.primary}
                  label={t('auth.signup.individual')}
                />
              </FieldHorizontalFlex>
            </Grid>

            {formik.values.plan === 'company' && (
              <Grid item xs={12} sm={10} md={8}>
                <FormElement
                  type={'text'}
                  size={'small'}
                  required={true}
                  fullWidth={true}
                  maxCharacters={25}
                  variant={'outlined'}
                  inputName={'company-name'}
                  label={t('settings.customers.addEdit.company_name')}
                  {...formik.getFieldProps('company_name')}
                  placeholder={t('settings.customers.addEdit.company_namePlaceholder')}
                  helperText={
                    (formik.touched['company_name'] && formik.errors['company_name']) || error?.company_name?.[0]
                  }
                  error={
                    (formik.touched['company_name'] && Boolean(formik.errors['company_name'])) ||
                    Boolean(error?.company_name?.[0])
                  }
                />
              </Grid>
            )}

            {formik.values.plan === 'company' && (
              <Grid item xs={12} sm={10} md={8}>
                <FormElement
                  type={'text'}
                  size={'small'}
                  required={true}
                  fullWidth={true}
                  maxCharacters={25}
                  variant={'outlined'}
                  inputName={'subdomain-name'}
                  label={t('settings.customers.addEdit.subdomain')}
                  {...formik.getFieldProps('subdomain')}
                  placeholder={t('settings.customers.addEdit.subdomain_placeholder')}
                  helperText={(formik.touched['subdomain'] && formik.errors['subdomain']) || error?.subdomain?.[0]}
                  error={
                    (formik.touched['subdomain'] && Boolean(formik.errors['subdomain'])) ||
                    Boolean(error?.subdomain?.[0])
                  }
                />
              </Grid>
            )}

            <Grid item xs={12} sm={10} md={8}>
              <FormElement
                type={'text'}
                size={'small'}
                required={false}
                fullWidth={true}
                maxCharacters={25}
                variant={'outlined'}
                inputName={'referral_code'}
                {...formik.getFieldProps('referral_code')}
                label={t('settings.customers.addEdit.referral_code')}
                placeholder={t('settings.customers.addEdit.referral_code_placeholder')}
                helperText={
                  (formik.touched['referral_code'] && formik.errors['referral_code']) ||
                  Boolean(error?.referral_code?.[0])
                }
                error={
                  (formik.touched['referral_code'] && Boolean(formik.errors['referral_code'])) ||
                  Boolean(error?.referral_code?.[0])
                }
              />
            </Grid>

            <Grid item xs={12} sm={10} md={8}>
              <SelectElement
                type={'text'}
                size={'small'}
                required={false}
                loadingSize={20}
                fullWidth={true}
                data={countriesList}
                clearOnEscape={true}
                variant={'outlined'}
                loadingColor={'primary'}
                inputName={'country_id'}
                loading={countriesPending}
                disabled={countriesPending}
                backendError={error?.country_id?.[0]}
                formikValue={formik.values.country_id}
                formikError={formik.errors.country_id}
                formikTouched={formik.touched.country_id}
                label={`${t('settings.customers.addEdit.country_id')}`}
                placeholder={`${t('settings.customers.addEdit.country_id_placeholder')}`}
                onCloseClick={() => {
                  formik.setFieldValue('state_id', '')
                  formik.setFieldValue('city_id', '')
                  formik.setFieldValue('country_id', '')
                }}
                onChange={(e, selectedOption) => {
                  if (selectedOption?.value) {
                    formik.setFieldValue('state_id', '')
                    formik.setFieldValue('city_id', '')
                    formik.setFieldValue('country_id', selectedOption?.value)
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={10} md={8}>
              <SelectElement
                type={'text'}
                size={'small'}
                loadingSize={20}
                fullWidth={true}
                data={statesList}
                clearOnEscape={true}
                variant={'outlined'}
                loadingColor={'primary'}
                inputName={'state_id'}
                loading={statesPending}
                backendError={error?.state_id?.[0]}
                formikValue={formik.values.state_id}
                formikError={formik.errors.state_id}
                required={!!formik.values.country_id}
                formikTouched={formik.touched.state_id}
                label={`${t('settings.customers.addEdit.state_id')}`}
                disabled={statesPending || !formik.values.country_id}
                placeholder={`${t('settings.customers.addEdit.state_id_placeholder')}`}
                onCloseClick={() => {
                  formik.setFieldValue('state_id', '')
                  formik.setFieldValue('city_id', '')
                }}
                onChange={(e, selectedOption) => {
                  if (selectedOption?.value) {
                    formik.setFieldValue('state_id', selectedOption?.value)
                    formik.setFieldValue('city_id', '')
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={10} md={8}>
              <SelectElement
                type={'text'}
                size={'small'}
                loadingSize={20}
                fullWidth={true}
                data={citiesList}
                clearOnEscape={true}
                variant={'outlined'}
                inputName={'city_id'}
                loading={citiesPending}
                loadingColor={'primary'}
                backendError={error?.city_id?.[0]}
                formikValue={formik.values.city_id}
                formikError={formik.errors.city_id}
                formikTouched={formik.touched.city_id}
                disabled={citiesPending || !formik.values.state_id}
                label={`${t('settings.customers.addEdit.city_id')}`}
                required={!!formik.values.country_id || !!formik.values.state_id}
                placeholder={`${t('settings.customers.addEdit.city_id_placeholder')}`}
                onCloseClick={() => formik.setFieldValue('city_id', '')}
                onChange={(e, selectedOption) => {
                  if (selectedOption?.value) {
                    formik.setFieldValue('city_id', selectedOption?.value)
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={10} md={8}>
              <FormElement
                type={'text'}
                size={'small'}
                required={false}
                fullWidth={true}
                maxCharacters={25}
                variant={'outlined'}
                inputName={'tax_id'}
                {...formik.getFieldProps('tax_id')}
                label={t('settings.customers.addEdit.tax_id')}
                placeholder={t('settings.customers.addEdit.tax_id_placeholder')}
                helperText={(formik.touched['tax_id'] && formik.errors['tax_id']) || error?.tax_id?.[0]}
                error={(formik.touched['tax_id'] && Boolean(formik.errors['tax_id'])) || Boolean(error?.tax_id?.[0])}
              />
            </Grid>

            <Grid item xs={12} sm={10} md={8}>
              <FormElement
                type={'text'}
                size={'small'}
                required={false}
                fullWidth={true}
                maxCharacters={100}
                variant={'outlined'}
                inputName={'website'}
                {...formik.getFieldProps('website')}
                label={t('settings.customers.addEdit.website')}
                placeholder={t('settings.customers.addEdit.website_placeholder')}
                helperText={(formik.touched['website'] && formik.errors['website']) || error?.website}
                error={(formik.touched['website'] && Boolean(formik.errors['website'])) || Boolean(error?.website?.[0])}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Title>Contact Information</Title>
            <Grid item xs={12} sm={10} md={8}>
              <FormElement
                type={'text'}
                size={'small'}
                required={true}
                fullWidth={true}
                maxCharacters={50}
                variant={'outlined'}
                inputName={'manager_name'}
                {...formik.getFieldProps('manager_name')}
                label={t('settings.customers.addEdit.manager_name')}
                placeholder={t('settings.customers.addEdit.manager_name_placeholder')}
                helperText={
                  (formik.touched['manager_name'] && formik.errors['manager_name']) || error?.manager_name?.[0]
                }
                error={
                  (formik.touched['manager_name'] && Boolean(formik.errors['manager_name'])) ||
                  Boolean(error?.manager_name?.[0])
                }
              />
            </Grid>

            <Grid item xs={12} sm={10} md={8}>
              <FormElement
                type={'email'}
                size={'small'}
                required={true}
                fullWidth={true}
                variant={'outlined'}
                inputName={'manager_email'}
                {...formik.getFieldProps('manager_email')}
                label={t('settings.customers.addEdit.manager_email')}
                placeholder={t('settings.customers.addEdit.manager_email_placeholder')}
                helperText={
                  (formik.touched['manager_email'] && formik.errors['manager_email']) || error?.manager_email?.[0]
                }
                error={
                  (formik.touched['manager_email'] && Boolean(formik.errors['manager_email'])) ||
                  Boolean(error?.manager_email?.[0])
                }
              />
            </Grid>

            <Grid item xs={12} sm={10} md={8}>
              <FormElement
                type={'string'}
                size={'small'}
                required={true}
                fullWidth={true}
                maxCharacters={11}
                variant={'outlined'}
                inputName={'manager_phone'}
                {...formik.getFieldProps('manager_phone')}
                label={t('settings.customers.addEdit.manager_phone')}
                placeholder={t('settings.customers.addEdit.manager_phone_placeholder')}
                helperText={
                  (formik.touched['manager_phone'] && formik.errors['manager_phone']) || error?.manager_phone?.[0]
                }
                error={
                  (formik.touched['manager_phone'] && Boolean(formik.errors['manager_phone'])) ||
                  Boolean(error?.manager_phone?.[0])
                }
              />
            </Grid>

            <Grid item xs={12} sm={10} md={8}>
              <FormElement
                type={'text'}
                size={'small'}
                required={true}
                fullWidth={true}
                maxCharacters={50}
                variant={'outlined'}
                inputName={'cs_account_manager'}
                {...formik.getFieldProps('cs_account_manager')}
                label={t('settings.customers.addEdit.cs_account_manager')}
                placeholder={t('settings.customers.addEdit.cs_account_manager_placeholder')}
                helperText={
                  (formik.touched['cs_account_manager'] && formik.errors['cs_account_manager']) ||
                  error?.cs_account_manager?.[0]
                }
                error={
                  (formik.touched['cs_account_manager'] && Boolean(formik.errors['cs_account_manager'])) ||
                  Boolean(error?.cs_account_manager?.[0])
                }
              />
            </Grid>

            <Grid item xs={12} sm={10} md={8}>
              <FormElement
                type={'email'}
                size={'small'}
                required={true}
                fullWidth={true}
                variant={'outlined'}
                inputName={'cs_account_manager_email'}
                {...formik.getFieldProps('cs_account_manager_email')}
                label={t('settings.customers.addEdit.cs_account_manager_email')}
                placeholder={t('settings.customers.addEdit.cs_account_manager_email_placeholder')}
                helperText={
                  (formik.touched['cs_account_manager_email'] && formik.errors['cs_account_manager_email']) ||
                  error?.cs_account_manager_email?.[0]
                }
                error={
                  (formik.touched['cs_account_manager_email'] && Boolean(formik.errors['cs_account_manager_email'])) ||
                  Boolean(error?.cs_account_manager_email?.[0])
                }
              />
            </Grid>

            <Grid item xs={12} sm={10} md={8}>
              <FormElement
                type={'string'}
                size={'small'}
                required={true}
                fullWidth={true}
                maxCharacters={11}
                variant={'outlined'}
                inputName={'cs_account_manager_phone'}
                {...formik.getFieldProps('cs_account_manager_phone')}
                label={t('settings.customers.addEdit.cs_account_manager_phone')}
                placeholder={t('settings.customers.addEdit.cs_account_manager_phone_placeholder')}
                helperText={
                  (formik.touched['cs_account_manager_phone'] && formik.errors['cs_account_manager_phone']) ||
                  error?.cs_account_manager_phone?.[0]
                }
                error={
                  (formik.touched['cs_account_manager_phone'] && Boolean(formik.errors['cs_account_manager_phone'])) ||
                  Boolean(error?.cs_account_manager_phone?.[0])
                }
              />
            </Grid>

            <Grid item xs={12} sm={10} md={8}>
              <FormElement
                type={'text'}
                size={'small'}
                required={true}
                fullWidth={true}
                maxCharacters={20}
                variant={'outlined'}
                inputName={'technical_name'}
                {...formik.getFieldProps('technical_name')}
                label={t('settings.customers.addEdit.technical_name')}
                placeholder={t('settings.customers.addEdit.technical_name_placeholder')}
                helperText={
                  (formik.touched['technical_name'] && formik.errors['technical_name']) || error?.technical_name?.[0]
                }
                error={
                  (formik.touched['technical_name'] && Boolean(formik.errors['technical_name'])) ||
                  Boolean(error?.technical_name?.[0])
                }
              />
            </Grid>

            <Grid item xs={12} sm={10} md={8}>
              <FormElement
                type={'email'}
                size={'small'}
                required={true}
                fullWidth={true}
                variant={'outlined'}
                inputName={'technical_email'}
                {...formik.getFieldProps('technical_email')}
                label={t('settings.customers.addEdit.technical_email')}
                placeholder={t('settings.customers.addEdit.technical_email_placeholder')}
                helperText={
                  (formik.touched['technical_email'] && formik.errors['technical_email']) || error?.technical_email?.[0]
                }
                error={
                  (formik.touched['technical_email'] && Boolean(formik.errors['technical_email'])) ||
                  Boolean(error?.technical_email?.[0])
                }
              />
            </Grid>

            <Grid item xs={12} sm={10} md={8}>
              <FormElement
                type={'string'}
                size={'small'}
                required={true}
                fullWidth={true}
                maxCharacters={11}
                variant={'outlined'}
                inputName={'technical_phone'}
                {...formik.getFieldProps('technical_phone')}
                label={t('settings.customers.addEdit.technical_phone')}
                placeholder={t('settings.customers.addEdit.technical_phone_placeholder')}
                helperText={
                  (formik.touched['technical_phone'] && formik.errors['technical_phone']) || error?.technical_phone?.[0]
                }
                error={
                  (formik.touched['technical_phone'] && Boolean(formik.errors['technical_phone'])) ||
                  Boolean(error?.technical_phone?.[0])
                }
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Title>Account Settings</Title>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Grid item xs={12} sm={10} md={8}>
                  <FieldHorizontalFlex>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name='is_wasl'
                          color='primary'
                          value={formik.values.is_wasl}
                          checked={formik.values.is_wasl === 1}
                          onChange={() => formik.setFieldValue('is_wasl', formik.values.is_wasl === 1 ? 0 : 1)}
                        />
                      }
                      color={theme.palette.text.primary}
                      label={t('settings.customers.addEdit.is_wasl')}
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          color='primary'
                          name='is_mdvr'
                          value={formik.values.is_mdvr}
                          checked={formik.values.is_mdvr === 1}
                          onChange={() => formik.setFieldValue('is_mdvr', formik.values.is_mdvr === 1 ? 0 : 1)}
                        />
                      }
                      color={theme.palette.text.primary}
                      label={t('settings.customers.addEdit.is_mdvr')}
                    />
                  </FieldHorizontalFlex>
                </Grid>

                <Grid item xs={12} sm={10} md={8}>
                  <SelectElement
                    type={'text'}
                    size={'small'}
                    loadingSize={20}
                    fullWidth={true}
                    clearOnEscape={true}
                    variant={'outlined'}
                    data={activitiesList}
                    inputName={'activity_id'}
                    loadingColor={'primary'}
                    backendError={error?.activity_id?.[0]}
                    formikValue={formik.values.activity_id}
                    formikError={formik.errors.activity_id}
                    formikTouched={formik.touched.activity_id}
                    label={`${t('settings.customers.addEdit.activity_id')}`}
                    required={formik.values.is_wasl === 1 || !!formik.values.activity_id}
                    placeholder={`${t('settings.customers.addEdit.activity_id_placeholder')}`}
                    onCloseClick={() => formik.setFieldValue('activity_id', '')}
                    onChange={(e, selectedOption) => {
                      if (selectedOption?.value) {
                        formik.setFieldValue('activity_id', selectedOption?.value)
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={10} md={8}>
                  <FormElement
                    type={'text'}
                    size={'small'}
                    fullWidth={true}
                    maxCharacters={20}
                    variant={'outlined'}
                    inputName={'register_type'}
                    required={formik.values.is_wasl === 1}
                    {...formik.getFieldProps('register_type')}
                    label={t('settings.customers.addEdit.register_type')}
                    placeholder={t('settings.customers.addEdit.register_type_placeholder')}
                    helperText={
                      (formik.touched['register_type'] && formik.errors['register_type']) || error?.register_type?.[0]
                    }
                    error={
                      (formik.touched['register_type'] && Boolean(formik.errors['register_type'])) ||
                      Boolean(error?.register_type?.[0])
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={10} md={8}>
                  <FormElement
                    type={'text'}
                    size={'small'}
                    required={false}
                    fullWidth={true}
                    maxCharacters={20}
                    variant={'outlined'}
                    inputName={'extension_no'}
                    {...formik.getFieldProps('extension_no')}
                    label={t('settings.customers.addEdit.extension_no')}
                    placeholder={t('settings.customers.addEdit.extension_no_placeholder')}
                    helperText={
                      (formik.touched['extension_no'] && formik.errors['extension_no']) || error?.extension_no
                    }
                    error={
                      (formik.touched['extension_no'] && Boolean(formik.errors['extension_no'])) ||
                      error?.commerical_record_no
                    }
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid item xs={12} sm={10} md={8}>
                  <FormElement
                    type={'text'}
                    size={'small'}
                    required={true}
                    fullWidth={true}
                    maxCharacters={20}
                    variant={'outlined'}
                    inputName={'identity_number'}
                    {...formik.getFieldProps('identity_number')}
                    label={t('settings.customers.addEdit.identity_number')}
                    placeholder={t('settings.customers.addEdit.identity_number_placeholder')}
                    helperText={
                      (formik.touched['identity_number'] && formik.errors['identity_number']) ||
                      error?.identity_number?.[0]
                    }
                    error={
                      (formik.touched['identity_number'] && Boolean(formik.errors['identity_number'])) ||
                      Boolean(error?.identity_number?.[0])
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={10} md={8}>
                  <FormElement
                    type={'text'}
                    size={'small'}
                    required={false}
                    fullWidth={true}
                    maxCharacters={20}
                    variant={'outlined'}
                    inputName={'commerical_record_no'}
                    {...formik.getFieldProps('commerical_record_no')}
                    label={t('settings.customers.addEdit.commerical_record_no')}
                    placeholder={t('settings.customers.addEdit.commerical_record_no_placeholder')}
                    helperText={
                      (formik.touched['commerical_record_no'] && formik.errors['commerical_record_no']) ||
                      error?.commerical_record_no
                    }
                    error={
                      (formik.touched['commerical_record_no'] && Boolean(formik.errors['commerical_record_no'])) ||
                      error?.commerical_record_no
                    }
                  />
                </Grid>

                {/*<Grid item xs={12} sm={10} md={8}>*/}
                {/*  <DatePickerElement*/}
                {/*    fullWidth={true}*/}
                {/*    disableFuture={true}*/}
                {/*    format={'DD-MM-YYYY'}*/}
                {/*    inputName={'commercial_record_issue_date'}*/}
                {/*    backendError={error?.commercial_record_issue_date?.[0]}*/}
                {/*    formikValue={formik.values.commercial_record_issue_date}*/}
                {/*    formikError={formik.errors.commercial_record_issue_date}*/}
                {/*    formikTouched={formik.touched.commercial_record_issue_date}*/}
                {/*    label={`${t('settings.customers.addEdit.commercial_record_issue_date')}`}*/}
                {/*    onChange={newValue => formik.setFieldValue('commercial_record_issue_date', newValue)}*/}
                {/*  />*/}
                {/*</Grid>*/}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mb: 4 }}>
            <TextLabel>Logo</TextLabel>
            <FileUploaderWrapper>
              <FileUploaderRestrictions
                mb={10}
                formikValue={formik.values.image}
                formikError={formik.errors.image}
                desc={`${t('allowed.fileSize10MB')}`}
                allowed={`${t('allowed.image-type')}`}
                heading={`${t('allowed.uploadingHeader')}`}
                onChange={data => formik.setFieldValue('image', data)}
              />
            </FileUploaderWrapper>
          </Grid>

          <Grid item xs={12}>
            <Title>User Details</Title>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Grid item xs={12} sm={10} md={8}>
                  <FormElement
                    type={'text'}
                    size={'small'}
                    required={true}
                    fullWidth={true}
                    maxCharacters={25}
                    variant={'outlined'}
                    inputName={'customers-name'}
                    label={t('settings.customers.addEdit.name')}
                    {...formik.getFieldProps('name')}
                    placeholder={t('settings.customers.addEdit.namePlaceholder')}
                    helperText={(formik.touched['name'] && formik.errors['name']) || error?.name?.[0]}
                    error={(formik.touched['name'] && Boolean(formik.errors['name'])) || Boolean(error?.name?.[0])}
                  />
                </Grid>

                <Grid item xs={12} sm={10} md={8}>
                  <FormElement
                    type={'string'}
                    size={'small'}
                    required={true}
                    fullWidth={true}
                    maxCharacters={11}
                    variant={'outlined'}
                    inputName={'customers-mobile'}
                    {...formik.getFieldProps('mobile')}
                    label={t('settings.customers.addEdit.mobile')}
                    placeholder={t('settings.customers.addEdit.addressPlaceholder')}
                    helperText={(formik.touched['mobile'] && formik.errors['mobile']) || error?.mobile?.[0]}
                    error={
                      (formik.touched['mobile'] && Boolean(formik.errors['mobile'])) || Boolean(error?.mobile?.[0])
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={10} md={8}>
                  <FormElement
                    type={'text'}
                    size={'small'}
                    required={true}
                    fullWidth={true}
                    maxCharacters={50}
                    variant={'outlined'}
                    inputName={'customers-email'}
                    {...formik.getFieldProps('email')}
                    label={t('settings.customers.addEdit.email')}
                    placeholder={t('settings.customers.addEdit.emailPlaceholder')}
                    helperText={(formik.touched?.email && formik.errors?.email) || error?.email?.[0]}
                    error={(formik.touched?.email && Boolean(formik.errors?.email)) || Boolean(error?.email?.[0])}
                  />
                </Grid>

                <Grid item xs={12} sm={10} md={8}>
                  <DatePickerElement
                    fullWidth={true}
                    inputName={'dob'}
                    disableFuture={true}
                    format={'DD-MM-YYYY'}
                    backendError={error?.dob?.[0]}
                    formikValue={formik.values.dob}
                    formikError={formik.errors.dob}
                    formikTouched={formik.touched.dob}
                    label={`${t('settings.customers.addEdit.dob')}`}
                    onChange={newValue => formik.setFieldValue('dob', newValue)}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid item xs={12} sm={10} md={8}>
                  <FormElement
                    type={'text'}
                    size={'small'}
                    required={true}
                    fullWidth={true}
                    maxCharacters={50}
                    variant={'outlined'}
                    inputName={'customers-address'}
                    {...formik.getFieldProps('address')}
                    label={t('settings.customers.addEdit.address')}
                    placeholder={t('settings.customers.addEdit.addressPlaceholder')}
                    helperText={(formik.touched['address'] && formik.errors['address']) || error?.address?.[0]}
                    error={
                      (formik.touched['address'] && Boolean(formik.errors['address'])) || Boolean(error?.address?.[0])
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={10} md={8}>
                  <PasswordElement
                    size={'small'}
                    fullWidth={true}
                    variant={'outlined'}
                    required={!edit}
                    inputName={'customers-password'}
                    backendError={error?.password?.[0]}
                    formikError={formik.errors['password']}
                    formikTouched={formik.touched['password']}
                    label={t('settings.customers.addEdit.password')}
                    {...formik.getFieldProps('password')}
                    placeholder={t('settings.customers.addEdit.passwordPlaceholder')}
                    error={
                      (formik.touched['password'] && Boolean(formik.errors['password'])) ||
                      Boolean(error?.password?.[0])
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={10} md={8}>
                  <PasswordElement
                    size={'small'}
                    fullWidth={true}
                    variant={'outlined'}
                    required={!!formik.values.password}
                    backendError={error?.password_confirmation?.[0]}
                    inputName={'customers-password_confirmation'}
                    label={t('settings.customers.addEdit.password_confirmation')}
                    formikError={formik.errors['password_confirmation']}
                    formikTouched={formik.touched['password_confirmation']}
                    {...formik.getFieldProps('password_confirmation')}
                    placeholder={t('settings.customers.addEdit.password_confirmationPlaceholder')}
                    error={
                      (formik.touched['password_confirmation'] && Boolean(formik.errors['password_confirmation'])) ||
                      Boolean(error?.password_confirmation?.[0])
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </SettingsWrapper>
  )
}

export default AddEditResellerCustomers

AddEditResellerCustomers.acl = {
  action: 'manage',
  subject: 'manage-reseller-customers'
}
