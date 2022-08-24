import palette from './palette';
// import { mdTabletView, smMobileView } from './theme.constants';

const customTextStyles = {
  style17: {
    fontSize: '17px',
  },
  style18: {
    fontSize: '17px',
  },
  style15: {
    fontSize: '15px',
  },
  style13: {
    fontSize: '13px',
  },
};

export default {
  fontFamily: ['Roboto', 'sans-serif'].join(','),
  textDecoration: 'none',
  fontStretch: 'normal',
  fontStyle: 'normal',
  lineHeight: 'normal',
  letterSpacing: 'normal',
  ...customTextStyles,
  h1: {
    color: palette.brownGrey.main,
    fontWeight: 500,
    fontSize: '35px',
    letterSpacing: '-0.24px',
    lineHeight: '40px',
    '@media (max-width:767px)': {
      fontSize: '1rem',
    },
  },
  h2: {
    color: palette.brownGrey.main,
    fontWeight: 500,
    fontSize: '29px',
    letterSpacing: '-0.24px',
    lineHeight: '32px',
  },
  h3: {
    color: palette.brownGrey.main,
    fontWeight: 500,
    fontSize: '24px',
    letterSpacing: '-0.06px',
  },
  h4: {
    color: palette.brownGrey.main,
    fontWeight: 500,
    fontSize: '21px',
    letterSpacing: '-0.06px',
    lineHeight: '24px',
  },
  h5: {
    color: palette.brownGrey.main,
    fontWeight: 500,
    fontSize: '16px',
    letterSpacing: '-0.05px',
    lineHeight: '20px',
  },
  h6: {
    color: palette.brownGrey.main,
    fontWeight: 500,
    // fontSize: isMobile ? '10px' : '35px',
    fontSize: '14px',
    letterSpacing: '-0.05px',
    lineHeight: '20px',
  },
  subtitle1: {
    color: palette.brownGrey.main,
    fontSize: '17px',
    letterSpacing: '-0.05px',
    lineHeight: '25px',
  },
  subtitle2: {
    color: palette.brownGrey.main,
    fontWeight: 400,
    fontSize: '15px',
    letterSpacing: '-0.05px',
    lineHeight: '21px',
  },
  body1: {
    color: palette.brownGrey.main,
    fontSize: '16px',
    letterSpacing: '-0.05px',
    lineHeight: '21px',
  },
  body2: {
    color: palette.brownGrey.main,
    fontSize: '12px',
    letterSpacing: '-0.04px',
    lineHeight: '18px',
  },
  button: {
    color: palette.brownGrey.main,
    fontSize: '14px',
  },
  caption: {
    color: palette.brownGrey.main,
    fontSize: '13px',
    letterSpacing: '0.33px',
    lineHeight: '13px',
  },
  overline: {
    color: palette.brownGrey.main,
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.33px',
    lineHeight: '13px',
    textTransform: 'uppercase',
  },
};
