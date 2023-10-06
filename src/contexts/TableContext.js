import { createContext, useContext, useState } from 'react'

export const TableUIContext = createContext()

export const TableContext = props => {
  const [tableData, setTableData] = useState(false)
  const [tableHeight, setTableHeight] = useState('')

  const showTableData = () => {
    setTableData(true)
  }

  const hideTableData = () => {
    setTableData(false)
  }

  const getTableHeight = tableH => {
    setTableHeight(tableH?.current?.offsetHeight)
  }

  return (
    <TableUIContext.Provider
      value={{
        tableData,
        showTableData,
        hideTableData,
        getTableHeight,
        tableHeight
      }}
    >
      {props.children}
    </TableUIContext.Provider>
  )
}
