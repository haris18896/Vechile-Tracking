import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'

// ** Third Party Imports
import * as Yup from 'yup'
import moment from 'moment'
import { useFormik } from 'formik'
import DatePicker from 'react-datepicker'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'

// ** Styles
import { SettingsWrapper, Title } from 'src/styles/pages/settings'
import { FieldHorizontalWrapper } from 'src/styles/components/input'
import { Box } from '@mui/material'

function TestBenchHeader({ slug, submitHandler, tabValue, tabs, changeTab, formik }) {
  console.log('formik values : ', formik)

  return (
    <SettingsWrapper>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={10}>
            <TabContext value={tabValue}>
              <TabList
                onChange={changeTab}
                aria-label='modules'
                variant='scrollable'
                scrollButtons={false}
                sx={{
                  '& .MuiTab-root': {
                    textTransform: 'capitalize',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'text.secondary',
                    '&.Mui-selected': {
                      color: '#00ABBE',
                      borderBottom: '3px solid #00ABBE'
                    }
                  }
                }}
              >
                {tabs?.map(tab => (
                  <Tab key={tab.id} label={tab.label} value={tab.id} />
                ))}
              </TabList>
            </TabContext>
          </Grid>

          <Grid
            item
            xs={12}
            md={2}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
          >
            <FieldHorizontalWrapper>
              <ButtonIcon color='success' startIcon={'material-symbols:check-small-rounded'} onClick={submitHandler}>
                Submit
              </ButtonIcon>
            </FieldHorizontalWrapper>
          </Grid>
        </Grid>
      </Box>
    </SettingsWrapper>
  )
}

export default TestBenchHeader

TestBenchHeader.propTypes = {
  slug: PropTypes.string,
  tabs: PropTypes.array,
  submitHandler: PropTypes.func,
  tabValue: PropTypes.string
}
