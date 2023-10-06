import React from 'react'
import PropTypes from 'prop-types'

// ** MUI
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'

// ** Styles
import { SettingsWrapper } from 'src/styles/pages/settings'
import { FieldHorizontalWrapper } from 'src/styles/components/input'

function EditEmailTemplateHeader({ submitHandler, tabValue, tabs, changeTab, router }) {
  return (
    <SettingsWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={10}>
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
          lg={1}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <ButtonIcon
            color='grey'
            startIcon={'material-symbols:chevron-left-rounded'}
            onClick={() => router.push('/catalogs/email-template')}
          >
            Back
          </ButtonIcon>
        </Grid>

        <Grid
          item
          xs={12}
          md={2}
          lg={1}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <ButtonIcon color='success' startIcon={'material-symbols:check-small-rounded'} onClick={submitHandler}>
            Update
          </ButtonIcon>
        </Grid>
      </Grid>
    </SettingsWrapper>
  )
}

export default EditEmailTemplateHeader

EditEmailTemplateHeader.propTypes = {
  slug: PropTypes.string,
  tabs: PropTypes.array,
  submitHandler: PropTypes.func,
  tabValue: PropTypes.string,
  router: PropTypes.object
}
