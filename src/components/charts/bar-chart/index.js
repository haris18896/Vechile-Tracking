import React, { PureComponent } from 'react'

// ** MUI
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

// ** Icon
import Icon from 'src/@core/components/icon'

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// const data = [
//   {
//     name: '7/12',
//     tracking: 80
//   },
//   {
//     name: '8/12',
//     tracking: 100
//   },
//   {
//     name: '9/12',
//     tracking: 80
//   },
//   {
//     name: '10/12',
//     tracking: 100
//   },
//   {
//     name: '11/12',
//     tracking: 50
//   },
//   {
//     name: '12/12',
//     tracking: 125
//   },
//   {
//     name: '13/12',
//     tracking: 70
//   },
//   {
//     name: '14/12',
//     tracking: 100
//   },
//   {
//     name: '15/12',
//     tracking: 80
//   },
//   {
//     name: '16/12',
//     tracking: 30
//   }
// ]

const CustomTooltip = data => {
  const { active, payload } = data
  if (active && payload) {
    return (
      <div
        className='recharts-custom-tooltip'
        style={{ background: '#0F224B', padding: '0.5rem', borderRadius: '5px' }}
      >
        {/* <Typography sx={{ color: '#fff' }}>{data.label}</Typography>
        <Divider /> */}
        {data &&
          data.payload &&
          data.payload.map(i => {
            return (
              <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: i.fill, mr: 2.5 } }} key={i.dataKey}>
                <Icon icon='mdi:circle' fontSize='0.6rem' />
                <Typography variant='body2' sx={{ color: '#eaeaffde' }}>{`${i.dataKey} : ${
                  i.payload[i.dataKey]
                }`}</Typography>
              </Box>
            )
          })}
      </div>
    )
  }

  return null
}

function BarChartGraph({ data }) {
  return (
    <BarChart width={350} height={180} barSize={15} data={data}>
      <CartesianGrid strokeDasharray='8 8' />
      <XAxis dataKey='name' />
      <Tooltip content={CustomTooltip} />
      <Bar dataKey='assets_count' fill='#2FC17E' />
    </BarChart>
  )
}

export default BarChartGraph
