// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import { chipStatus } from 'src/components/states/chips'

// ** Icon import
import { Icon } from '@iconify/react'

export const columns = () => {
  return [
    {
      name: 'Customer Name',
      sortable: true,
      selector: row => row.name
    },

    {
      name: 'Invoice No',
      sortable: true,
      selector: row => row.invoice_no
    },

    {
      name: 'Technician',
      sortable: true,
      selector: row => row.technician
    },

    {
      name: 'Technician Mobile',
      sortable: true,
      selector: row => row.technician_mobile
    },

    {
      name: 'Job',
      sortable: true,
      selector: row => row.job
    },

    {
      name: 'Delivery Time',
      sortable: true,
      selector: row => `${row.delivery_time.split('T')[0]}\n${row.delivery_time.split('T')[1]}`
    },

    {
      name: 'Delivery At',
      sortable: true,
      selector: row => `${row.delivery_at.split('T')[0]}\n${row.delivery_at.split('T')[1]}`
    },

    {
      name: 'Delivery Status',
      sortable: true,
      selector: row => row.delivery_status
    },

    {
      name: 'Feedback',
      sortable: true,
      selector: row => row.feedback
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
      name: 'Attached Image',
      sortable: true,
      selector: row => row.attachments
    }
  ]
}

export const rows = [
  {
    name: '769IJA',
    invoice_no: '74872DCWEQ123',
    technician: 'Available',
    technician_mobile: 'N/A',
    job: 'Full Time',
    delivery_time: '2021-05-01T12:00:00',
    delivery_at: '2021-05-01T12:00:00',
    delivery_status: 'pending',
    feedback: 'N/A',
    attachments: 'N/A',
    status: 'idle'
  },
  {
    name: '769IJA',
    invoice_no: '74872DCWEQ123',
    technician: 'Available',
    technician_mobile: 'N/A',
    job: 'Full Time',
    delivery_time: '2021-05-01T12:00:00',
    delivery_at: '2021-05-01T12:00:00',
    delivery_status: 'pending',
    feedback: 'N/A',
    attachments: 'N/A',
    status: 'idle'
  },
  {
    name: '769IJA',
    invoice_no: '74872DCWEQ123',
    technician: 'Available',
    technician_mobile: 'N/A',
    job: 'Full Time',
    delivery_time: '2021-05-01T12:00:00',
    delivery_at: '2021-05-01T12:00:00',
    delivery_status: 'pending',
    feedback: 'N/A',
    attachments: 'N/A',
    status: 'idle'
  },
  {
    name: '769IJA',
    invoice_no: '74872DCWEQ123',
    technician: 'Available',
    technician_mobile: 'N/A',
    job: 'Full Time',
    delivery_time: '2021-05-01T12:00:00',
    delivery_at: '2021-05-01T12:00:00',
    delivery_status: 'pending',
    feedback: 'N/A',
    attachments: 'N/A',
    status: 'idle'
  },
  {
    name: '769IJA',
    invoice_no: '74872DCWEQ123',
    technician: 'Available',
    technician_mobile: 'N/A',
    job: 'Full Time',
    delivery_time: '2021-05-01T12:00:00',
    delivery_at: '2021-05-01T12:00:00',
    delivery_status: 'pending',
    feedback: 'N/A',
    attachments: 'N/A',
    status: 'idle'
  },
  {
    name: '769IJA',
    invoice_no: '74872DCWEQ123',
    technician: 'Available',
    technician_mobile: 'N/A',
    job: 'Full Time',
    delivery_time: '2021-05-01T12:00:00',
    delivery_at: '2021-05-01T12:00:00',
    delivery_status: 'pending',
    feedback: 'N/A',
    attachments: 'N/A',
    status: 'idle'
  },
  {
    name: '769IJA',
    invoice_no: '74872DCWEQ123',
    technician: 'Available',
    technician_mobile: 'N/A',
    job: 'Full Time',
    delivery_time: '2021-05-01T12:00:00',
    delivery_at: '2021-05-01T12:00:00',
    delivery_status: 'pending',
    feedback: 'N/A',
    attachments: 'N/A',
    status: 'idle'
  },
  {
    name: '769IJA',
    invoice_no: '74872DCWEQ123',
    technician: 'Available',
    technician_mobile: 'N/A',
    job: 'Full Time',
    delivery_time: '2021-05-01T12:00:00',
    delivery_at: '2021-05-01T12:00:00',
    delivery_status: 'pending',
    feedback: 'N/A',
    attachments: 'N/A',
    status: 'idle'
  },
  {
    name: '769IJA',
    invoice_no: '74872DCWEQ123',
    technician: 'Available',
    technician_mobile: 'N/A',
    job: 'Full Time',
    delivery_time: '2021-05-01T12:00:00',
    delivery_at: '2021-05-01T12:00:00',
    delivery_status: 'pending',
    feedback: 'N/A',
    attachments: 'N/A',
    status: 'idle'
  },
  {
    name: '769IJA',
    invoice_no: '74872DCWEQ123',
    technician: 'Available',
    technician_mobile: 'N/A',
    job: 'Full Time',
    delivery_time: '2021-05-01T12:00:00',
    delivery_at: '2021-05-01T12:00:00',
    delivery_status: 'pending',
    feedback: 'N/A',
    attachments: 'N/A',
    status: 'idle'
  },
  {
    name: '769IJA',
    invoice_no: '74872DCWEQ123',
    technician: 'Available',
    technician_mobile: 'N/A',
    job: 'Full Time',
    delivery_time: '2021-05-01T12:00:00',
    delivery_at: '2021-05-01T12:00:00',
    delivery_status: 'pending',
    feedback: 'N/A',
    attachments: 'N/A',
    status: 'idle'
  },
  {
    name: '769IJA',
    invoice_no: '74872DCWEQ123',
    technician: 'Available',
    technician_mobile: 'N/A',
    job: 'Full Time',
    delivery_time: '2021-05-01T12:00:00',
    delivery_at: '2021-05-01T12:00:00',
    delivery_status: 'pending',
    feedback: 'N/A',
    attachments: 'N/A',
    status: 'idle'
  },
  {
    name: '769IJA',
    invoice_no: '74872DCWEQ123',
    technician: 'Available',
    technician_mobile: 'N/A',
    job: 'Full Time',
    delivery_time: '2021-05-01T12:00:00',
    delivery_at: '2021-05-01T12:00:00',
    delivery_status: 'pending',
    feedback: 'N/A',
    attachments: 'N/A',
    status: 'idle'
  }
]
