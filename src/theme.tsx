import { createTheme } from '@mui/material'

interface ICustomPalette {
  //add more props here
  primary: {
    main: string
    lightest: string
    light: string
    dark: string
    darkest: string
  }
  utility: {
    black: string
    white: string
    warning: string
    background: string
  }
}

declare module '@mui/material/styles/createTheme' {
  interface CustomThemeProps {
    customPalette: ICustomPalette
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Theme extends CustomThemeProps {}
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ThemeOptions extends CustomThemeProps {}
}

const theme = createTheme({
  //TODO: add more default styles for our components
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#2F86A6',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#2F86A6',
        },
      },
    },
  },
  customPalette: {
    //change with our colors/fonts etc
    primary: {
      main: '#2F86A6',
      lightest: 'rgba(47, 134, 166, .5)',
      light: 'rgba(47, 134, 166, .8)',
      dark: '#00948D',
      darkest: '#006661',
    },
    utility: {
      warning: '#ED6C02',
      black: '#000000',
      white: '#FFFFFF',
      background: '#D6EAF8',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
})

export { theme }
