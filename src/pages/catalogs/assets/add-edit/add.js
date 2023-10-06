/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** utils
import { isObjEmpty } from 'src/configs/utils'

// ** Third Party Imports
import * as Yup from 'yup'
import moment from 'moment'
import { useFormik } from 'formik'

// ** Components
import AddEditAssetHeader from 'src/views/catalogs/assets/edit/add-edit-asset-header'
import AddEditAssetForm from 'src/views/catalogs/assets/edit/add-edit-asset-form'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { resetAssets, resetGetAsset } from 'src/store/catalogs/assets/assetsSlice'
import { registerAssetAction } from 'src/store/catalogs/assets/assetsActions'
import { Catalog } from 'src/styles/pages/catalogs'

function AddEditAsset() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.assets)
  const customers = useSelector(state => state.customers?.getAllCustomersList?.data)

  // ** States
  const [slug, setSlug] = useState(null)
  const [inputValue, setInputValue] = useState('')

  const onChangeHandler = e => {
    const { name, value } = e.target

    if (name === 'customer_type') setSlug(value)
    if (name === 'inputValue') setInputValue(value)
    if (e.keyCode == 32) {
      return
    } else {
      formik.setFieldValue(name, value)
    }
  }

  const schema = Yup.object().shape({
    plate_registration_no: Yup.string().required('Plate Registration Number is required'),
    name: Yup.string().required('Name is required'),
    brand: Yup.string().required('Brand is required'),
    model: Yup.number().required('Model is required'),
    year: Yup.number().required('Year is required'),
    color: Yup.string().required('Color is required'),
    plate_no: Yup.string().required('Plate No. is required'),
    so: Yup.string().required('so is required'),
    installer_id: Yup.string().required('Installer is required'),
    image: Yup.mixed().test('fileType', 'image format is invalid', value => {
      const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', '']

      return value && SUPPORTED_FORMATS.includes(value.type)
    }),
    campus_id: Yup.string().required('Campus is required'),
    device_id: Yup.string().required('Device is required'),
    driver_id: Yup.string().required('Driver is required'),
    idle_limit: Yup.number('Idle Limit should be a number').required('Idle limit is required'),
    sequence_number: Yup.string().required('Sequence Number is required'),
    installation_date: Yup.string().required('Installation date is required'),
    insurance_number: Yup.string().required('Insurance Number is required'),
    imei_number: Yup.string().required('Imei Number is required')
  })

  const formik = useFormik({
    initialValues: {
      device_id: '',
      asset_type_id: '',
      vin: '',
      year: '',
      name: '',
      brand: '',
      model: '',
      color: '',
      registration_expiry_date: '',
      plate_no: '',
      registration_no: '',
      insurance_number: '',
      driver_id: '',
      payment_type_id: '',
      so: '',
      installer_id: '',
      installation_type_id: '',
      communication_id: '',
      plate_type_id: '',
      sim_id: '',
      is_wasl: 0,
      military_pass_number: '',
      image: '',
      imei_number: '',
      campus_id: '',
      idle_limit: '',
      sequence_number: '',
      latitude: '',
      insurance_number: '',
      plate_registration_no: '',
      installation_date: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = new FormData()
        data.append('installation_date', moment(values.installation_date).format('YYYY-MM-DD'))
        data.append('driver_id', values.driver_id)
        data.append('payment_type_id', values.payment_type_id)
        data.append('so', values.so)
        data.append('installer_id', values.installer_id)
        data.append('installation_type_id', values.installation_type_id)
        data.append('communication_id', values.communication_id)
        data.append('plate_type_id', values.plate_type_id)
        data.append('sim_id', values.sim_id)
        data.append('is_wasl', values.is_wasl)
        data.append('military_pass_number', values.military_pass_number)
        data.append('image', values.image)
        data.append('imei_number', values.imei_number)
        data.append('campus_id', values.campus_id)
        data.append('idle_limit', values.idle_limit)
        data.append('sequence_number', values.sequence_number)
        data.append('latitude', values.latitude)
        data.append('insurance_number', values.insurance_number)
        data.append('plate_registration_no', values.plate_registration_no)
        data.append('name', values.name)
        data.append('year', values.year)
        data.append('model', values.model)
        data.append('brand', values.brand)
        data.append('color', values.color)
        data.append('plate_no', values.plate_no)
        data.append('device_id', values.device_id)
        data.append('asset_type_id', values.asset_type_id)
        data.append('registration_no', values.registration_no)
        data.append('insurance_number', values.insurance_number)
        data.append('registration_expiry_date', moment(values.registration_expiry_date).format('YYYY-MM-DD'))
        console.log('values to be submitted : ', values)

        dispatch(
          registerAssetAction({
            data,
            callBack: () => {
              router.back()
              resetForm()
            }
          })
        )
      }
    }
  })

  console.log(formik.values, 'errors')

  useEffect(() => {
    return () => {
      dispatch(resetAssets())
      dispatch(resetGetAsset())
    }
  }, [])

  return (
    <Catalog>
      <AddEditAssetHeader loading={loading} router={router} submitHandler={() => formik.handleSubmit()} />

      <AddEditAssetForm
        slug={slug}
        formik={formik}
        router={router}
        location={location}
        customers={customers}
        inputValue={inputValue}
        onChangeHandler={onChangeHandler}
      />
    </Catalog>
  )
}

AddEditAsset.acl = {
  action: 'manage',
  subject: 'manage-asset'
}

AddEditAsset.AuthGuard = true

export default AddEditAsset
