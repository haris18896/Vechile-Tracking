import { createContext, useContext, useState } from 'react'

export const MainUIContext = createContext()

export const MainContext = props => {
  const [sidebarHover, setSidebarHover] = useState(true)

  const sidebarToggle = hoverVal => {
    setSidebarHover(hoverVal)
  }
  
  return (
    <MainUIContext.Provider
      value={{
        sidebarHover,
        sidebarToggle
      }}
    >
      {props.children}
    </MainUIContext.Provider>
  )
}
