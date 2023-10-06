import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

export const useDatepickerStyles = makeStyles(theme => ({
  datepicker: {
    width: '100%',
    color: '#0F224B',
    borderRadius: '5rem',
    fontSize: '0.875rem',
    fontWeight: '400',
    fontFamily: 'poppins',
    padding: '0.6rem 1rem',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: props => (props.error ? '#E53E3E' : '#F4F8F8'),
    cursor: 'pointer',
    background: 'none',
    outlineColor: '#00ABBE',
    '&:hover': {
      backgroundColor: 'transparent'
    },
    '&:before': {
      content: 'a string'
    },
    '@media (max-width: 1366px)': {
      fontSize: '0.8rem'
    }
  }
}))

export const InputDatePicker = styled(DatePickerWrapper)(({ theme, icon }) => ({
  fontWeight: 500,
  fontSize: '1rem',
  padding: '0.5rem 1rem',

  '& .MuiOutlinedInput-root': {
    borderRadius: '5rem'
  },

  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(2, 3)
  }
}))
