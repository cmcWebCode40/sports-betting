import { createMuiTheme, Theme, ThemeOptions } from '@material-ui/core/styles';
import { Palette } from '@material-ui/core/styles/createPalette';
import palette, { IPaletteColor } from './palette';
import shadows from './muiBoxShadows';
import typography from './typography';

// A custom theme for this app

interface IPalette extends Palette {
  white: string;
  black: string;
  paleRed: IPaletteColor;
  nastyGreen: IPaletteColor;
  mediumGrey: IPaletteColor;
  brownGrey: IPaletteColor;
  oceanGreen: IPaletteColor;
  greenishBrown: IPaletteColor;
  veryLightPink: IPaletteColor;
  charcoalGrey70: IPaletteColor;
  facebookBlue: IPaletteColor;
  grayishBrown: IPaletteColor;
}
export interface ITheme extends Theme {
  palette: IPalette;
}
interface IThemeOptions extends ThemeOptions {
  palette: IPalette;
}

const theme = createMuiTheme({
  palette,
  shape: {
    borderRadius: 4,
  },
  shadows,
  typography,
} as unknown as IThemeOptions);

export default theme;
