import { ThemeProvider } from '@emotion/react'
import { theme } from './theme'
import { StyledEngineProvider } from '@mui/material'
import Router from './router/Router'
import { ApplicationContextProvider } from './contexts/ApplicationContext'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './common/config/application_config'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <QueryClientProvider client={queryClient}>
          <ApplicationContextProvider>
            <Router />
          </ApplicationContextProvider>
        </QueryClientProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  )
}

export default App
