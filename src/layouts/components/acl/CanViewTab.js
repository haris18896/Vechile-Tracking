// ** React Imports
import { useContext } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

// ** MUI
import Tab from '@mui/material/Tab'

// ** Component Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

const CanViewTab = props => {
  // ** props
  const { tab, index, value, label, onClick } = props

  // ** Hook
  const router = useRouter()
  const ability = useContext(AbilityContext)
  // console.log('value of tabs : ', value, 'tab data : ', tab)

  function control(index) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tab-control-${index}`
    }
  }

  return ability && ability.can(tab?.action, tab?.subject) ? (
    <Tab
      value={value}
      label={label}
      onClick={onClick}
      {...control(index)}
      sx={{
        minHeight: '52px',
        borderBottom: router.pathname === value && '3px solid #00cce3',
        color: router.pathname === value && '#00cce3'
      }}
    />
  ) : null
}

export default CanViewTab

CanViewTab.propTypes = {
  tab: PropTypes.object,
  label: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.any
}
