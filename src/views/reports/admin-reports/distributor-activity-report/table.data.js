// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import { chipStatus } from 'src/components/states/chips'

// ** Icon import
import { Icon } from '@iconify/react'

export const columns = () => {
  return [
    {
      name: 'Account Name',
      sortable: true,
      selector: row => row.acc_name
    },

    {
      name: 'Asset Name',
      sortable: true,
      selector: row => row.asset_name
    },

    {
      name: 'Activity',
      sortable: true,
      selector: row => row.activity
    },

    {
      name: 'Driver',
      sortable: true,
      selector: row => row.driver
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
            color={chipStatus[status]?.color}
            label={row.status}
          />
        )
      }
    },

    {
      name: 'Registered At',
      sortable: true,
      selector: row => row.reg_at
    },

    {
      name: 'Registered By',
      sortable: true,
      selector: row => row.reg_by
    },

    {
      name: 'Registered By IP',
      sortable: true,
      selector: row => row.reg_by_ip
    },

    {
      name: 'Updated At',
      sortable: true,
      selector: row => row.updated_at
    },

    {
      name: 'Updated By',
      sortable: true,
      selector: row => row.updated_by
    },

    {
      name: 'Updated By IP',
      sortable: true,
      selector: row => row.updated_by_ip
    },

    {
      name: 'Deleted At',
      sortable: true,
      selector: row => row.deleted_at
    },

    {
      name: 'Deleted By',
      sortable: true,
      selector: row => row.deleted_by
    },

    {
      name: 'Deleted By IP',
      sortable: true,
      selector: row => row.deleted_by_ip
    }
  ]
}

