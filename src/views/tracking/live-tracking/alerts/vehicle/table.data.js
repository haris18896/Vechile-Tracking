// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import { chipStatus } from 'src/components/states/chips'

// ** Icon import
import { getNull } from 'src/utilities/utils'

export const vehicle_columns = () => {
  return [
    {
      name: 'Asset Name',
      sortable: true,
      selector: row => <div>{row.name}</div>,
      conditionalCellStyles: [
        {
          when: row => row,
          classNames: ['break-word']
        }
      ]
    },

    {
      name: 'Expiry Date',
      sortable: true,
      selector: row =>
        getNull(row?.asset_expiry_date)
          ? 'N/A'
          : `${row.asset_expiry_date.split(' ')[0]}\n${row.asset_expiry_date.split(' ')[1]}`,
      minWidth: '120px',
      conditionalCellStyles: [
        {
          when: row => row,
          classNames: ['break-word']
        }
      ]
    },
    {
      name: 'Status',
      sortable: false,
      cell: row => {
        const status = row?.status

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
            color={chipStatus[status?.toLowerCase()]?.color}
            label={chipStatus[status?.toLowerCase()]?.label}
          />
        )
      }
    }
  ]
}

export const vehicle_rows = [
  {
    account: 'Amjad',
    name: '769IJA',
    status: 'moving',
    power_voltage: 'on',
    lube_oil_level: 'N/A',
    date: '2021-05-01T12:30:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#2FC17E',
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
    name: '769IJA AF',
    lube_oil_level: 'N/A',
    account: 'Amjad',
    power_voltage: 'on',
    status: 'stopped',
    date: '2020-01-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#FC3B61',
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
    name: '769IJA XA',
    status: 'idle',
    lube_oil_level: 'N/A',
    account: 'Amjad',
    power_voltage: 'on',
    date: '2022-08-01T12:45:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#FF8B00',
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
    name: '469IJA GH',
    lube_oil_level: 'N/A',
    account: 'Amjad',
    power_voltage: 'on',
    status: 'stopped',
    date: '2022-08-01T12:45:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#FC3B61',
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
    name: '122JI AH',
    status: 'moving',
    lube_oil_level: 'N/A',
    account: 'Amjad',
    power_voltage: 'on',
    date: '2022-08-01T12:45:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#2FC17E',
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
    name: '122JI WA',
    status: 'moving',
    lube_oil_level: 'N/A',
    account: 'Amjad',
    power_voltage: 'on',
    date: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#2FC17E',
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
    name: '122JI WA',
    status: 'stopped',
    lube_oil_level: 'N/A',
    account: 'Amjad',
    power_voltage: 'on',
    date: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#FC3B61',
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
    name: '122JI WA',
    status: 'idle',
    lube_oil_level: 'N/A',
    account: 'Amjad',
    power_voltage: 'on',
    date: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#FF8B00',
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
    name: '122JI WA',
    status: 'idle',
    lube_oil_level: 'N/A',
    account: 'Amjad',
    power_voltage: 'on',
    date: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#FF8B00',
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
    name: '122JI WA',
    status: 'stopped',
    lube_oil_level: 'N/A',
    account: 'Amjad',
    power_voltage: 'on',
    date: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#FC3B61',
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
    name: '122JI WA',
    status: 'stopped',
    lube_oil_level: 'N/A',
    account: 'Amjad',
    power_voltage: 'on',
    date: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#FC3B61',
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
    name: '122JI WA',
    status: 'moving',
    lube_oil_level: 'N/A',
    account: 'Amjad',
    power_voltage: 'on',
    date: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#2FC17E',
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
    name: '122JI WA',
    status: 'moving',
    lube_oil_level: 'N/A',
    account: 'Amjad',
    power_voltage: 'on',
    date: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#2FC17E',
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
    name: '122JI WA',
    lube_oil_level: 'N/A',
    account: 'Amjad',
    power_voltage: 'on',
    status: 'stopped',
    date: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#FC3B61',
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
