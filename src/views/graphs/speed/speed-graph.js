import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Box, Typography } from '@mui/material'

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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Label, Tooltip } from 'recharts'
import { SubTitle } from 'chart.js'
import { useSelector, useDispatch } from 'react-redux'
import { getAllSpeedGraphAction } from 'src/store/graphs/speed/speedActions'

function SpeedGraph({ slug, onChangeHandler, customers }) {
  const common = useCommonStyles()
  const graphStyles = useCustomStyles()
  const dispatch = useDispatch()
  const { getSpeedGraphList, speedGraphHeaderData, speedGraphPaging } = useSelector(state => state.speed)

  // ** State
  const [open, setOpen] = useState(false)
  const [data, setdata] = useState([])
  const [paging, setPaging] = useState({})
  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    // setdata
    const outputArray = getSpeedGraphList.map(convertToObject)
    setdata(outputArray)
    setPaging(speedGraphPaging)
  }, [getSpeedGraphList])

  const convertToObject = inputObject => {
    const timestamp = inputObject.timestamp
    const speed = parseFloat(inputObject.speed)

    const dateParts = timestamp.split(' ')
    const date = dateParts[0]
    const time = dateParts[1]

    return {
      date: timestamp,
      time: speed + 10,
      speed: speed,
      amt: speed + 10
    }
  }

  //   Graph Data
  const data2 = [
    {
      date: '14-09-2021 08:53:09',
      time: 10,

      speed: 3,
      amt: 10
    },
    {
      date: '11-08-2021 08:53:09',
      time: 20,

      speed: 5,
      amt: 20
    },
    {
      date: '19-09-2021 10:52:08',
      time: 30,

      speed: 20,
      amt: 30
    },
    {
      date: '19-08-2020 12:50:01',
      time: 40,

      speed: 30,
      amt: 40
    },
    {
      date: '09-01-2019 10:10:21',
      time: 50,
      speed: 20,
      amt: 50
    },
    {
      date: '29-01-2022 11:52:02',
      time: 60,
      speed: 50,
      amt: 60
    },
    {
      date: '24-02-2019 11:52:11',
      time: 70,
      speed: 30,
      amt: 70
    },

    {
      date: '24-06-2018 11:23:12',
      time: 70,
      speed: 30,
      amt: 70
    },

    {
      date: '24-01-2020 11:22:12',
      time: 70,
      speed: 30,
      amt: 70
    },

    {
      date: '22-03-2021 09:22:12',
      time: 70,
      speed: 30,
      amt: 70
    }
  ]

  const CustomizedDot = props => {
    const { cx, cy, stroke, payload, value } = props

    return <circle cx={cx} cy={cy} r={8} strokeWidth={3} fill='#FF8B00' />
  }

  const CustomTooltip = ({ active, payload, label }) => {
    console.log('check payload =>', payload)
    if (active && payload && payload.length) {
      return (
        <div className={graphStyles.Tooltip}>
          <p className='label'>{payload[0].dataKey}</p>
          <p className='value'>{payload[0].value}</p>

          <div>
            <div style={{ display: 'block' }}>
              <p className='label'>Date</p>
              <p className='value'>{payload[0]?.payload.date}</p>
            </div>
          </div>
        </div>
      )
    }

    return null
  }

  const pagingActions = page => {
    let params = {
      asset_id: speedGraphHeaderData.asset_id,
      from_date_time: speedGraphHeaderData.from_date_time,
      to_date_time: speedGraphHeaderData.to_date_time,
      limit: 50,
      page: page
    }
    dispatch(getAllSpeedGraphAction(params))
  }

  return (
    <GraphsWrapper>
      <GraphBodyWrapper>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container columnSpacing={8} rowSpacing={5}>
            <Grid item>
              <FieldHorizontalWrapper>
                <Title>Speed VS Time Graph</Title>
              </FieldHorizontalWrapper>
            </Grid>
            <Grid item>
              <ContentContainer>
                <ImgWrapper>
                  <img src={'/images/icons/graph-icons/number-ic.svg'} alt='asset' width='100%' height='100%' />
                </ImgWrapper>
                <TextWrapper>
                  <Subtitle>Asset No.</Subtitle>
                  <TextSm>{speedGraphHeaderData.asset_id}</TextSm>
                </TextWrapper>
              </ContentContainer>
            </Grid>

            <Grid item>
              <ContentContainer>
                <ImgWrapper>
                  <img src={'/images/icons/graph-icons/time-ic.svg'} alt='asset' width='100%' height='100%' />
                </ImgWrapper>
                <TextWrapper>
                  <Subtitle>From Date & Time</Subtitle>
                  <TextSm>{speedGraphHeaderData?.from_date_time}</TextSm>
                </TextWrapper>
              </ContentContainer>
            </Grid>

            <Grid item>
              <ContentContainer>
                <ImgWrapper>
                  <img src={'/images/icons/graph-icons/time-ic.svg'} alt='asset' width='100%' height='100%' />
                </ImgWrapper>
                <TextWrapper>
                  <Subtitle>To Date & Time</Subtitle>
                  <TextSm>{speedGraphHeaderData?.to_date_time}</TextSm>
                </TextWrapper>
              </ContentContainer>
            </Grid>
            <Grid item>
              <ContentContainer>
                <ImgWrapper>
                  <img src={'/images/icons/graph-icons/pages-ic.svg'} alt='asset' width='100%' height='100%' />
                </ImgWrapper>
                <TextWrapper>
                  <Subtitle>Total Pages</Subtitle>
                  <TextSm>{paging?.last_page}</TextSm>
                </TextWrapper>
              </ContentContainer>
            </Grid>
            <Grid item>
              <ContentContainer>
                <ImgWrapper>
                  <img src={'/images/icons/graph-icons/page-ic.svg'} alt='asset' width='100%' height='100%' />
                </ImgWrapper>
                <TextWrapper>
                  <Subtitle>Current Page</Subtitle>
                  <TextSm>{paging?.current_page}</TextSm>
                </TextWrapper>
              </ContentContainer>
            </Grid>
            {data.length > 0 && paging?.current_page != paging?.last_page && (
              <Grid item>
                <ButtonIcon sx={{}} color='primary-outlined' onClick={() => pagingActions(paging?.current_page + 1)}>
                  Next Page
                </ButtonIcon>
              </Grid>
            )}
            {data.length > 0 && paging?.current_page != 1 && (
              <Grid item>
                <ButtonIcon
                  sx={{ marginLeft: 0 }}
                  color='primary-outlined'
                  onClick={() => pagingActions(paging?.current_page - 1)}
                >
                  Previous Page
                </ButtonIcon>
              </Grid>
            )}
          </Grid>
        </Box>
      </GraphBodyWrapper>
      <Grid width='100%' sx={{ overflowX: { xs: 'auto', sm: 'visible' }, paddingLeft: { xs: 5, sm: 0 } }}>
        <Grid container sx={{ width: { xs: '500px', sm: '100%' } }}>
          <ResponsiveContainer height={580} width='100%'>
            <LineChart data={data} margin={{ top: 30, right: 20, bottom: 80, left: 10 }} width='100%' height={300}>
              <CartesianGrid vertical={false} stroke='trasparent' horizontalFill={['#E4F6F8', 'white']} />
              <XAxis dataKey='date' interval={0} angle={-90} tick={{ fontSize: 13 }} dy={55} dx={0}>
                <Label
                  style={{
                    textAnchor: 'start',
                    fontSize: '150%',
                    fontWeight: 'bold',
                    fill: '#556485'
                  }}
                  angle={0}
                  value={'Time'}
                  dy={20}
                  dx={-95}
                  position='insideLeft'
                />
              </XAxis>{' '}
              <YAxis dataKey={'time'} tick={{ fontSize: 13 }} tickCount={50}>
                <Label
                  style={{
                    textAnchor: 'middle',
                    fontSize: '150%',
                    fontWeight: 'bold',
                    fill: '#556485'
                  }}
                  angle={270}
                  value={'Speed (KM/HR)'}
                  position='insideBottom'
                  dy={-100}
                  dx={-20}
                />
              </YAxis>
              <Tooltip active={true} content={<CustomTooltip />} cursor={false} />
              {/* <Legend /> */}
              <Line type='linear' dataKey='speed' strokeWidth={3} stroke='#C0C5D0' dot={<CustomizedDot />} />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </GraphsWrapper>
  )
}

export default SpeedGraph

SpeedGraph.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
