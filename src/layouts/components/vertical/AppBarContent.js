/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useJwt from 'src/auth/jwt/useJwt'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Autocomplete from '@mui/material/Autocomplete'

// ** Icon Imports
import { Icon } from '@iconify/react'

// ** custom components
import { TabsData } from './TabsList'
import CanViewTab from '../acl/CanViewTab'
import { GroupHeader, GroupItems } from 'src/styles/common'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'

// ** Styles
import { makeStyles } from '@mui/styles'

// ** Redux
import { useSelector, useDispatch } from 'react-redux'

// ** Actions
import { TabAction } from 'src/store/tabs'
import { TableUIContext } from 'src/contexts/TableContext'
import { UpdateVpsInUserAuth } from 'src/store/authentication/authAction'
import { UnsetDB, SwitchDB, GetAllCustomers } from 'src/store/settings/customers/customersActions'

const useStyles = makeStyles(theme => ({
  tabTextColor: {
    color: theme.palette.primary.main
  },
  deActiveTab: {
    '& .MuiTabs-scroller': {
      '& .MuiTabs-indicator': {
        height: 0
      }
    }
  },
  tabs: {
    width: '100%',
    overflowX: 'auto'
  },
  focusedLabel: {},
  search: {
    minWidth: '150px',
    color: 'white',
    maxWidth: '300px',

    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1px',
      borderStyle: 'solid',
      cursor: 'pointer',
      color: 'white',
      borderColor: theme.palette.grey[300],
      borderRadius: '5rem'
    },

    '& .MuiOutlinedInput-input.Mui-disabled::placeholder': {
      color: theme.palette.grey[300]
    },

    '& .MuiOutlinedInput-input': {
      color: theme.palette.grey[300]
      // height: '1em'
    },

    '& .MuiAutocomplete-hasClearIcon': {
      color: theme.palette.grey[300]
    },

    '& .MuiSelect-icon': {
      top: 'calc(50% - 12px)',
      color: theme.palette.grey[300]
    },

    '& .MuiAutocomplete-endAdornment': {
      '& button': {
        '& svg': {
          color: theme.palette.grey[300]
        }
      }
    },

    '& .MuiInputLabel-root': {
      color: theme.palette.grey[300],
      top: '-6px !important'
    },

    '& .MuiInputLabel-root.Mui-focused': {
      top: '0 !important'
    },

    '& .MuiAutocomplete-clearIndicator': {
      color: theme.palette.grey[300]
    },

    '& .MuiAutocomplete-input.MuiOutlinedInput-input': {
      padding: '0.2rem 0.3rem',
      fontSize: '0.875rem',
      color: theme.palette.grey[300],
      '@media (max-width: 1366px)': {
        fontSize: '0.8rem'
      }
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent'
    },

    '& .MuiOutlinedInput-root': {
      borderRadius: '5rem',

      '& fieldset': {
        borderColor: theme.palette.grey[300]
      },
      '&:hover fieldset': {
        borderColor: theme.palette.grey[300]
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.grey[300]
      },

      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.grey[300]
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.grey[300]
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.grey[300]
      }
    }
  }
}))

