import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import LogoIcon from '../../assets/icons/oddsbug_logotype-01.svg';
import { ITheme } from '../../themes/theme';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      background: theme.palette.primary.light,
      height: '100vh',
    },
  }),
);

export default function FallBack(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className="loading_container">
        <div className="loading" />
        <img src={LogoIcon} height="50" alt="company" />
      </div>
    </div>
  );
}
