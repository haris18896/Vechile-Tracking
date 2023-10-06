import { Grid } from '@mui/material'
import React from 'react'
import { Bar, BarChart, CartesianGrid, Label, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const OilTrackingGraph = ({ title, data}) => {


  return (
    <Grid item xs={12} sm={6}>
    <ResponsiveContainer width='100%' height={230}>
      <BarChart
        width={500}
        height={230}
        data={data}
        margin={{
          top: 10,
          right: 40,
          left: 30,
          bottom: 20
        }}
      >
        <CartesianGrid strokearray='3 3' vertical={false} />
        <YAxis dataKey='level' tickCount={10}  tick={{ fontSize: 13 }}>
          <Label
            style={{
              textAnchor: 'middle',
              fontSize: '100%',
              fontWeight: 'bold',
              fill: '#556485'
            }}
            angle={270}
            value={title}
            position='middle'
            dx={-20}
        
          />
        </YAxis>
        <XAxis dataKey='amt' tick={{ fontSize: 13 }} />
        <Bar dataKey="pv" barSize={2} fill="#b6b6b6" />

      </BarChart>
    </ResponsiveContainer>
  </Grid>
  )
}

export default OilTrackingGraph