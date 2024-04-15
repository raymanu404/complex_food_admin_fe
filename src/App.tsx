import { ThemeProvider } from '@emotion/react'
import './App.css'
import { theme } from './theme'
import { StyledEngineProvider } from '@mui/material'
import Router from './router/Router'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <Router />
      </StyledEngineProvider>
    </ThemeProvider>
  )
}

export default App