const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props
  const { hideTableData, tableData } = useContext(TableUIContext)

  // ** Super Admin
  const is_super_admin = useJwt.getUserData()?.is_super_admin

  // ** Router && translations
  const router = useRouter()
  const { t } = useTranslation()

  // ** Store
  const dispatch = useDispatch()
  const { page, value } = useSelector(state => state.tabs)
  const { loading, allCustomers } = useSelector(state => state.customers)
  const vps_id = useSelector(state => state.auth?.user?.data?.user?.vps_id)

  // ** states
  const [subPath, setSubPath] = useState('')
  const [customer, setCustomer] = useState(vps_id)

  const options =
    allCustomers?.length > 0 &&
    allCustomers.map(option => {
      const firstLetter = option?.name?.[0].toUpperCase()

      return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option
      }
    })

  // ** pageTabs
  const pageTabs = TabsData.map(tab => {
    if (router.pathname.includes([tab?.href])) {
      return tab?.list
    }
  })

  // ** styles
  const classes = useStyles()

  // ** Actions
  useEffect(() => {
    dispatch(TabAction({ page: router.pathname, value }))
  }, [router.pathname, value])

  useEffect(() => {
    if (is_super_admin) {
      dispatch(GetAllCustomers())
    }
  }, [])

  const handleChange = (event, newValue) => {
    event.preventDefault()
    hideTableData()
    dispatch(TabAction({ page: router.pathname, value: newValue }))
    router.replace(`${newValue}`)
  }

  console.log('value : ', value)

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 0px 0 0px'
        }}
      >
        <Box className={classes.tabs} sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
          {hidden ? (
            <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
              <Icon icon='mdi:menu' fontSize='1.5rem' />
            </IconButton>
          ) : null}

          {router.pathname !== '/dashboard' &&
            pageTabs.length &&
            pageTabs.map((tabs, index) => (
              <Fragment key={index}>
                {tabs !== undefined && (
                  <TabContext value={router.pathname}>
                    <TabList
                      sx={{
                        '& .Mui-disabled': {
                          width: '0px !important',
                          transition: 'all 0.3s ease-in !important'
                        },
                        '&. MuiTabScrollButton-root': {
                          width: '30px !important',
                          transition: 'all 0.3s ease-out !important'
                        },
                        '&. MuiTab-root': {
                          padding: '12px 16px 12px 0px !important'
                        }
                      }}
                      variant='scrollable'
                      className={classes.deActiveTab}
                      scrollButtons={true}
                      aria-label={`Tabs-${index}`}
                    >
                      {tabs.map((data, i) => (
                        <CanViewTab
                          tab={data}
                          key={i}
                          index={i}
                          label={data.label}
                          value={
                            data.path === router.pathname
                              ? data.path
                              : data?.tabs
                              ? data.tabs.find(tab => router.pathname.includes(tab.path))?.path
                              : ''
                          }
                          onClick={e => handleChange(e, data.path)}
                        />
                      ))}
                    </TabList>
                  </TabContext>
                )}
              </Fragment>
            ))}
        </Box>
        <LanguageDropdown settings={settings} saveSettings={saveSettings} />
        {is_super_admin && (
          <Box className='actions-right' sx={{ display: 'flex', paddingBottom: '2px' }}>
            <Autocomplete
              type='text'
              size={'small'}
              name='customers'
              fullWidth={true}
              loading={loading}
              disabled={loading}
              variant='outlined'
              id='customers-list'
              clearOnEscape={false}
              className={classes.search}
              value={(options && options.find(item => item?.id === customer)) || null}
              options={options && options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
              groupBy={option => option.firstLetter}
              getOptionLabel={option => option.name}
              onChange={(e, selectedOption) => {
                if (selectedOption?.id) {
                  dispatch(
                    SwitchDB({
                      id: selectedOption?.id,
                      name: selectedOption?.name,
                      callback: () => {
                        setCustomer(selectedOption?.id)
                        dispatch(
                          UpdateVpsInUserAuth({
                            id: selectedOption?.id,
                            name: selectedOption?.name,
                            error: t('userNotFound')
                          })
                        )
                        const location = router.asPath
                        router.push(`${location}`)
                        // window.location.reload()
                      }
                    })
                  )
                }
              }}
              clearIcon={
                <Icon
                  icon='majesticons:close-line'
                  fontSize='1.2rem'
                  onClick={() => {
                    return dispatch(
                      UnsetDB({
                        callback: () => {
                          setCustomer(0)
                          dispatch(UpdateVpsInUserAuth({ id: null, error: t('userNotFound') }))
                          const location = router.asPath
                          router.push(`${location}`)
                        }
                      })
                    )
                  }}
                />
              }
              renderInput={params => (
                <TextField
                  {...params}
                  placeholder={t('settings.customers.customers')}
                  InputLabelProps={{
                    classes: {
                      root: classes.focusedLabel // Apply focused label styles
                    }
                  }}
                />
              )}
              renderGroup={params => (
                <li key={params.key}>
                  <GroupHeader>{params.group}</GroupHeader>
                  <GroupItems>{params.children}</GroupItems>
                </li>
              )}
            />
          </Box>
        )}

        <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center', paddingBottom: '2px' }}>
          <UserDropdown settings={settings} />
        </Box>
      </Box>
    </>
  )
}

export default AppBarContent
