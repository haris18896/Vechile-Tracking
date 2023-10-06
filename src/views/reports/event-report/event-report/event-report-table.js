import React, { useContext, useEffect, useState } from 'react'

// ** Styled Components
import { TableWrapper } from 'src/styles/pages/settings'

// ** Third Party Components
import { Icon } from '@iconify/react'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Spinner from 'src/@core/components/table-spinner'
import ReactPagination from 'src/components/pagination'
import { columns, rows } from './table.data'
import { SmallMapWrapper, useStyles } from 'src/styles/common'
import { TableUIContext } from 'src/contexts/TableContext'

// Redux Hooks and Actions
import { useDispatch, useSelector } from 'react-redux'

// ** Router
import { useRouter } from 'next/router'
import { getAllEventReportAction } from 'src/store/reports/event/eventAction'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'
import GoogleMapLoader from 'src/components/google-map/jsApiLoader'

function EventReportTable({ list }) {
  // ** Router
  const router = useRouter()

  // ** Dispatch
  const dispatch = useDispatch()

  // ** State For Showing Map and Getting Center
  const [showMap, setShowMap] = useState(false)
  const [center, setCenter] = useState({ lat: 31.455555, lng: 47.8888 })

  // ** Map Container
  const containerStyle = {
    width: '700px',
    height: '400px'
  }

  // ** Getting Table Height From the context
  const { tableHeight } = useContext(TableUIContext)
  const classes = useStyles({ tableHeight: tableHeight + 80 })

  // ** Destructuring Data From Fleet Slice
  const { page, limit, data, total, loading } = useSelector(state => state.eventReport?.getAllEventData)

  // ** Fetching Fleet Summary
  useEffect(() => {
    dispatch(getAllEventReportAction({ page: 1, limit: 'all' }))
  }, [router])

  // ** Handling Limit and Page
  const handleLimitChange = e => {
    if (limit !== e.target.value) dispatch(getAllEventReportAction({ page: page, limit: e.target.value }))
  }

  const handlePageChange = pg => {
    dispatch(getAllEventReportAction({ page: pg, limit: limit }))
  }

  return (
    <>
      <TableWrapper>
        <DataTable
          columns={columns({ setShowMap, setCenter })}
          data={data}
          pointerOnHover
          progressPending={loading}
          rowsPerPage={limit}
          className={classes.table}
          progressComponent={<Spinner />}
          sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
          fixedHeader
        />

        {data?.length !== 0 && (
          <ReactPagination
            total={data?.length}
            limit={limit}
            page={page}
            handleLimit={e => handleLimitChange(e)}
            handlePagination={(e, page) => handlePageChange(page)}
          />
        )}
      </TableWrapper>
      {/* Modal For Map Called Here To avoid Styles Confilcts in Columns Components */}
      <AddFormDialog
        id='geofence-modal'
        title='EventReport on Map'
        close={() => setShowMap(false)}
        open={showMap}
        bg='#fff'
        zIndex={99999}
      >
        <SmallMapWrapper>
          <GoogleMapLoader>
            {isLoaded => {
              isLoaded && (
                <GoogleMap mapContainerStyle={containerStyle} zoom={16} center={center}>
                  <Marker
                    position={center}
                    options={{
                      icon: {
                        url: '/images/vehicles/blue.png',
                        scaledSize: new window.google.maps.Size(40, 40)
                      }
                    }}
                  />
                </GoogleMap>
              )
            }}{' '}
          </GoogleMapLoader>
        </SmallMapWrapper>
      </AddFormDialog>
    </>
  )
}

export default EventReportTable
