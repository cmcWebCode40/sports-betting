import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ITheme } from '../../themes/theme';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: theme.spacing(1),
    },
  }),
);
interface ICustomLoader {
  styles?: React.CSSProperties;
}
export const CustomLoader = ({ styles }: ICustomLoader): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.root} style={styles}>
      <CircularProgress />
    </div>
  );
};

export default CustomLoader;
