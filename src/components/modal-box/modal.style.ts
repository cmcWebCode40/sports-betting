import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ITheme } from '../../themes/theme';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useStyles = (url: unknown) => {
  return makeStyles((theme: ITheme) =>
    createStyles({
      modal: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(
             to top,
              rgba(0,0,0, 0),
            rgba(30, 104, 192, 2)
            ),url(${url})`,
        backgroundSize: 'cover',
        border: 'none',
        outline: 'none !important',
        zIndex: -2,
      },
      appBar: {
        borderBottom: `2px ${theme.palette.white} solid`,
      },
    }),
  );
};
