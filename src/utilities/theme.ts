import { createTheme } from '@mui/material'

const theme = {
  color: {
    primary: '#727cf5',
    secondary: '#0acf97',
    success: '#0acf97',
    error: '#fa5c7c',
    warning: '#ffbc00',
    info: '#3095b2',
    light: '#eef2f7',
    dark: '#313a46',
    pageTitle: '#6c757d',
  },
  navbar: {
    menu: '#313a46',
  },
  breadcrumb: {
    icon: '#ced4da',
    item: '#adb5bd',
  },
  menu: {
    item: '#8391a2',
    hover: '#bccee4',
    active: '#ffffff',
  },
  bg: {
    sidebar: '#313a46',
    sidebar2: '#29313b',
    header: '#ffffff',
    body: '#f8f9fc',
    content: '#ffffff',
  },
}

export const customTheme = createTheme({
  spacing: 4,
  typography: {
    fontSize: 13,
    fontFamily: [
      '"Nunito"',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: 36,
      fontWeight: 'bold',
    },
    h2: {
      fontSize: 30,
      fontWeight: 'bold',
    },
    h3: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    h4: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    h5: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    h6: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    body2: {
      fontSize: 14,
    }
  },
  palette: {
    primary: {
      main: theme.color.primary,
      contrastText: '#ffffff',
    },
    secondary: {
      main: theme.color.secondary,
      contrastText: '#ffffff',
    },
    success: {
      main: theme.color.success,
      contrastText: '#ffffff',
    },
    error: {
      main: theme.color.error,
      contrastText: '#ffffff',
    },
    warning: {
      main: theme.color.warning,
      contrastText: '#ffffff',
    },
    info: {
      main: theme.color.info,
      contrastText: '#ffffff',
    },
  },
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            fontWeight: 'bold',
          }
        }
      }
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          cursor: 'default',
          paddingLeft: 30,
          paddingRight: 30,
          backgroundColor: 'transparent',
          color: theme.menu.item,
          textTransform: 'uppercase',
          fontSize: 11,
          letterSpacing: '.05em',
          fontWeight: 700,
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          paddingLeft: 30,
          paddingRight: 30,
          transition: 'all .4s',
          '&:hover': {
            backgroundColor: theme.bg.sidebar,
            color: theme.menu.hover,
          },
          '&.active': {
            color: theme.menu.active
          },
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 30,
          color: 'inherit',
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: '100%',
        }
      }
    }
  },
})

export default theme