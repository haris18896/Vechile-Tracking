import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

// ** Styled Components
import { TableWrapper } from 'src/styles/pages/settings'
import { SmallMapWrapper, useStyles } from 'src/styles/common'

// ** Third Party Components
import { Icon } from '@iconify/react'
import DataTable from 'react-data-table-component'

// ** Custom Components
import { columns, rows } from './table.data'
import Spinner from 'src/@core/components/spinner'

// ** pagination
import ReactPagination from 'src/components/pagination'

// ** Google Map API
import { GoogleMap, Marker } from '@react-google-maps/api'
import GoogleMapLoader from 'src/components/google-map/jsApiLoader'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'

// ** Utils
import { getNull } from 'src/utilities/utils'

// ** Context
import { TableUIContext } from 'src/contexts/TableContext'

function DetailedTrackingTable({ list, handleLimitChange, handlePageChange, formik }) {
  // ** Destructure Detail Tracking Infor From Redux State
  const { limit, total, page, loading, data } = list

  // ** State For Showing Map and Getting Center
  const [showMap, setShowMap] = useState(false)
  const [center, setCenter] = useState({ lat: 31.455555, lng: 47.8888 })

  // ** Map Container
  const containerStyle = {
    width: '700px',
    height: '400px'
  }

  // ** passing Header Height To Table Top from Context
  const { tableHeight } = useContext(TableUIContext)
  const classes = useStyles({ tableHeight: tableHeight })

  return (
    <>
      <TableWrapper>
        <DataTable
          data={getNull(formik.values?.asset_id) ? [] : data}
          pointerOnHover
          rowsPerPage={limit}
          progressPending={loading}
          progressComponent={<Spinner />}
          columns={columns({ setShowMap, setCenter, center })}
          sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
          showMap={showMap}
          setShowMap={setShowMap}
          className={classes.table}
        />
        {Object.keys(data).length === 0 ? null : (
          <ReactPagination
            total={total}
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
        title='Detailed Tracking on Map'
        close={() => setShowMap(false)}
        open={showMap}
        bg='#fff'
        zIndex={99999}
      >
        <SmallMapWrapper>
          <GoogleMapLoader>
            {isLoaded =>
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
            }
          </GoogleMapLoader>
        </SmallMapWrapper>
      </AddFormDialog>
    </>
  )
}

export default DetailedTrackingTable

DetailedTrackingTable.propTypes = {
  loading: PropTypes.bool,
  total: PropTypes.number,

  //   rows: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  handleLimitChange: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired
}
