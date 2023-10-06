import React, { useContext, useRef, useState } from 'react'
import PropTypes from 'prop-types'

// ** MUI
import Grid from '@mui/material/Grid'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import SelectAutoComplete from 'src/components/autocomplete-selector'

// ** Styles
import { CatalogsWrapper, IconWrapper, useCustomStyles } from 'src/styles/pages/catalogs'
import { SettingsWrapper, Title } from 'src/styles/pages/settings'
import { FieldHorizontalWrapper, TextInput } from 'src/styles/components/input'
import { Autocomplete, Box, Menu, MenuItem, Select, TextField } from '@mui/material'
import { PlaceholderText } from 'src/styles/common'
import { Icon } from '@iconify/react'
import { exportOptions } from 'src/utilities/utils'
import { TableUIContext } from 'src/contexts/TableContext'

function AssetsHeader(props) {
  const { router, onChangeHandler, ability, redirectWasl, countries, inputValues } = props

  // ** Styles
  const styles = useCustomStyles()

  // ** Header Height To Table Context
  const headerRef = useRef()
  const { getTableHeight } = useContext(TableUIContext)
  getTableHeight(headerRef)

  const { brand, driver, sim, imei, search_so, asset_name, account, amount, status, all } = inputValues

  // Export
  const handleExportOption = event => {
    const { value } = event.currentTarget.dataset
  }

  const [anchorEl, setAnchorEl] = useState(null)

  const openMenu = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <CatalogsWrapper ref={headerRef}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} xs={{ alignItems: 'center' }}>
          <Grid item md={2}>
            <Title>Assets List</Title>
          </Grid>

          <Grid item md={6} display='flex' flexWrap='wrap' marginLeft='auto'>
            <Grid container>
              <Grid item xs={12} sm={6} md={3}>
                <FieldHorizontalWrapper>
                  <TextField
                    name='brand'
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='Search Vehicle'
                    value={brand}
                    onChange={e => onChangeHandler('asset_name', e.target.value)}
                    className={styles.TextField}
                  ></TextField>
                </FieldHorizontalWrapper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FieldHorizontalWrapper>
                  <TextField
                    name='brand'
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='Search IMEI'
                    value={imei}
                    onChange={e => onChangeHandler('imei', e.target.value)}
                    className={styles.TextField}
                  ></TextField>
                </FieldHorizontalWrapper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FieldHorizontalWrapper>
                  <TextField
                    name='brand'
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='Search By SO'
                    value={search_so}
                    onChange={e => onChangeHandler('search_so', e.target.value)}
                    className={styles.TextField}
                  ></TextField>
                </FieldHorizontalWrapper>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FieldHorizontalWrapper>
                  <TextField
                    name='asset_name'
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='Search Brand'
                    value={asset_name}
                    onChange={e => onChangeHandler('brand', e.target.value)}
                    className={styles.TextField}
                  ></TextField>
                </FieldHorizontalWrapper>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={4}>
            <Grid container spacing={2} flexWrap='wrap'>
              {ability.can('create', 'create-asset') && (
                <Grid item>
                  <ButtonIcon
                    color='primary-outlined'
                    sx={{ width: 120 }}
                    startIcon={'ic:baseline-plus'}
                    onClick={() => router.push(`/catalogs/assets/add-edit/add`)}
                  >
                    Add
                  </ButtonIcon>
                </Grid>
              )}
              <Grid item>
                <ButtonIcon
                  sx={{ width: 120 }}
                  color='success'
                  startIcon={'ic:baseline-plus'}
                  onClick={() => redirectWasl(true)}
                >
                  Wasl
                </ButtonIcon>
              </Grid>

              <Grid item>
                <IconWrapper bg='#FF8B00' iconColor='#fff' width='35px' height='35px' circle>
                  <Icon icon='ic:round-search' width='22px' height='22px' />
                </IconWrapper>
              </Grid>

              <Grid item>
                <IconWrapper bg='#00ABBE' iconColor='#fff' width='35px' height='35px' circle>
                  <Icon icon='material-symbols:cloud-upload' width='22px' height='22px' />
                </IconWrapper>
              </Grid>

              <Grid item>
                <IconWrapper bg='#0F224B' iconColor='#fff' width='35px' height='35px' circle>
                  <Icon icon='bi:car-front-fill' width='18px' height='18px' />
                </IconWrapper>
              </Grid>

              <Grid item>
                <IconWrapper bg='#FC3B61' iconColor='#fff' width='35px' height='35px' circle>
                  <Icon icon='ion:trash-sharp' width='18px' height='18px' />
                </IconWrapper>
              </Grid>

              <Grid item>
                <div>
                  <ButtonIcon
                    sx={{ width: 120 }}
                    color='primary-outlined'
                    startIcon={'material-symbols:arrow-outward-rounded'}
                    onClick={handleClick}
                  >
                    Export
                  </ButtonIcon>

                  <Menu
                    id='basic-menu'
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleCloseMenu}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button'
                    }}
                    className={styles.exportStyles}
                  >
                    {exportOptions.map((item, index) => (
                      <MenuItem
                        onClick={handleExportOption}
                        sx={{ width: 120, display: 'flex', alignItems: 'center', gap: '10px' }}
                        key={item.name}
                        data-value={item.name}
                      >
                        {item.icon}
                        {item.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </CatalogsWrapper>
  )
}

export default AssetsHeader

AssetsHeader.propTypes = {
  slug: PropTypes.object || PropTypes.string,
  customers: PropTypes.array,
  inputValue: PropTypes.string,
  onChangeHandler: PropTypes.func
}
