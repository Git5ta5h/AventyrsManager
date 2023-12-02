import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  typography: {
      h1: {
        fontSize: 27,
        color: '#1D2026',
        fontFamily: 'Kumbh Sans'
    },
    h2: {
      fontSize: 20,
      color: '#A45C40',
      fontFamily: 'Kumbh Sans',
      fontWeight: 900
    },
    h3: {
      fontSize: 17,
      color: '#69707D',
      fontFamily: 'Kumbh Sans'
    },
    h4: {
      fontSize: 15,
      color: '#69707D',
      fontWeight: 900,
      fontFamily: 'Kumbh Sans'
    }
  }, 

    palette: {
      primary: {
        main: "#A45C40"
      }, 
    
      secondary: {
        main: "#9a9a9a"
      }

    },

    components: {
      MuiButton: {
        styleOverrides: {
          // Style for all buttons
          root: {
            fontFamily: 'Kumbh Sans',
          },
          // Style for buttons with the "customPrimary" class
          customPrimary: {
            color: (theme) => theme.palette.primary.main,
            // Add any additional styles for these buttons
          },
          customAdditional: {
            color: (theme) => theme.palette.secondary.main
          }
        },
      },
    },
  
})

export default theme;