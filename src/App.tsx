import { ThemeProvider } from '@emotion/react'
import { theme } from './theme'
import { StyledEngineProvider } from '@mui/material/styles'
import Router from './router/Router'
import { ApplicationContextProvider } from './contexts/ApplicationContext'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './common/config/application_config'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AuthContextProvider } from './contexts/AuthContext'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <ApplicationContextProvider>
              <AuthContextProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Router />
                </LocalizationProvider>
              </AuthContextProvider>
            </ApplicationContextProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </StyledEngineProvider>
    </ThemeProvider>
  )
}

export default App
