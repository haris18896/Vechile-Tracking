import React from 'react'
import PropTypes from 'prop-types'

// ** MUI
import { useTheme } from '@mui/material/styles'

// ** Charts
import ReactApexcharts from 'src/@core/components/react-apexcharts'

function RadialBarChart({ labels, data }) {
  const theme = useTheme()

  const donutColors = {
    stopped: '#FC3B61',
    ignitionOff: '#FF8B00',
    idle: '#FFC400',
    Moving: '#2FC17E',
    noData: '#C0C5D0'
  }

  const options = {
    stroke: { width: 0 },
    labels: labels,
    colors: [donutColors.stopped, donutColors.ignitionOff, donutColors.idle, donutColors.Moving, donutColors.noData],
    dataLabels: {
      enabled: false,
      formatter: val => `${parseInt(val, 10)}%`
    },
    legend: {
      position: 'bottom',
      markers: { offsetX: -3 },
      labels: { colors: theme.palette.text.secondary },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,

            name: {
              fontSize: '1.2rem'
            },
            value: {
              fontSize: '1.2rem',
              color: theme.palette.text.secondary,
              formatter: val => `${parseInt(val, 10)}`
            },
            total: {
              show: false,
              fontSize: '1.2rem',
              label: 'Moving',
              formatter: () => '42%',
              color: theme.palette.text.primary
            }
          }
        }
      }
    }

    // responsive: [
    //   {
    //     breakpoint: 992,
    //     options: {
    //       chart: {
    //         height: 200
    //       },
    //       legend: {
    //         position: 'bottom'
    //       }
    //     }
    //   },
    //   {
    //     breakpoint: 576,
    //     options: {
    //       chart: {
    //         height: 200
    //       },
    //       plotOptions: {
    //         pie: {
    //           donut: {
    //             labels: {
    //               show: false,
    //               name: {
    //                 fontSize: '1rem'
    //               },
    //               value: {
    //                 fontSize: '1rem'
    //               },
    //               total: {
    //                 fontSize: '1rem'
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // ]
  }

  return <ReactApexcharts type='donut' height={250} options={options} series={data} />
}

export default RadialBarChart

RadialBarChart.propTypes = {
  labels: PropTypes.array,
  data: PropTypes.array
}
