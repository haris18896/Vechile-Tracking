// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import { chipStatus } from 'src/components/states/chips'

// ** Icon import
import { Icon } from '@iconify/react'

export const columns = () => {
  return [
    {
      name: 'Account',
      sortable: true,
      selector: row => row.name
    },

    {
      name: 'Asset Name',
      sortable: true,
      selector: row => row.asset_name
    },
    {
      name: 'Timestamp',
      sortable: true,
      selector: row => `${row.date.split('T')[0]}\n${row.date.split('T')[1]}`
    },
    {
      name: 'Power',
      sortable: false,
      cell: row => {
        const power_status = row?.power

        return (
          <CustomChip
            size='medium'
            skin='light'
            sx={{
              padding: '0.2rem 0.4rem',
              flex: 1,
              height: '28px',
              '& .MuiChip-label': {
                fontSize: '0.65rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                textOverflow: 'unset'
              }
            }}
            color={chipStatus[power_status]?.color}
            label={power_status}
          />
        )
      }
    },
    {
      name: 'Battery Voltage',
      sortable: true,
      cell: row => (
        <CustomChip
          size='small'
          skin='light'
          color={chipStatus[row.ignition_status]?.color}
          label={
            <Icon
              icon={chipStatus[row.ignition_status]?.icon}
              width='15'
              height='15'
              color={chipStatus[row.ignition_status]?.color}
            />
          }
          sx={{
            padding: '0.9rem 0rem',
            margin: 'auto'
          }}
        />
      )
    },
    {
      name: 'Power Voltage',
      sortable: true,
      cell: row => (
        <CustomChip
          size='small'
          skin='light'
          color={chipStatus[row.power_voltage]?.color}
          label={
            <Icon
              icon={chipStatus[row.power_voltage]?.icon}
              width='15'
              height='15'
              color={chipStatus[row.power_voltage]?.color}
            />
          }
          sx={{
            padding: '0.9rem 0rem',
            margin: 'auto'
          }}
        />
      )
    },
    {
      name: 'Sensor Type',
      sortable: false,
      selector: row => row.sensor_type
    },
    {
      name: 'Sensor Id',
      sortable: false,
      selector: row => row.sensor_id
    },
    {
      name: 'Battery Voltage Status',
      sortable: false,
      selector: row => row.battery_voltage_status
    },
    {
      name: 'Sensor Battery Voltage',
      sortable: false,
      selector: row => row.sensor_battery_voltage
    },
    {
      name: 'Temperature Alert Status',
      sortable: false,
      selector: row => row.sensor_battery_voltage
    },
    {
      name: 'Sensor Temperature',
      sortable: false,
      selector: row => row.sensor_temperature
    },
    {
      name: 'Sensor Button Status',
      sortable: false,
      selector: row => row.sensor_button_status
    },
    {
      name: 'Sensor Status',
      sortable: false,
      selector: row => row.sensor_status
    },
    {
      name: 'Humidity',
      sortable: false,
      selector: row => row.humidity
    },
    {
      name: 'RSSI',
      sortable: false,
      selector: row => row.rssi
    },
    {
      name: 'Sensor Time',
      sortable: true,
      selector: row => `${row.sensor_time.split('T')[0]}\n${row.sensor_time.split('T')[1]}`
    }
  ]
}

