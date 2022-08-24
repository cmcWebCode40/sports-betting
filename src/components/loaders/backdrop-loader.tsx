import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { ITheme } from '../../themes/theme';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    backdrop: {
      display: 'flex',
      justifyContent: 'center',
      flexFlow: 'column nowrap',
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.white,
      '& > *': {
        margin: theme.spacing(0.6, 0.2),
      },
    },
  }),
);

interface IBackDrop {
  message?: string;
  isOpened: boolean;
}

const BackDropLoader = ({ message, isOpened }: IBackDrop): JSX.Element => {
  const classes = useStyles();
  const [open] = React.useState(isOpened);

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress color="inherit" />
      <Typography>{message}</Typography>
    </Backdrop>
  );
};

BackDropLoader.defaultProps = {
  message: '',
};

export default BackDropLoader;
