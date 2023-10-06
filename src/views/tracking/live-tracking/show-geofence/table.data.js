export const columns = () => {
  return [
    {
      name: 'Name',
      sortable: true,
      selector: row => row.name,
      maxWidth: '120px'
    },

    {
      name: 'Address',
      sortable: true,
      selector: row => row.address,
      maxWidth: '320px',
      conditionalCellStyles: [
        {
          when: row => row,
          classNames: ['break-word', 'text-left']
        }
      ]
    }
  ]
}

export const rows = [
  {
    name: '769IJA',
    address: 'King Fahad Road, Riyadh, Saudi Arabia'
  }
]
