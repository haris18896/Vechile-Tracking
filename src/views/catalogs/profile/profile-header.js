import React, { memo } from 'react'
import PropTypes from 'prop-types'

// ** MUI
import Grid from '@mui/material/Grid'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import SelectAutoComplete from 'src/components/autocomplete-selector'

// ** Styles
import { SettingsWrapper, Title } from 'src/styles/pages/settings'
import { FieldHorizontalWrapper } from 'src/styles/components/input'

function ProfileHeader(props) {
  const { router, customers, slug, onChangeHandler, inputValue, add, create } = props

  const customersList = customers?.map(customer => {
    return {
      value: customer.id,
      label: customer.company_name,
      slug: customer.slug
    }
  })

  return (
    <SettingsWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Title>
            {router.pathname.includes('/catalogs/parents')
              ? 'Parents List'
              : router.pathname.includes('/catalogs/teachers')
              ? 'Teachers List'
              : router.pathname.includes('catalogs/driver')
              ? 'Drivers List'
              : 'Students List'}
          </Title>
        </Grid>

        <Grid
          item
          xs={12}
          md={9}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <Grid container spacing={1} sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <FieldHorizontalWrapper>
                {/* <TextLabel id='customer_type'>Customer</TextLabel> */}
                <SelectAutoComplete
                  value={slug}
                  label='Customers'
                  options={customersList || []}
                  inputValue={inputValue}
                  valueType='customer_type'
                  inputValueType='inputValue'
                  onChangeHandler={onChangeHandler}
                />
              </FieldHorizontalWrapper>
            </Grid>

            {create && (
              <Grid item xs={12} sm={6} md={3} lg={2}>
                <FieldHorizontalWrapper>
                  <ButtonIcon color='success' startIcon={'ic:baseline-plus'} onClick={add}>
                    Add
                  </ButtonIcon>
                </FieldHorizontalWrapper>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </SettingsWrapper>
  )
}

export default memo(ProfileHeader)

ProfileHeader.propTypes = {
  customers: PropTypes.array,
  slug: PropTypes.object,
  onChangeHandler: PropTypes.func,
  inputValue: PropTypes.string
}
