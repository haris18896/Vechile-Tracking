import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Box, Tooltip, Typography } from '@mui/material'

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
  Bullet,
  ContentContainer,
  ContentWrapper,
  GraphBodyWrapper,
  GraphsWrapper,
  ImgWrapper,
  SmText,
  Subtitle,
  TextSm,
  TextWrapper,
  Title
} from 'src/styles/pages/graphs'
import { FieldHorizontalWrapper } from 'src/styles/components/input'

// ** utils
import { isObjEmpty } from 'src/configs/utils'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'
import { Marker } from '@react-google-maps/api'
import { TextField } from '@mui/material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Label } from 'recharts'
import { SubTitle } from 'chart.js'

function TemperatureGraph({ slug, onChangeHandler, customers }) {
  const common = useCommonStyles()

  // ** State
  const [open, setOpen] = useState(false)

  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  //   Graph Data
  const data = [
    {
      name: '14-09-2021 08:53:09',
      time: 0.1,
      uv: 4000,
      pv: 3,
      amt: 10
    },
    {
      name: '11-08-2021 08:53:09',
      time: 0.2,
      uv: 3000,
      pv: 5,
      amt: 20
    },
    {
      name: '19-09-2021 10:52:08',
      time: 0.3,
      uv: 2000,
      pv: 20,
      amt: 30
    },
    {
      name: '19-08-2020 12:50:01',
      time: 0.4,
      uv: 2780,
      pv: 30,
      amt: 40
    },
    {
      name: '09-01-2019 10:10:21',
      time: 0.5,
      uv: 1890,
      pv: 20,
      amt: 50
    },
    {
      name: '29-01-2022 11:52:02',
      uv: 2390,
      time: 0.6,
      pv: 50,
      amt: 60
    },
    {
      name: '24-02-2019 11:52:11',
      time: 0.7,
      uv: 3490,
      pv: 30,
      amt: 70
    },

    {
      name: '24-06-2018 11:23:12',
      time: 0.8,
      uv: 3490,
      pv: 30,
      amt: 70
    },

    {
      name: '24-01-2020 11:22:12',
      time: 0.9,
      pv: 30,
      amt: 70
    },

    {
      name: '22-03-2021 09:22:12',
      time: 1,
      uv: 3490,
      pv: 30,
      amt: 70
    },

    {
      name: '22-03-2021 09:22:12',
      time: 2,
      uv: 3490,
      pv: 30,
      amt: 70
    },

    {
      name: '22-03-2021 09:22:12',
      time: 3,
      uv: 3490,
      pv: 30,
      amt: 70
    }
  ]

  const CustomizedDot = props => {
    const { cx, cy, stroke, payload, value } = props

    if (value > 2500) {
      return (
        <svg x={cx - 10} y={cy - 10} width={20} height={20} fill='red' viewBox='0 0 1024 1024'>
          <path d='M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM686.176 296.704c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM772.928 555.392c-18.752-8.864-40.928-0.576-49.632 18.528-40.224 88.576-120.256 143.552-208.832 143.552-85.952 0-164.864-52.64-205.952-137.376-9.184-18.912-31.648-26.592-50.08-17.28-18.464 9.408-21.216 21.472-15.936 32.64 52.8 111.424 155.232 186.784 269.76 186.784 117.984 0 217.12-70.944 269.76-186.784 8.672-19.136 9.568-31.2-9.12-40.096z' />
        </svg>
      )
    }

    return <circle cx={cx} cy={cy} r={8} strokeWidth={3} fill='#FF8B00' />
  }

  return (
    <GraphsWrapper>
      <GraphBodyWrapper align='start'>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container columnSpacing={8} rowSpacing={5}>
            <Grid item>
              <Title>Temperature Graph</Title>
            </Grid>

            <Grid item>
              <ContentContainer>
                <ImgWrapper>
                  <img src={'/images/icons/graph-icons/number-ic.svg'} alt='asset' width='100%' height='100%' />
                </ImgWrapper>
                <TextWrapper>
                  <Subtitle>Asset No.</Subtitle>
                  <TextSm>2913 DHA</TextSm>
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
                  <TextSm>14-09-2021 08:53:09 PM</TextSm>
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
                  <TextSm>14-09-2021 08:53:09 PM</TextSm>
                </TextWrapper>
              </ContentContainer>
            </Grid>

            <Grid item>
              <ContentContainer align='center'>
                <Bullet outer='#FFC4001A' dot='#FFC400' />
                <TextWrapper>
                  <Subtitle size='13px'>TEMP SENSOR 1</Subtitle>
                </TextWrapper>
              </ContentContainer>
            </Grid>

            <Grid item>
              <ContentContainer align='center'>
                <Bullet outer='#FC3B611A' dot='#FC3B61' />
                <TextWrapper>
                  <Subtitle size='13px'>TEMP SENSOR 2</Subtitle>
                </TextWrapper>
              </ContentContainer>
            </Grid>

            <Grid item>
              <ContentContainer align='center'>
                <Bullet outer='#00ABBE1A' dot='#00ABBE' />
                <TextWrapper>
                  <Subtitle size='13px'>TEMP SENSOR 3</Subtitle>
                </TextWrapper>
              </ContentContainer>
            </Grid>

            <Grid item>
              <ContentContainer align='center'>
                <Bullet outer='#2FC17E1A' dot='#2FC17E' />
                <TextWrapper>
                  <Subtitle size='13px'>TEMP SENSOR 4</Subtitle>
                </TextWrapper>
              </ContentContainer>
            </Grid>
          </Grid>
        </Box>
      </GraphBodyWrapper>
      <Grid width="100%" sx={{overflowX: { xs: 'auto', sm: 'visible'}  }}> 
      <Grid container  sx={{ width: { xs: '700px', sm: '100%' } }}>
      <ResponsiveContainer height={550} width='100%'>
        <LineChart data={data} margin={{ top: 30, right: 20, bottom: 80, left: 10 }} width='100%' height={300}>
          <CartesianGrid vertical={false} stroke='trasparent' horizontalFill={['#E4F6F8', 'white']} />
          <XAxis dataKey='name' interval={0} angle={-90} tick={{ fontSize: 13 }} dy={65} dx={-5}>
            <Label
              style={{
                textAnchor: 'start',
                fontSize: '150%',
                fontWeight: 'bold',
                fill: '#556485'
              }}
              angle={0}
              dy={20}
              dx={-80}
              position='insideLeft'
            />
          </XAxis>{' '}
          <YAxis dataKey={'time'} tick={{ fontSize: 13 }} tickCount={10}>
            <Label
              style={{
                textAnchor: 'middle',
                fontSize: '150%',
                fontWeight: 'bold',
                fill: '#556485'
              }}
              angle={270}
              value={'Temperature'}
              position='insideBottom'
              dy={-20}
              dx={-20}
            />
          </YAxis>
          {/* <Tooltip /> */}
          {/* <Legend /> */}
          {/* <Line type='linear' dataKey='pv' strokeWidth={3} stroke='#C0C5D0' dot={<CustomizedDot />} /> */}
        </LineChart>
      </ResponsiveContainer>
      </Grid>
      </Grid>
    </GraphsWrapper>
  )
}

export default TemperatureGraph

TemperatureGraph.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
