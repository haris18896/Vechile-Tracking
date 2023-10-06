// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import { chipStatus } from 'src/components/states/chips'

// ** Icon import
import { Icon } from '@iconify/react'

export const columns = () => {
  return [
    {
      name: 'Username',
      sortable: true,
      selector: row => row.name
    },

    {
      name: 'Password',
      sortable: true,
      selector: row => row.password
    },

    {
      name: 'Login Datetime',
      sortable: true,
      selector: row => `${row.date.split('T')[0]}\n${row.date.split('T')[1]}`
    },

    {
      name: 'Login IP',
      sortable: true,
      selector: row => row.login_ip
    },

    {
      name: 'Login Location',
      sortable: true,
      selector: row => row.location
    },

    {
      name: 'Email ID',
      sortable: true,
      selector: row => row.email_id
    },

    {
      name: 'Contact No',
      sortable: true,
      selector: row => row.contact_no
    },
  ]
}

export const rows = [
  {
    name: '769IJA',
    password: 'password123',
    date: '2021-05-01T12:00:00',
    login_ip: 'AD1234ASD0-90978',
    location: 'King Fahad Road, Riyadh, Saudi Arabia',
    email_id: 'admin@gmail.com',
    contact_no: '0231880909'
  },
  {
    name: '769IJA',
    password: 'password123',
    date: '2021-05-01T12:00:00',
    login_ip: 'AD1234ASD0-90978',
    location: 'King Fahad Road, Riyadh, Saudi Arabia',
    email_id: 'admin@gmail.com',
    contact_no: '0231880909'
  },
  {
    name: '769IJA',
    password: 'password123',
    date: '2021-05-01T12:00:00',
    login_ip: 'AD1234ASD0-90978',
    location: 'King Fahad Road, Riyadh, Saudi Arabia',
    email_id: 'admin@gmail.com',
    contact_no: '0231880909'
  },
  {
    name: '769IJA',
    password: 'password123',
    date: '2021-05-01T12:00:00',
    login_ip: 'AD1234ASD0-90978',
    location: 'King Fahad Road, Riyadh, Saudi Arabia',
    email_id: 'admin@gmail.com',
    contact_no: '0231880909'
  },
  {
    name: '769IJA',
    password: 'password123',
    date: '2021-05-01T12:00:00',
    login_ip: 'AD1234ASD0-90978',
    location: 'King Fahad Road, Riyadh, Saudi Arabia',
    email_id: 'admin@gmail.com',
    contact_no: '0231880909'
  },
  {
    name: '769IJA',
    password: 'password123',
    date: '2021-05-01T12:00:00',
    login_ip: 'AD1234ASD0-90978',
    location: 'King Fahad Road, Riyadh, Saudi Arabia',
    email_id: 'admin@gmail.com',
    contact_no: '0231880909'
  },
  {
    name: '769IJA',
    password: 'password123',
    date: '2021-05-01T12:00:00',
    login_ip: 'AD1234ASD0-90978',
    location: 'King Fahad Road, Riyadh, Saudi Arabia',
    email_id: 'admin@gmail.com',
    contact_no: '0231880909'
  },
  {
    name: '769IJA',
    password: 'password123',
    date: '2021-05-01T12:00:00',
    login_ip: 'AD1234ASD0-90978',
    location: 'King Fahad Road, Riyadh, Saudi Arabia',
    email_id: 'admin@gmail.com',
    contact_no: '0231880909'
  },
  {
    name: '769IJA',
    password: 'password123',
    date: '2021-05-01T12:00:00',
    login_ip: 'AD1234ASD0-90978',
    location: 'King Fahad Road, Riyadh, Saudi Arabia',
    email_id: 'admin@gmail.com',
    contact_no: '0231880909'
  },
  {
    name: '769IJA',
    password: 'password123',
    date: '2021-05-01T12:00:00',
    login_ip: 'AD1234ASD0-90978',
    location: 'King Fahad Road, Riyadh, Saudi Arabia',
    email_id: 'admin@gmail.com',
    contact_no: '0231880909'
  },
  {
    name: '769IJA',
    password: 'password123',
    date: '2021-05-01T12:00:00',
    login_ip: 'AD1234ASD0-90978',
    location: 'King Fahad Road, Riyadh, Saudi Arabia',
    email_id: 'admin@gmail.com',
    contact_no: '0231880909'
  },
  {
    name: '769IJA',
    password: 'password123',
    date: '2021-05-01T12:00:00',
    login_ip: 'AD1234ASD0-90978',
    location: 'King Fahad Road, Riyadh, Saudi Arabia',
    email_id: 'admin@gmail.com',
    contact_no: '0231880909'
  },
  {
    name: '769IJA',
    password: 'password123',
    date: '2021-05-01T12:00:00',
    login_ip: 'AD1234ASD0-90978',
    location: 'King Fahad Road, Riyadh, Saudi Arabia',
    email_id: 'admin@gmail.com',
    contact_no: '0231880909'
  },
  {
    name: '769IJA',
    password: 'password123',
    date: '2021-05-01T12:00:00',
    login_ip: 'AD1234ASD0-90978',
    location: 'King Fahad Road, Riyadh, Saudi Arabia',
    email_id: 'admin@gmail.com',
    contact_no: '0231880909'
  },
  {
    name: '769IJA',
    password: 'password123',
    date: '2021-05-01T12:00:00',
    login_ip: 'AD1234ASD0-90978',
    location: 'King Fahad Road, Riyadh, Saudi Arabia',
    email_id: 'admin@gmail.com',
    contact_no: '0231880909'
  },
]
