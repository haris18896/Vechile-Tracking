/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

// ** Components
import AssetsHeader from 'src/views/catalogs/assets/assets-header'
import AssetsTable from 'src/views/catalogs/assets/assets-table'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { resetAssets } from 'src/store/catalogs/assets/assetsSlice'
import { getAllCustomersAction } from 'src/store/settings/customers/customersActions'
import {
  getAllAssetAction,
  getAllWASLAssetAction,
  handleLimitAction,
  handlePageAction,
  handleWASLLimitAction,
  handleWASLPageAction
} from 'src/store/catalogs/assets/assetsActions'
import { getAllDevicesAction } from 'src/store/catalogs/devices/devicesAction'
import { getAllCountriesAction, getAllCitiesAction } from 'src/store/locations/locationsAction'

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'

import WaslAssetsHeader from 'src/views/catalogs/assets/wasl-assets/wasl-assets-header'
import WaslAssetsTable from 'src/views/catalogs/assets/wasl-assets/wasl-assets-table'

import { Catalog } from 'src/styles/pages/catalogs'
import { getAllPlateTypeAction } from 'src/store/catalogs/plate-type/plateTypeActions'

const Assets = () => {
  const ability = useContext(AbilityContext)

  const [open, setOpen] = useState(false)

  const router = useRouter()
  const dispatch = useDispatch()

  // ** Store
  const { loading, getAllAssetList, getAllWASLAssetList } = useSelector(state => state.assets)
  const customers = useSelector(state => state.customers?.getAllCustomersList?.data)
  const { getAllCustomersList } = useSelector(state => state.customers)

  const countries = useSelector(state => state.locations?.getAllCountriesList?.data)

  // ** States
  const [slug, setSlug] = useState('')
  const [wasl, setWasl] = useState(false)
  const [customerId, setCustomerId] = useState('')

  const [isWaslUpdate, setIsWaslUpdate] = useState(false)
  const [updateData, setUpdateData] = useState({})

  const rows = wasl ? getAllWASLAssetList?.data : getAllAssetList?.data
  const limit = wasl ? getAllWASLAssetList?.limit : getAllAssetList?.limit
  const page = wasl ? getAllWASLAssetList?.page : getAllAssetList?.page
  const total = wasl ? getAllWASLAssetList?.total : getAllAssetList?.total
  const customersList = getAllCustomersList?.data

  // State
  const [inputValues, setInputValues] = useState({
    brand: '',
    imei: '',
    search_so: '',
    asset_name: ''
  })

  const onChangeHandler = (name, value) => {
    setInputValues({ ...inputValues, [name]: value })
  }

  // ** Fetching Assets List
  useEffect(() => {
    dispatch(getAllAssetAction({ page, limit }))
  }, [page, limit, router])

  useEffect(() => {
    // ** Asset info fetch
    dispatch(
      getAllAssetAction({
        page: '1',
        limit: 'all'
      })
    )

    dispatch(getAllWASLAssetAction({ page: 1, limit: 10 }))

    dispatch(getAllPlateTypeAction({}))
  }, [])

  // ** Fetching Devices Action
  useEffect(() => {
    dispatch(getAllDevicesAction({ page: 1, limit: 'all' }))
  }, [router])

  // ** Fetching Countries
  useEffect(() => {
    dispatch(getAllCountriesAction({ page: 1, limit: 100 }))
    dispatch(getAllCitiesAction({ page: 1, limit: 10, stateId: 1 }))
  }, [router])

  // ** Limit and Page action
  const handleLimitChange = e => {
    wasl
      ? dispatch(handleWASLLimitAction({ newLimit: e.target.value, oldLimit: limit }))
      : dispatch(handleLimitAction({ newLimit: e.target.value, oldLimit: limit }))
  }

  const handlePageChange = pg => {
    wasl
      ? dispatch(handleWASLPageAction({ newLimit: e.target.value, oldLimit: limit }))
      : dispatch(handlePageAction({ page: pg, limit }))
  }

  // ** Handle Modal
  const handleOpen = () => {
    setOpen(true)
    setIsWaslUpdate(false)
    setUpdateData({})
    dispatch(getAllCustomersAction({ page: 1, limit: 100 }))
  }

  const handleClose = () => {
    setOpen(false)
    setIsWaslUpdate(false)
    setUpdateData({})
  }

  useEffect(() => {
    return () => {
      dispatch(resetAssets())
    }
  }, [])

  const redirectWasl = value => {
    setWasl(value)
  }

  return (
    <>
      {!wasl ? (
        <Catalog>
          <AssetsHeader
            router={router}
            ability={ability}
            customers={customers}
            onChangeHandler={onChangeHandler}
            redirectWasl={redirectWasl}
            countries={countries}
            inputValues={inputValues}
          />

          <AssetsTable
            rows={rows}
            page={page}
            limit={limit}
            total={total}
            router={router}
            ability={ability}
            loading={loading}
            handleLimitChange={handleLimitChange}
            handlePageChange={handlePageChange}
          />
        </Catalog>
      ) : (
        <Catalog>
          <WaslAssetsHeader
            open={open}
            slug={slug}
            ability={ability}
            handleOpen={handleOpen}
            handleClose={handleClose}
            customerId={customerId}
            customersList={customersList}
            onChangeHandler={onChangeHandler}
            redirectWasl={redirectWasl}
            isUpdate={isWaslUpdate}
            updateData={updateData}
          />
          <WaslAssetsTable
            rows={rows}
            page={page}
            limit={limit}
            total={total}
            ability={ability}
            loading={loading}
            handleLimitChange={handleLimitChange}
            handlePageChange={handlePageChange}
            updateWaslAsset={res => {
              setOpen(true)
              setIsWaslUpdate(true)
              setUpdateData(res)
            }}
          />
        </Catalog>
      )}
    </>
  )
}

Assets.acl = {
  action: 'manage',
  subject: 'manage-asset'
}

Assets.AuthGuard = true

export default Assets
