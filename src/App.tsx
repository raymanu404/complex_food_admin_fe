import { ThemeProvider } from '@emotion/react'
import './App.css'
import { theme } from './theme'
import { Home } from './pages/Home/Home'
import { StyledEngineProvider } from '@mui/material'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        {/* use for now this compo, should be router */}
        <Home />
      </StyledEngineProvider>
    </ThemeProvider>
  )
}

export default App
