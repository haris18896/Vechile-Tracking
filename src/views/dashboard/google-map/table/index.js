import React, { useEffect, useState } from 'react'

// ** MUI
import { Grid } from '@mui/material'

// ** Third Party Components
import { Icon } from '@iconify/react'
import DataTable from 'react-data-table-component'
import ReactPagination from 'src/components/pagination'

// ** Custom Components
import { columns } from './table.data'
import { GoogleAnalyticsWrapper, GoogleWrapper, useStyles } from 'src/styles/pages/dashboard'
import Spinner from 'src/@core/components/spinner'
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import TableHeader from '../../header'

// ** Third Party Imports
import { useFormik } from 'formik'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getAssetInfoAction } from 'src/store/dashboard/assets/assetsInfoActions'
import { useRouter } from 'next/router'
import {
  getAllAssetListAction,
  handleLimitAssetListAction,
  handlePageAssetListAction
} from 'src/store/tracking/index/trackingAction'

function DashboardTable() {
  const classes = useStyles()

  // ** Dispatch
  const dispatch = useDispatch()

  // ** Router
  const router = useRouter()

  // ** states
  const [selectedRows, setSelectedRows] = useState([])

  // Selector for Asset List and
  const { loading } = useSelector(state => state.tracking)
  const { data, limit, page, total } = useSelector(state => state.tracking?.getAllAssetList)

  useEffect(() => {
    dispatch(getAllAssetListAction({ page: page, limit: limit }))
  }, [page, limit, router])

  // ** Handling LImit and Pages Value
  const handleLimitChange = e => {
    dispatch(handleLimitAssetListAction({ newLimit: e.target.value, oldLimit: limit }))
  }

  const handlePageChange = pg => {
    dispatch(handlePageAssetListAction({ page: pg, limit }))
  }

  // ** Formik for vehicle in header
  const formik = useFormik({
    initialValues: {
      name: ''
    },
    enableReinitialize: true,
    onSubmit: values => {
      const name = values.name
      dispatch(getAllAssetListAction({ page, limit, name }))
    }
  })

  // ** CallBack Function to call api on no value
  const callbackHeader = () => {
    dispatch(getAllAssetListAction({ page, limit }))
  }

  const handleSelectedRowsChange = state => {
    setSelectedRows(state.selectedRows)
    const asset_ids = []
    state.selectedRows.map(row => {
      asset_ids.push(row.id)
    })
    dispatch(getAssetInfoAction({ page: 1, limit: 'all', asset_ids }))
  }

  useEffect(() => {
    const asset_ids = []
    selectedRows.map(row => {
      asset_ids.push(row.id)
    })

    let interval = setInterval(() => {
      if (selectedRows.length != 0) {
        dispatch(getAssetInfoAction({ page: 1, limit: 'all', asset_ids }))
      }
    }, 30000)

    return () => window.clearInterval(interval)
  }, [selectedRows, router])

  return (
    <>
      <GoogleWrapper sx={{ height: '100%', overflowY: 'auto' }}>
        <Grid container sx={{ paddingTop: '75px', height: '100%' }}>
          <Grid item xs={12} md={12} sx={{ position: 'relative', padding: { xs: '0 0.5rem', sm: '0 1rem' } }}>
            <TableHeader formik={formik} callback={callbackHeader} />
          </Grid>

          <Grid item xs={12} sx={{ height: '60vh', overflowY: 'auto', padding: { xs: '0 0.5rem', sm: '0 1rem' } }}>
            <GoogleAnalyticsWrapper sx={{ position: 'relative', padding: '0', height: '100%' }}>
              <DataTable
                progressPending={loading}
                progressComponent={<Spinner />}
                data={data}
                pointerOnHover
                rowsPerPage={limit}
                columns={columns()}
                className={classes.table}
                sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
                selectableRows
                onSelectedRowsChange={handleSelectedRowsChange}
                selectableRowsHighlight
                fixedHeader
              />
            </GoogleAnalyticsWrapper>
          </Grid>

          <Grid item my={3} sx={{ width: '100%', textAlign: 'right', padding: { xs: '0 0.5rem', sm: '0 1rem' } }}>
            <ButtonIcon
              onCLick={() => dispatch(getAllAssetListAction({ page: page, limit: limit }))}
              sx={{
                width: 120,
                '&.MuiButtonBase-root:hover': {
                  background: '#29ad71',
                  borderColor: '#29ad71',
                  color: 'white'
                }
              }}
              startIcon={'tabler:refresh'}
              color='success'
            >
              Refresh
            </ButtonIcon>
          </Grid>

          <Grid
            className='pagination'
            sx={{ '& .pagination': { position: 'static', margin: 0 }, display: 'flex', width: '100%' }}
          >
            <ReactPagination
              total={total}
              limit={limit}
              page={page}
              handleLimit={e => handleLimitChange(e)}
              handlePagination={(e, page) => handlePageChange(page)}
            />
          </Grid>
        </Grid>
      </GoogleWrapper>
    </>
  )
}

export default DashboardTable
