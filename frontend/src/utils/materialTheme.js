const blue = {
  50: '#e1f5fd',
  100: '#b3e5fb',
  200: '#82d4f8',
  300: '#52c3f4',
  400: '#30b5f2',
  500: '#15a9f0',
  600: '#129be1',
  700: '#0e88cd',
  800: '#0c77b9',
  900: '#075797',
  A100: '#bed9ff',
  A200: '#8bbbff',
  A400: '#589dff',
  A700: '#3f8eff',
  'contrastDefaultColor': 'light'
};

const green = {
  50: '#e5f6e9',
  100: '#c2e8c9',
  200: '#99d9a7',
  300: '#6dcb84',
  400: '#48c069',
  500: '#12b44e',
  600: '#00a545',
  700: '#009339',
  800: '#00822e',
  900: '#006219',
  A100: '#a7ffb6',
  A200: '#74ff8d',
  A400: '#41ff63',
  A700: '#27ff4e',
  'contrastDefaultColor': 'light'
};

export default {
  palette: {
    primary: {
      light: blue[600],
      main: blue[800],// #0c77b9
      dark: blue[900]
    },
    secondary: {
      light: green[300],
      main: green[500],// #12b44e
      dark: green[700]
    }
  },
  status: {
    danger: 'orange'
  },
  typography: {
    button: {
      fontWeight: 400,
      textAlign: 'capitalize'
    }
  }
};
