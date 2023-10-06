// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { useStyles } from 'src/styles/pages/login'
import Icon from 'src/@core/components/icon'

// ** Translation
import { useTranslation } from 'react-i18next';

// ** settings
import { useSettings } from 'src/@core/hooks/useSettings'

import OptionsMenu from 'src/@core/components/option-menu'
import { Typography } from '@mui/material'

const LanguageSelector = () => {
  // ** Styles
  const classes = useStyles()

  // ** Translation
  const { i18n } = useTranslation();

  // ** settings
  const { settings, saveSettings } = useSettings()
  
  const handleLangItemClick = lang => {
    i18n.changeLanguage(lang)
  }
  
  return (
    <div className={classes.translator}>
      <Icon className={classes.icon} sx={{ marginRight: '0.5rem' }} icon={'ph:globe-light'} fontSize={24} />
      <OptionsMenu
      icon={<Typography className={classes.language} fontSize='small'>{i18n.language === 'en' ? 'English' : 'Arabic'}</Typography>}
      menuProps={{ sx: { '& .MuiMenu-paper': { mt: 4, minWidth: 130 } } }}
      options={[
        {
          text: 'English',
          menuItemProps: {
            selected: i18n.language === 'en',
            onClick: () => {
              handleLangItemClick('en')
              saveSettings({ ...settings, direction: 'ltr' })
            }
          }
        },
        {
          text: 'Arabic',
          menuItemProps: {
            selected: i18n.language === 'ar',
            onClick: () => {
              handleLangItemClick('ar')
              saveSettings({ ...settings, direction: 'rtl' })
            }
          }
        }
      ]}
    />
      <Icon
        className={classes.icon}
        sx={{ marginRight: '0.1rem' }}
        icon={'material-symbols:keyboard-arrow-down-rounded'}
        fontSize={26}
      />
    </div>
  )
}

export default LanguageSelector
