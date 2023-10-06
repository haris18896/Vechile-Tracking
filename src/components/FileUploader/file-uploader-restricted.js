// ** React Imports
import React, { Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 250
  }
}))

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

const FileUploaderRestrictions = ({ formikValue, formikError, onChange, mb, heading, allowed, desc }) => {
  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: mb * 1024 * 1024,

    onDrop: acceptedFiles => {
      onChange(acceptedFiles[0])
    },
    onDropRejected: () => {
      toast.error(`You can only upload 1 file & maximum size of ${mb} MB.`, {
        duration: mb * 1000
      })
    }
  })

  const handleRemoveFile = file => {
    onChange('')
  }

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img width={40} height={50} alt={file.name} src={URL.createObjectURL(file)} />
    } else {
      return <Icon icon='mdi:file-document-outline' />
    }
  }

  return (
    <Fragment>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
          <Img width={300} alt='Upload img' src='/images/misc/upload.png' />
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
            <HeadingTypography variant='h5'>{heading}</HeadingTypography>
            <Typography color='textSecondary'>{allowed}</Typography>
            <Typography color='textSecondary'>{desc}</Typography>
          </Box>
        </Box>
      </div>
      <Typography variant='body2' sx={{ color: '#C53030' }}>
        {formikError}
      </Typography>

      {!!formikValue ? (
        <Fragment>
          <List>
            <ListItem key={formikValue?.name}>
              <div className='file-details d-flex align-items-center justify-content-center'>
                {renderFilePreview(formikValue)}
                <div className={'ml-1'}>
                  <Typography className='file-name'>{formikValue?.name}</Typography>
                  <Typography className='file-size' variant='body2'>
                    {Math.round(formikValue?.size / 100) / 10 > 1000
                      ? `${(Math.round(formikValue?.size / 100) / 10000).toFixed(1)} mb`
                      : `${(Math.round(formikValue?.size / 100) / 10).toFixed(1)} kb`}
                  </Typography>
                </div>
              </div>
              <IconButton onClick={() => handleRemoveFile(formikValue)} sx={{ mx: 2 }}>
                <Icon icon='mdi:close' fontSize={20} />
              </IconButton>
            </ListItem>
          </List>
        </Fragment>
      ) : null}
    </Fragment>
  )
}

export default FileUploaderRestrictions
