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
    lightOrange: string
    warning: string
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
  },
  customPalette: {
    //change with our colors/fonts etc
    primary: {
      main: '#00B2AA',
      lightest: '#D3EEED',
      light: '#5ACEC8',
      dark: '#00948D',
      darkest: '#006661',
    },
    utility: {
      lightOrange: '#FDF0E6',
      warning: '#ED6C02',
    },
  },
})

export { theme }
