import { ThemeProvider } from '@mui/material'
import { customTheme } from './utilities/theme'
import 'normalize.css'
import UserLayout from './components/layout'
import { FC } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { HotelProvider } from './context/hotelContext'

const App: FC<Props> = (props) => {
  return (
    <ThemeProvider theme={customTheme}>
      <HotelProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <UserLayout>
            {props.children}
          </UserLayout>
        </LocalizationProvider>
      </HotelProvider>
    </ThemeProvider>
  )
}

interface Props {
  children?: React.ReactNode | string
}

export default App
