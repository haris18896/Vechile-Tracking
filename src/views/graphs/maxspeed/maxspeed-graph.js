import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Typography } from '@mui/material'

// ** Third Party Imports
import * as Yup from 'yup'
import moment from 'moment'
import { useFormik } from 'formik'
import DatePicker from 'react-datepicker'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Styles
import { SmallMapWrapper, useCommonStyles } from 'src/styles/common'
import hashIcon from '../../../../public/images/icons/graph-icons/number-ic.svg'
import {
  BodyWrapper,
  ContentContainer,
  ContentWrapper,
  GraphBodyWrapper,
  GraphsWrapper,
  ImgWrapper,
  SmText,
  Subtitle,
  TextSm,
  TextWrapper,
  Title,
  useCustomStyles
} from 'src/styles/pages/graphs'
import { TextInput, TextLabel, FieldWrapper, FieldHorizontalWrapper } from 'src/styles/components/input'

// ** utils
import { isObjEmpty } from 'src/configs/utils'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'
import { Marker } from '@react-google-maps/api'
import { TextField } from '@mui/material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Label,
  BarChart,
  Bar,
  Tooltip
} from 'recharts'
import { SubTitle } from 'chart.js'

function MaxspeedGraph({ slug, onChangeHandler, customers }) {
  const common = useCommonStyles()
  const graphStyles = useCustomStyles()

  // ** State
  const [open, setOpen] = useState(false)
  const [currentLocation, setCurrentLocation] = useState({})
  const [location, setLocation] = useState({})

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }, [])

  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // ** Form Validation
  const schema = Yup.object().shape({})

  // ** Form Values
  const formik = useFormik({
    initialValues: {},
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = {}

        const role = useJwt.getUserData().role

        if (role === 'admin') {
          data.user_type = 'main_db_admin'
        }

        if (slug) {
          data.slug = slug
        }

        console.log('data to be submitted', data)

        resetForm()
        handleClose()
      }
    }
  })

  //   Graph Data
  const data = [
    {
      asset: '2913 DHA',
      speed: 80,
      pv: 140,
      fill: '#FC3B61',
      amt: 10
    },
    {
      asset: '2913 STR',
      speed: 120,
      pv: 140,
      amt: 20,
      fill: '#00ABBE'
    },
    {
      asset: '2913 LLM',
      speed: 240,
      pv: 140,
      amt: 30,
      fill: '#FF8B00'
    }
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    console.log('check payload =>', payload)
    if (active && payload && payload.length) {
      return (
        <div className={graphStyles.Tooltip}>
          <p className='label'>{payload[0].dataKey}</p>
          <p className='value'>{payload[0].value}</p>

          <div>
            <div style={{ display: 'block' }}>
              <p className='label'>Asset</p>
              <p className='value'>{payload[0]?.payload.asset}</p>
            </div>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <GraphsWrapper>
        <Grid width="100%" sx={{overflowX: 'auto'}}> 
      <Grid container  sx={{ width: { xs: '700px', sm: '100%', paddingBottom: 40 } }}>
      <ResponsiveContainer width='100%' height={650}>
        <BarChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 50,
            right: 30,
            left: 20,
            bottom: 50
          }}
        >
          <CartesianGrid strokearray='3 3' vertical={false} />
          <XAxis dataKey='asset' interval={0} angle={-90} tick={{ fontSize: 13 }} dy={60} dx={-5}>
            <Label
              style={{
                textAnchor: 'start',
                fontSize: '150%',
                fontWeight: 'bold',
                fill: '#556485'
              }}
              angle={0}
              value={'Asset'}
              dy={50}
              dx={-75}
              position='insideLeft'
            />
          </XAxis>
          <YAxis dataKey='speed' tick={{ fontSize: 13 }} tickCount={20} interval={1}>
            <Label
              style={{
                textAnchor: 'middle',
                fontSize: '150%',
                fontWeight: 'bold',
                fill: '#556485'
              }}
              angle={270}
              value={'Max Speed'}
              position='insideBottom'
              dy={-60}
              dx={-20}
            />
          </YAxis>
          <Bar dataKey='speed' barSize={120} fill='fill' />
          <Tooltip active={true} content={<CustomTooltip name='Max Speed' />} cursor={false} />
        </BarChart>
      </ResponsiveContainer>
      </Grid>
      </Grid>
    </GraphsWrapper>
  )
}

export default MaxspeedGraph

MaxspeedGraph.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
