import React from 'react'
import CreateAssignTrip from 'src/views/tracking/live-tracking/create-assign-trip'

// ** Third Party Imports
import * as Yup from 'yup'
import moment from 'moment'
import { useFormik } from 'formik'

function Trip() {


  return (
    <>
        <CreateAssignTrip  />
    </>
  )
}

Trip.acl = {
  action: 'manage',
  subject: 'manage-live-tracking-create-assign-trip'
}

Trip.AuthGuard = true

export default Trip
