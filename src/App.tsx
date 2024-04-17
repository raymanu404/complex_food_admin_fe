import { ThemeProvider } from '@emotion/react'
import { theme } from './theme'
import { StyledEngineProvider } from '@mui/material'
import Router from './router/Router'
import { ApplicationContextProvider } from './contexts/ApplicationContext'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <ApplicationContextProvider>
          <Router />
        </ApplicationContextProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  )
}

export default App