export const rows = [
  {
    acc_name: '769IJA',
    asset_name: 'N/A',
    activity: 'Distribution',
    driver: 'Available',
    status: 'idle',
    reg_at: '2021-05-01T12:00:00',
    reg_by: '2021-05-01T12:00:00',
    reg_by_ip: '2021-02-01T12:00:00',
    updated_at: '2021-03-01T12:00:00',
    updated_by: '2021-08-01T12:00:00',
    updated_by_ip: '2021-05-01T12:00:00',
    deleted_at: '2020-05-01T12:00:00',
    deleted_by: '2020-05-01T12:00:00',
    deleted_by_ip: '2020-05-01T12:00:00'
  },
  {
    acc_name: '769IJA',
    asset_name: 'N/A',
    activity: 'Distribution',
    driver: 'Available',
    status: 'driving',
    reg_at: '2021-05-01T12:00:00',
    reg_by: '2021-05-01T12:00:00',
    reg_by_ip: '2021-02-01T12:00:00',
    updated_at: '2021-03-01T12:00:00',
    updated_by: '2021-08-01T12:00:00',
    updated_by_ip: '2021-05-01T12:00:00',
    deleted_at: '2020-05-01T12:00:00',
    deleted_by: '2020-05-01T12:00:00',
    deleted_by_ip: '2020-05-01T12:00:00'
  },
  {
    acc_name: '769IJA',
    asset_name: 'N/A',
    activity: 'Distribution',
    driver: 'Available',
    status: 'stopped',
    reg_at: '2021-05-01T12:00:00',
    reg_by: '2021-05-01T12:00:00',
    reg_by_ip: '2021-02-01T12:00:00',
    updated_at: '2021-03-01T12:00:00',
    updated_by: '2021-08-01T12:00:00',
    updated_by_ip: '2021-05-01T12:00:00',
    deleted_at: '2020-05-01T12:00:00',
    deleted_by: '2020-05-01T12:00:00',
    deleted_by_ip: '2020-05-01T12:00:00'
  },
  {
    acc_name: '769IJA',
    asset_name: 'N/A',
    activity: 'Distribution',
    driver: 'Available',
    status: 'stopped',
    reg_at: '2021-05-01T12:00:00',
    reg_by: '2021-05-01T12:00:00',
    reg_by_ip: '2021-02-01T12:00:00',
    updated_at: '2021-03-01T12:00:00',
    updated_by: '2021-08-01T12:00:00',
    updated_by_ip: '2021-05-01T12:00:00',
    deleted_at: '2020-05-01T12:00:00',
    deleted_by: '2020-05-01T12:00:00',
    deleted_by_ip: '2020-05-01T12:00:00'
  },
  {
    acc_name: '769IJA',
    asset_name: 'N/A',
    activity: 'Distribution',
    driver: 'Available',
    status: 'driving',
    reg_at: '2021-05-01T12:00:00',
    reg_by: '2021-05-01T12:00:00',
    reg_by_ip: '2021-02-01T12:00:00',
    updated_at: '2021-03-01T12:00:00',
    updated_by: '2021-08-01T12:00:00',
    updated_by_ip: '2021-05-01T12:00:00',
    deleted_at: '2020-05-01T12:00:00',
    deleted_by: '2020-05-01T12:00:00',
    deleted_by_ip: '2020-05-01T12:00:00'
  },
  {
    acc_name: '769IJA',
    asset_name: 'N/A',
    activity: 'Distribution',
    driver: 'Available',
    status: 'driving',
    reg_at: '2021-05-01T12:00:00',
    reg_by: '2021-05-01T12:00:00',
    reg_by_ip: '2021-02-01T12:00:00',
    updated_at: '2021-03-01T12:00:00',
    updated_by: '2021-08-01T12:00:00',
    updated_by_ip: '2021-05-01T12:00:00',
    deleted_at: '2020-05-01T12:00:00',
    deleted_by: '2020-05-01T12:00:00',
    deleted_by_ip: '2020-05-01T12:00:00'
  },
  {
    acc_name: '769IJA',
    asset_name: 'N/A',
    activity: 'Distribution',
    driver: 'Available',
    status: 'active',
    reg_at: '2021-05-01T12:00:00',
    reg_by: '2021-05-01T12:00:00',
    reg_by_ip: '2021-02-01T12:00:00',
    updated_at: '2021-03-01T12:00:00',
    updated_by: '2021-08-01T12:00:00',
    updated_by_ip: '2021-05-01T12:00:00',
    deleted_at: '2020-05-01T12:00:00',
    deleted_by: '2020-05-01T12:00:00',
    deleted_by_ip: '2020-05-01T12:00:00'
  },
  {
    acc_name: '769IJA',
    asset_name: 'N/A',
    activity: 'Distribution',
    driver: 'Available',
    status: 'active',
    reg_at: '2021-05-01T12:00:00',
    reg_by: '2021-05-01T12:00:00',
    reg_by_ip: '2021-02-01T12:00:00',
    updated_at: '2021-03-01T12:00:00',
    updated_by: '2021-08-01T12:00:00',
    updated_by_ip: '2021-05-01T12:00:00',
    deleted_at: '2020-05-01T12:00:00',
    deleted_by: '2020-05-01T12:00:00',
    deleted_by_ip: '2020-05-01T12:00:00'
  },
  {
    acc_name: '769IJA',
    asset_name: 'N/A',
    activity: 'Distribution',
    driver: 'Available',
    status: 'idle',
    reg_at: '2021-05-01T12:00:00',
    reg_by: '2021-05-01T12:00:00',
    reg_by_ip: '2021-02-01T12:00:00',
    updated_at: '2021-03-01T12:00:00',
    updated_by: '2021-08-01T12:00:00',
    updated_by_ip: '2021-05-01T12:00:00',
    deleted_at: '2020-05-01T12:00:00',
    deleted_by: '2020-05-01T12:00:00',
    deleted_by_ip: '2020-05-01T12:00:00'
  },
  {
    acc_name: '769IJA',
    asset_name: 'N/A',
    activity: 'Distribution',
    driver: 'Available',
    status: 'idle',
    reg_at: '2021-05-01T12:00:00',
    reg_by: '2021-05-01T12:00:00',
    reg_by_ip: '2021-02-01T12:00:00',
    updated_at: '2021-03-01T12:00:00',
    updated_by: '2021-08-01T12:00:00',
    updated_by_ip: '2021-05-01T12:00:00',
    deleted_at: '2020-05-01T12:00:00',
    deleted_by: '2020-05-01T12:00:00',
    deleted_by_ip: '2020-05-01T12:00:00'
  },
  {
    acc_name: '769IJA',
    asset_name: 'N/A',
    activity: 'Distribution',
    driver: 'Available',
    status: 'stopped',
    reg_at: '2021-05-01T12:00:00',
    reg_by: '2021-05-01T12:00:00',
    reg_by_ip: '2021-02-01T12:00:00',
    updated_at: '2021-03-01T12:00:00',
    updated_by: '2021-08-01T12:00:00',
    updated_by_ip: '2021-05-01T12:00:00',
    deleted_at: '2020-05-01T12:00:00',
    deleted_by: '2020-05-01T12:00:00',
    deleted_by_ip: '2020-05-01T12:00:00'
  },
  {
    acc_name: '769IJA',
    asset_name: 'N/A',
    activity: 'Distribution',
    driver: 'Available',
    status: 'stopped',
    reg_at: '2021-05-01T12:00:00',
    reg_by: '2021-05-01T12:00:00',
    reg_by_ip: '2021-02-01T12:00:00',
    updated_at: '2021-03-01T12:00:00',
    updated_by: '2021-08-01T12:00:00',
    updated_by_ip: '2021-05-01T12:00:00',
    deleted_at: '2020-05-01T12:00:00',
    deleted_by: '2020-05-01T12:00:00',
    deleted_by_ip: '2020-05-01T12:00:00'
  },
  {
    acc_name: '769IJA',
    asset_name: 'N/A',
    activity: 'Distribution',
    driver: 'Available',
    status: 'idle',
    reg_at: '2021-05-01T12:00:00',
    reg_by: '2021-05-01T12:00:00',
    reg_by_ip: '2021-02-01T12:00:00',
    updated_at: '2021-03-01T12:00:00',
    updated_by: '2021-08-01T12:00:00',
    updated_by_ip: '2021-05-01T12:00:00',
    deleted_at: '2020-05-01T12:00:00',
    deleted_by: '2020-05-01T12:00:00',
    deleted_by_ip: '2020-05-01T12:00:00'
  },
  {
    acc_name: '769IJA',
    asset_name: 'N/A',
    activity: 'Distribution',
    driver: 'Available',
    status: 'active',
    reg_at: '2021-05-01T12:00:00',
    reg_by: '2021-05-01T12:00:00',
    reg_by_ip: '2021-02-01T12:00:00',
    updated_at: '2021-03-01T12:00:00',
    updated_by: '2021-08-01T12:00:00',
    updated_by_ip: '2021-05-01T12:00:00',
    deleted_at: '2020-05-01T12:00:00',
    deleted_by: '2020-05-01T12:00:00',
    deleted_by_ip: '2020-05-01T12:00:00'
  },
  {
    acc_name: '769IJA',
    asset_name: 'N/A',
    activity: 'Distribution',
    driver: 'Available',
    status: 'driving',
    reg_at: '2021-05-01T12:00:00',
    reg_by: '2021-05-01T12:00:00',
    reg_by_ip: '2021-02-01T12:00:00',
    updated_at: '2021-03-01T12:00:00',
    updated_by: '2021-08-01T12:00:00',
    updated_by_ip: '2021-05-01T12:00:00',
    deleted_at: '2020-05-01T12:00:00',
    deleted_by: '2020-05-01T12:00:00',
    deleted_by_ip: '2020-05-01T12:00:00'
  },
  {
    acc_name: '769IJA',
    asset_name: 'N/A',
    activity: 'Distribution',
    driver: 'Available',
    status: 'stopped',
    reg_at: '2021-05-01T12:00:00',
    reg_by: '2021-05-01T12:00:00',
    reg_by_ip: '2021-02-01T12:00:00',
    updated_at: '2021-03-01T12:00:00',
    updated_by: '2021-08-01T12:00:00',
    updated_by_ip: '2021-05-01T12:00:00',
    deleted_at: '2020-05-01T12:00:00',
    deleted_by: '2020-05-01T12:00:00',
    deleted_by_ip: '2020-05-01T12:00:00'
  },
  {
    acc_name: '769IJA',
    asset_name: 'N/A',
    activity: 'Distribution',
    driver: 'Available',
    status: 'stopped',
    reg_at: '2021-05-01T12:00:00',
    reg_by: '2021-05-01T12:00:00',
    reg_by_ip: '2021-02-01T12:00:00',
    updated_at: '2021-03-01T12:00:00',
    updated_by: '2021-08-01T12:00:00',
    updated_by_ip: '2021-05-01T12:00:00',
    deleted_at: '2020-05-01T12:00:00',
    deleted_by: '2020-05-01T12:00:00',
    deleted_by_ip: '2020-05-01T12:00:00'
  }
]
