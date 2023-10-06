const ignition = row => {
  let d = row.acc == 1 && row.power == 1 && row.speed > 0
  let res = d ? 'true' : 'false'

  return res
}

export const columns = () => {
  return [
    {
      name: 'Location',
      sortable: true,
      selector: row => row.location
    },

    {
      name: 'Speed(KM/H)',
      sortable: true,
      selector: row => row.speed
    },

    {
      name: 'Ignition',
      sortable: true,
      selector: row => ignition(row)
    },
    {
      name: 'Date & Time',
      sortable: true,
      selector: row => row.timestamp
    }
  ]
}

export const rows = [
  {
    location: 'Jeddah, Makkah Region, Saudi Arabia',
    date: '2021-05-01T12:00:00',
    speed: '0',
    ignition: 'off',
    date: '14-09-2021 08:53:09 PM'
  }
]
