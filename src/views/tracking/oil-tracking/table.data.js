export const columns = () => {
  return [
    {
      name: 'Asset',
      sortable: false,
      selector: row => row.asset
    },
    {
      name: 'Date & Time',
      sortable: false,
      selector: row => row.dateTime
    },
    {
      name: 'Lube Oil Volume',
      sortable: false,
      selector: row => row.lubeOilVolume
    },
    {
      name: 'Lube Oil Percentage',
      sortable: false,
      selector: row => row.lubeOilPercentage
    }
  ]
}

export const rows = [
  {
    asset: '6091 TRA',
    dateTime: '14-09-2021 08:53:09 PM',
    lubeOilVolume: 'N/A',
    lubeOilPercentage: 'N/A'
  },

  {
    asset: '6091 TRA',
    dateTime: '14-09-2021 08:53:09 PM',
    lubeOilVolume: 'N/A',
    lubeOilPercentage: 'N/A'
  },

  {
    asset: '6091 TRA',
    dateTime: '14-09-2021 08:53:09 PM',
    lubeOilVolume: 'N/A',
    lubeOilPercentage: 'N/A'
  }
]
