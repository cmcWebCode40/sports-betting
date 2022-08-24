import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

export interface IPaletteColor {
  main: string;
}

const customPalette = {
  paleRed: { main: '#db504a' },
  nastyGreen: { main: '#6fb548' },
  mediumGrey: { main: '#747b78' },
  brownGrey: { main: '#9b9b9b' },
  oceanGreen: { main: '#369074' },
  greenishBrown: { main: '#4a4a4a' },
  veryLightPink: { main: '#f0f0f0' },
  charcoalGrey70: { main: '#2f353d' },
  facebookBlue: { main: '#415dae' },
  grayishBrown: { main: '#4a4a4a' },
};

export default {
  black,
  white,
  ...customPalette,
  primary: {
    main: '#1e68c0',
    light: 'linear-gradient(to right,#1e68c0 12%, #2b7d98 59%, #369074 100%)',
  },
  secondary: {
    main: white,
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400],
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400],
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400],
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  test: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600],
  },
  background: {
    default: white,
    text: '#ccc',
    paper: white,
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200],
};
