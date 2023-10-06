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
import hashIcon from '../../../../public/images/icons/graph-icons/number-ic.svg'
import {
  ContentContainer,
  GraphBodyWrapper,
  GraphsWrapper,
  ImgWrapper,
  Subtitle,
  TextSm,
  TextWrapper,
  Title,
  useCustomStyles
} from 'src/styles/pages/graphs'
import { FieldHorizontalWrapper } from 'src/styles/components/input'

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

function DistanceGraph({ slug, onChangeHandler, customers }) {
  const graphStyles = useCustomStyles()

  // ** State
  const [open, setOpen] = useState(false)

  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  //   Graph Data
  const data = [
    {
      date: '14-09-2021 08:53:09',
      time: 10,
      distance: 10,
      fill: '#FC3B61',
      amt: 10
    },
    {
      date: '11-08-2021 08:53:09',
      time: 20,
      distance: 30,
      amt: 20,
      fill: '#00ABBE'
    },
    {
      date: '19-09-2021 10:52:08',
      time: 30,
      distance: 30,
      amt: 30,
      fill: '#FC3B61'
    },
    {
      date: '19-08-2020 12:50:01',
      time: 40,
      distance: 70,
      amt: 40,
      fill: '#00ABBE'
    },
    {
      date: '09-01-2019 10:10:21',
      time: 50,
      distance: 50,
      amt: 50,
      fill: '#FC3B61'
    },
    {
      date: '29-01-2022 11:52:02',
      distance: 10,
      time: 60,
      amt: 60,
      fill: '#00ABBE'
    },
    {
      date: '24-02-2019 11:52:11',
      time: 70,
      distance: 30,
      amt: 70,
      fill: '#FC3B61'
    },

    {
      date: '24-06-2018 11:23:12',
      time: 70,
      distance: 30,
      amt: 70,
      fill: '#00ABBE'
    },

    {
      date: '24-01-2020 11:22:12',
      time: 70,
      distance: 30,
      amt: 70,
      fill: '#FC3B61'
    },

    {
      date: '22-03-2021 09:22:12',
      time: 70,
      distance: 60,
      amt: 70,
      fill: '#00ABBE'
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

    return (
      <svg x={cx - 10} y={cy - 10} width={20} height={20} fill='green' viewBox='0 0 1024 1024'>
        <path d='M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z' />
      </svg>
    )
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={graphStyles.Tooltip}>
          <p className='label'>{payload[0].dataKey}</p>
          <p className='value'>{payload[0].value}</p>

          <div>
            <div style={{ display: 'block' }}>
              <p className='label'>Date</p>
              <p className='label'>{payload[0]?.payload.date}</p>
            </div>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <GraphsWrapper>
      <GraphBodyWrapper>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container columnSpacing={8} rowSpacing={5}>
            <Grid item>
              <Title>Distance Travelled VS Date Graph</Title>
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
          </Grid>
        </Box>
      </GraphBodyWrapper>
       <Grid width="100%" sx={{overflowX: 'auto', overflowY: 'hidden'}}> 
      <Grid container  sx={{ width: { xs: '700px', sm: '100%' } }}>
      <ResponsiveContainer width='100%' height={600}>
        <BarChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 50,
            right: 30,
            left: 20,
            bottom: 90
          }}
          
        >
          <CartesianGrid strokearray='3 3' vertical={false} />
          <XAxis dataKey='date' interval={0} angle={-90} tick={{ fontSize: 13 }} dy={65} dx={-5}>
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
              dx={-75}
              position='insideLeft'
            />
          </XAxis>
          <YAxis dataKey='time' tick={{ fontSize: 13 }}>
            <Label
              style={{
                textAnchor: 'middle',
                fontSize: '150%',
                fontWeight: 'bold',
                fill: '#556485'
              }}
              angle={270}
              value={'Distance Travelled (KMS)'}
              position='middle'
              dx={-20}
            />
          </YAxis>

          <Bar dataKey='distance' barSize={120} fill='fill' />
          <Tooltip active={true} content={<CustomTooltip />} cursor={false} />
        </BarChart>
      </ResponsiveContainer>
      </Grid>
      </Grid>
    </GraphsWrapper>
  )
}

export default DistanceGraph

DistanceGraph.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
