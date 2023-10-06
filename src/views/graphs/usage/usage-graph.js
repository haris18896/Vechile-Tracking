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
  ZAxis,
  Tooltip
} from 'recharts'
import { SubTitle } from 'chart.js'

function UsageGraph({ slug, onChangeHandler, customers }) {
  const styles = useCommonStyles()
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
      uv: 5,
      pv: 4,
      travel: 4
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

  const CustomTooltip = ({ active, payload, label }) => {
    console.log('check payload ==>', payload)
    if (active && payload && payload.length) {
      return (
        <div className={graphStyles.Tooltip}>
          <p className='label'>{`${payload[0].dataKey} : ${payload[0].value}`}</p>
          <div>
            <div style={{ display: 'inline-block' }}>
              <p className='label'>{`Date : ${payload[0]?.payload.date}`}</p>
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
              <Title>Usage Graph</Title>
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

      <Grid width="100%" sx={{overflowX: { xs: 'auto', sm: 'visible'} }}>
      <Grid container  sx={{ width: { xs: '500px', sm: '100%' } }}>
      <ResponsiveContainer width='100%' height={580} layout='vertical'>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 50,
            right: 30,
            left: 0,
            bottom: 50
          }}
          layout='vertical'
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis type='number' dataKey='time' dy={10} />
          <YAxis type='category' dataKey='pv' tick={{ fontSize: 0 }}>
            <Label
              style={{
                textAnchor: 'middle',
                fontSize: '150%',
                fontWeight: 'bold',
                fill: '#556485'
              }}
              angle={270}
              value={'2913 DHA'}
              position='center'
            />
          </YAxis>
          <Tooltip active={true} content={<CustomTooltip />} cursor={false} />
          <Bar dataKey='travel' barSize={800} stackId='a' fill='#2FC17E' />
          <Bar dataKey='uv' barSize={800} stackId='a' fill='#FC3B61' />
          <Bar dataKey='pv' barSize={800} stackId='a' fill='#FF8B00' />
        </BarChart>
      </ResponsiveContainer>
      </Grid>
      </Grid>
    </GraphsWrapper>
  )
}

export default UsageGraph

UsageGraph.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