export const rows = [
  {
    name: '769IJA',
    asset_name: 'asset-0123',
    power: 'on',
    power_voltage: 'on',
    sensor_type: 'N/A',
    sensor_id: '5211AF',
    battery_voltage_status: 'off',
    sensor_battery_voltage: 'off',
    sensor_temperature: 'High',
    sensor_button_status: 'on',
    sensor_status: 'off',
    humidity: 'low',
    rssi: 'N/A',
    sensor_time: '2020-05-01T12:00:00',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890'
  },
  {
    name: '769IJA',
    asset_name: 'asset-0123',
    power: 'on',
    power_voltage: 'on',
    sensor_type: 'N/A',
    sensor_id: '5211AF',
    battery_voltage_status: 'off',
    sensor_battery_voltage: 'off',
    sensor_temperature: 'High',
    sensor_button_status: 'on',
    sensor_status: 'off',
    humidity: 'low',
    rssi: 'N/A',
    sensor_time: '2020-05-01T12:00:00',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890'
  },
  {
    name: '769IJA',
    asset_name: 'asset-0123',
    power_voltage: 'on',
    power: 'on',
    sensor_type: 'N/A',
    sensor_id: '5211AF',
    battery_voltage_status: 'off',
    sensor_battery_voltage: 'off',
    sensor_temperature: 'High',
    sensor_button_status: 'on',
    sensor_status: 'off',
    humidity: 'low',
    rssi: 'N/A',
    sensor_time: '2020-05-01T12:00:00',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890'
  },
  {
    name: '769IJA',
    asset_name: 'asset-0123',
    power: 'on',
    power_voltage: 'on',
    sensor_type: 'N/A',
    sensor_id: '5211AF',
    battery_voltage_status: 'off',
    sensor_battery_voltage: 'off',
    sensor_temperature: 'High',
    sensor_button_status: 'on',
    sensor_status: 'off',
    humidity: 'low',
    rssi: 'N/A',
    sensor_time: '2020-05-01T12:00:00',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890'
  },
  {
    name: '769IJA',
    asset_name: 'asset-0123',
    power: 'off',
    power_voltage: 'on',
    sensor_type: 'N/A',
    sensor_id: '5211AF',
    battery_voltage_status: 'off',
    sensor_battery_voltage: 'off',
    sensor_temperature: 'High',
    sensor_button_status: 'on',
    sensor_status: 'off',
    humidity: 'low',
    rssi: 'N/A',
    sensor_time: '2020-05-01T12:00:00',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890'
  },
  {
    name: '769IJA',
    asset_name: 'asset-0123',
    power: 'off',
    power_voltage: 'on',
    sensor_type: 'N/A',
    sensor_id: '5211AF',
    battery_voltage_status: 'off',
    sensor_battery_voltage: 'off',
    sensor_temperature: 'High',
    sensor_button_status: 'on',
    sensor_status: 'off',
    humidity: 'low',
    rssi: 'N/A',
    sensor_time: '2020-05-01T12:00:00',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890'
  },
  {
    name: '769IJA',
    asset_name: 'asset-0123',
    power: 'off',
    power_voltage: 'on',
    sensor_type: 'N/A',
    sensor_id: '5211AF',
    battery_voltage_status: 'off',
    sensor_battery_voltage: 'off',
    sensor_temperature: 'High',
    sensor_button_status: 'on',
    sensor_status: 'off',
    humidity: 'low',
    rssi: 'N/A',
    sensor_time: '2020-05-01T12:00:00',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890'
  },
  {
    name: '769IJA',
    asset_name: 'asset-0123',
    power: 'off',
    power_voltage: 'on',
    sensor_type: 'N/A',
    sensor_id: '5211AF',
    battery_voltage_status: 'off',
    sensor_battery_voltage: 'off',
    sensor_temperature: 'High',
    sensor_button_status: 'on',
    sensor_status: 'off',
    humidity: 'low',
    rssi: 'N/A',
    sensor_time: '2020-05-01T12:00:00',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890'
  },
  {
    name: '769IJA',
    asset_name: 'asset-0123',
    power: 'off',
    power_voltage: 'on',
    sensor_type: 'N/A',
    sensor_id: '5211AF',
    battery_voltage_status: 'off',
    sensor_battery_voltage: 'off',
    sensor_temperature: 'High',
    sensor_button_status: 'on',
    sensor_status: 'off',
    humidity: 'low',
    rssi: 'N/A',
    sensor_time: '2020-05-01T12:00:00',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890'
  },
  {
    name: '769IJA',
    asset_name: 'asset-0123',
    power: 'off',
    power_voltage: 'on',
    sensor_type: 'N/A',
    sensor_id: '5211AF',
    battery_voltage_status: 'off',
    sensor_battery_voltage: 'off',
    sensor_temperature: 'High',
    sensor_button_status: 'on',
    sensor_status: 'off',
    humidity: 'low',
    rssi: 'N/A',
    sensor_time: '2020-05-01T12:00:00',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890'
  },
  {
    name: '769IJA',
    asset_name: 'asset-0123',
    power: 'off',
    power_voltage: 'on',
    sensor_type: 'N/A',
    sensor_id: '5211AF',
    battery_voltage_status: 'off',
    sensor_battery_voltage: 'off',
    sensor_temperature: 'High',
    sensor_button_status: 'on',
    sensor_status: 'off',
    humidity: 'low',
    rssi: 'N/A',
    sensor_time: '2020-05-01T12:00:00',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890'
  },
  {
    name: '769IJA',
    asset_name: 'asset-0123',
    power: 'off',
    power_voltage: 'on',
    sensor_type: 'N/A',
    sensor_id: '5211AF',
    battery_voltage_status: 'off',
    sensor_battery_voltage: 'off',
    sensor_temperature: 'High',
    sensor_button_status: 'on',
    sensor_status: 'off',
    humidity: 'low',
    rssi: 'N/A',
    sensor_time: '2020-05-01T12:00:00',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890'
  }
]
