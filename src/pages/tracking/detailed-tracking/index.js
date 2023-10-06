import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** Formik and Yup
import { useFormik } from 'formik'
import * as Yup from 'yup'

// ** Custom Components
import DetailedTrackingHeader from 'src/views/tracking/detailed-tracking/detailed-tracking-header'
import DetailedTrackingTable from 'src/views/tracking/detailed-tracking/detailed-tracking-table'

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllDetailedTrackingActions,
  handleLimitDetailTrackingAction,
  handlePageDetailTrackingAction
} from 'src/store/tracking/index/trackingAction'
import { resetDetailedTracking } from 'src/store/tracking/index/trackingSlice'

// ** Utils
import { getNull } from 'src/utilities/utils'
import { useTranslation } from 'react-i18next'

function DetailedTracking() {
  // ** router
  const router = useRouter()

  // ** Dispatch
  const dispatch = useDispatch()

  // ** Translation constants
  const { t } = useTranslation()

  const ability = useContext(AbilityContext)

  // ** Selector
  const { getDetailedTracking } = useSelector(state => state.tracking)
  const { limit, page } = getDetailedTracking

  // ** Formik Values For Filter In the Header
  const schema = Yup.object().shape({
    asset_id: Yup.string().required(`${t('tracking.detailedTracking.vehicleError')}`)
  })

  const formik = useFormik({
    initialValues: {
      asset_id: '',
      driver_id: '',
      imei: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: () => {
      dispatch(
        getAllDetailedTrackingActions({
          page: page,
          limit: limit,
          asset_id: formik?.values.asset_id,
          driver_id: formik?.values.driver_id,
          imei: formik?.values.imei
        })
      )
    }
  })

  // ** Fetching the Detailed Tracking List
  useEffect(() => {
    if (!getNull(formik?.values.asset_id)) {
      dispatch(
        getAllDetailedTrackingActions({
          page: page,
          limit: limit,
          asset_id: formik?.values.asset_id,
          driver_id: formik?.values.driver_id,
          imei: formik?.values.imei
        })
      )
    }
    if (getNull(formik?.values.asset_id)) dispatch(resetDetailedTracking())
  }, [router, page, limit, formik?.values.asset_id])

  // ** Function To Handle Limit
  const handleLimitChange = e => {
    dispatch(handleLimitDetailTrackingAction({ newLimit: e.target.value, oldLimit: limit }))
  }

  // ** Function To Handle Pages
  const handlePageChange = pg => {
    dispatch(handlePageDetailTrackingAction({ page: pg, limit }))
  }

  return (
    <>
      <DetailedTrackingHeader formik={formik} router={router} ability={ability} list={getDetailedTracking} />
      <DetailedTrackingTable
        loading={false}
        formik={formik}
        list={getDetailedTracking}
        handleLimitChange={handleLimitChange}
        handlePageChange={handlePageChange}
      />
    </>
  )
}

export default DetailedTracking

DetailedTracking.acl = {
  action: 'manage',
  subject: 'manage-detailed-tracking'
}

DetailedTracking.AuthGuard = true
