import React, { useContext, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

// ** MUI
import Grid from '@mui/material/Grid'
import { Box, CircularProgress, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'

// ** Styles
import { useCustomStyles } from 'src/styles/pages/reports'
import { Bullet, ContentContainer } from 'src/styles/pages/graphs'
import { TextInput } from 'src/styles/components/input'
import { SettingsWrapper } from 'src/styles/pages/settings'

// ** utils
import { Icon } from '@iconify/react'

// ** Contexts
import { TableUIContext } from 'src/contexts/TableContext'

// ** Formik
import { useFormik } from 'formik'

function LiveTrackingHeader({ callback, count }) {
  // ** Styles
  const styles = useCustomStyles()

  // ** Getting Table Context and Passing Header Refrence
  const headerRef = useRef()
  const { getTableHeight } = useContext(TableUIContext)
  getTableHeight(headerRef)

  // Destructure Data and loading etc from Count/ GetStausCounts
  const { data, loading } = count

  // Stats Bullets
  const stats = [
    {
      type: 'Running',
      color: '#2FC17E',
      icon: 'carbon:dot-mark',
      text: '5',
      textColor: '#2EC17E',
      outerColor: '#2FC17E1A',
      count: data.moving
    },
    {
      type: 'Stopped',
      color: '#FC3B61',
      icon: 'carbon:dot-mark',
      text: '2',
      textColor: '#E53E3E',
      outerColor: '#FC3B611A',
      count: data['powered off']
    },
    {
      type: 'Idle',
      color: '#FFC400',
      icon: 'carbon:dot-mark',
      text: '3',
      textColor: '#ECC94B',
      outerColor: '#FFC4001A',
      count: data.idling
    },
    {
      type: 'Ignition off',
      color: '#FF8B00',
      icon: 'carbon:dot-mark',
      text: '1',
      textColor: '#FF8B00',
      outerColor: '#FF8B001A',
      count: data['ignition off']
    },
    {
      type: 'No Data',
      color: '#C0C5D0',
      icon: 'carbon:dot-mark',
      text: '0',
      textColor: '#C0C5D0',
      outerColor: '#C0C5D01A',
      count: data['no data available']
    },
    {
      type: 'All Status',
      color: '#0F224B',
      icon: 'carbon:dot-mark',
      text: '12',
      textColor: '#0F224B',
      outerColor: '#0F224B1A',
      count: data.all
    }
  ]

  // Formik to handle Name in filter
  const formik = useFormik({
    initialValues: {
      name: ''
    },
    enableReinitialize: true
  })

  const onChangeHandler = e => {
    callback(formik.values?.name)
    formik.handleChange(e)
  }

  // ** Fetching the Asset List Action on Name
  useEffect(() => {
    callback(formik.values?.name)
  }, [formik.values?.name])

  return (
    <SettingsWrapper bordered ref={headerRef}>
      <Box sx={{ flexGrow: 1 }} mt='64px'>
        <Grid container justifyContent='space-between' spacing={2} alignItems='start'>
          <Grid item xs={12} sm={8} md={6} container spacing={4}>
            <Grid item xs={7} sm={8} md={8}>
              <TextInput
                fullWidth
                id='name'
                name='name'
                placeholder='Search by Vehicle Name'
                variant='outlined'
                value={formik?.values?.name}
                onChange={formik.handleChange}
                className={styles.TextField}
                InputProps={{
                  endAdornment: <Icon icon='bx:bx-search' width='20' height='20' />
                }}
              />
            </Grid>

            {/* <Grid item xs={5} sm={4} md={4}>
              <Button
                onClick={() => formik.handleSubmit()}
                style={{ backgroundColor: '#0F224B', borderRadius: '50px', color: 'white', height: '38px' }}
                startIcon={<SearchIcon />}
              >
                Search
              </Button>
            </Grid> */}
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: { xs: 'start', md: 'start' },
              gap: { xs: '10px', md: '8%' }
            }}
          >
            {stats.map((item, index) => (
              <Grid item xs={1} sm={1} md={1} display='flex' key={index}>
                <ContentContainer align='center' flexDirection='column'>
                  {index < stats.length - 1 && (
                    <Bullet outer={item.outerColor} dot={item.color} sx={{ marginRight: '0rem !important' }} />
                  )}
                  {index === stats.length - 1 && (
                    <Box
                      sx={{
                        background: item.color,
                        padding: '0.2rem 0.8rem',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        color: '#fff'
                      }}
                    >
                      All
                    </Box>
                  )}

                  <Typography sx={{ fontSize: '0.8rem' }} mt={2}>
                    {loading ? <CircularProgress color='primary' size={18} /> : item.count}
                  </Typography>
                </ContentContainer>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </SettingsWrapper>
  )
}

export default LiveTrackingHeader

LiveTrackingHeader.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
