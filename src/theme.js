import { createTheme } from '@mui/material'
import { pink } from '@mui/material/colors'


const theme = createTheme({
    typography: {
        useNextVariants: true,
      },
      palette: {
        primary: {
        light: '#8e8e8e',
        main: '#616161',
        dark: '#373737',
        contrastText: '#fffde7',
      },
      secondary: {
        light: '#ffad42',
        main: '#f57c00',
        dark: '#bb4d00',
        contrastText: '#fffde7',
      },
        openTitle: '#455a64',
        protectedTitle: '#f57c00',
        type: 'light'
      }
})

export default theme;