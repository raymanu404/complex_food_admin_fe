import { ThemeProvider } from '@emotion/react'
import { theme } from './theme'
import { StyledEngineProvider } from '@mui/material'
import Router from './router/Router'
import { ApplicationContextProvider } from './contexts/ApplicationContext'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './common/config/application_config'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AuthContextProvider } from './contexts/AuthContext'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <ApplicationContextProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Router />
              </LocalizationProvider>
            </ApplicationContextProvider>
          </AuthContextProvider>
        </QueryClientProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  )
}

export default App
