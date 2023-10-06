// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import { chipStatus } from 'src/components/states/chips'

// ** Icon import
import { Icon } from '@iconify/react'

export const columns = () => {
  return [
    {
      name: 'Asset Name',
      sortable: true,
      selector: row => row.name
    },
    {
      name: 'Date/Time',
      sortable: true,
      selector: row => `${row.date.split('T')[0]}\n${row.date.split('T')[1]}`
    },
    {
      name: 'Command Sent',
      sortable: true,
      selector: row => row.command
    },
    {
      name: 'Input Sent',
      sortable: true,
      selector: row => row.input
    },
    {
      name: 'Reply String',
      sortable: true,
      selector: row => row.reply_string
    },
    {
      name: 'Did the device recieved the command?',
      sortable: true,
      selector: row => row.device
    },
    {
      name: 'User',
      sortable: true,
      selector: row => row.user
    },
  ]
}

export const rows = [
  {
    name: '769IJA',
    command: 'sent',
    input: 'pending',
    reply_string: 'N/A',
    device: 'N/A',
    date: '2021-05-01T12:00:00',
    user: "Shoaib",
  },
  {
    name: '769IJA',
    command: 'sent',
    input: 'pending',
    reply_string: 'N/A',
    device: 'N/A',
    date: '2021-05-01T12:00:00',
    user: "Shoaib",
  },
  {
    name: '769IJA',
    command: 'sent',
    input: 'pending',
    reply_string: 'N/A',
    device: 'N/A',
    date: '2021-05-01T12:00:00',
    user: "Shoaib",
  },
  {
    name: '769IJA',
    command: 'sent',
    input: 'pending',
    reply_string: 'N/A',
    device: 'N/A',
    date: '2021-05-01T12:00:00',
    user: "Shoaib",
  },
  {
    name: '769IJA',
    command: 'sent',
    input: 'pending',
    reply_string: 'N/A',
    device: 'N/A',
    date: '2021-05-01T12:00:00',
    user: "Shoaib",
  },
  {
    name: '769IJA',
    command: 'sent',
    input: 'pending',
    reply_string: 'N/A',
    device: 'N/A',
    date: '2021-05-01T12:00:00',
    user: "Shoaib",
  },
  {
    name: '769IJA',
    command: 'sent',
    input: 'pending',
    reply_string: 'N/A',
    device: 'N/A',
    date: '2021-05-01T12:00:00',
    user: "Shoaib",
  },
  {
    name: '769IJA',
    command: 'sent',
    input: 'pending',
    reply_string: 'N/A',
    device: 'N/A',
    date: '2021-05-01T12:00:00',
    user: "Shoaib",
  },
  {
    name: '769IJA',
    command: 'sent',
    input: 'pending',
    reply_string: 'N/A',
    device: 'N/A',
    date: '2021-05-01T12:00:00',
    user: "Shoaib",
  },
  {
    name: '769IJA',
    command: 'sent',
    input: 'pending',
    reply_string: 'N/A',
    device: 'N/A',
    date: '2021-05-01T12:00:00',
    user: "Shoaib",
  },
  {
    name: '769IJA',
    command: 'sent',
    input: 'pending',
    reply_string: 'N/A',
    device: 'N/A',
    date: '2021-05-01T12:00:00',
    user: "Shoaib",
  },
  {
    name: '769IJA',
    command: 'sent',
    input: 'pending',
    reply_string: 'N/A',
    device: 'N/A',
    date: '2021-05-01T12:00:00',
    user: "Shoaib",
  },
  {
    name: '769IJA',
    command: 'sent',
    input: 'pending',
    reply_string: 'N/A',
    device: 'N/A',
    date: '2021-05-01T12:00:00',
    user: "Shoaib",
  },
  {
    name: '769IJA',
    command: 'sent',
    input: 'pending',
    reply_string: 'N/A',
    device: 'N/A',
    date: '2021-05-01T12:00:00',
    user: "Shoaib",
  },
  {
    name: '769IJA',
    command: 'sent',
    input: 'pending',
    reply_string: 'N/A',
    device: 'N/A',
    date: '2021-05-01T12:00:00',
    user: "Shoaib",
  },
  {
    name: '769IJA',
    command: 'sent',
    input: 'pending',
    reply_string: 'N/A',
    device: 'N/A',
    date: '2021-05-01T12:00:00',
    user: "Shoaib",
  },
]
