import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'

// ** Components
import FuelCalibrationTable from 'src/views/catalogs/fuel-calibration/fuel-table'
import FuelCalibrationHeader from 'src/views/catalogs/fuel-calibration/fuel-header'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { Catalog } from 'src/styles/pages/catalogs'

function FuelCalibration() {
  const router = useRouter()
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()

  // const { loading } = useSelector(state => state)

  // // ** List
  // useEffect(() => {

  // }, [])

  const handleLimitChange = e => {
    // dispatch(handleLimitAction({ newLimit: e.target.value, oldLimit: limit }))
  }

  const handlePageChange = pg => {
    // dispatch(handlePageAction({ page: pg, limit }))
  }

  return (
    <Catalog>
      <FuelCalibrationHeader ability={ability} router={router} />

      <FuelCalibrationTable
        rows={[]}
        page={1}
        limit={10}
        total={10}
        router={router}
        ability={ability}
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
      />
    </Catalog>
  )
}

FuelCalibration.acl = {
  action: 'manage',
  subject: 'manage-fuel-calibration'
}

FuelCalibration.AuthGuard = true

export default FuelCalibration
