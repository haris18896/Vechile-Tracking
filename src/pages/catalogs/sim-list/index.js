import React, { useState, useContext, useEffect } from 'react'

// ** Components
import SimListingHeader from 'src/views/catalogs/sim-listing/sim-listing-header'
import SimListingTable from 'src/views/catalogs/sim-listing/sim-listing-table'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'
import {
  getAllSimListingAction,
  handleLimitAction,
  handlePageAction
} from 'src/store/catalogs/sim-listing/simListingAction'

function SimListing() {
  const ability = useContext(AbilityContext)

  const dispatch = useDispatch()
  const [asset, setAsset] = useState('')
  const [sim, setSim] = useState('')

  const onChangeHandler = (name, value) => {
    if (name === 'asset') setAsset(value)
    if (name === 'sim') setSim(value)
  }

  const { getAllSimListingList, loading } = useSelector(state => state.simListing)
  // const { loading } = useSelector(state => state)
  const rows = getAllSimListingList?.data
  const limit = getAllSimListingList?.limit
  const page = getAllSimListingList?.page
  const total = getAllSimListingList?.total

  // ** List
  useEffect(() => {
    dispatch(getAllSimListingAction({ page, limit }))
  }, [])
  console.log(getAllSimListingList, 'sim')

  const handleLimitChange = e => {
    dispatch(handleLimitAction({ newLimit: e.target.value, oldLimit: limit }))
  }

  const handlePageChange = pg => {
    dispatch(handlePageAction({ page: pg, limit }))
  }

  return (
    <>
      <SimListingHeader ability={ability} asset={asset} sim={sim} onChangeHandler={onChangeHandler} />

      <SimListingTable
        loading={loading}
        ability={ability}
        rows={rows}
        limit={limit}
        page={page}
        total={total}
        handleLimitChange={e => handleLimitChange(e)}
        handlePageChange={(e, page) => handlePageChange(page)}
      />
    </>
  )
}

SimListing.acl = {
  action: 'manage',
  subject: 'manage-sim-list'
}

export default SimListing
