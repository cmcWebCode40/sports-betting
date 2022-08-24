import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { createStyles, makeStyles } from '@material-ui/core';
import { ReactComponent as SportsBasketballIcon } from '../../assets/icons/icon_Basketball.svg';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: '32px 0px',
    },
  }),
);

const BettingToolGames = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SvgIcon component={SportsBasketballIcon} />
    </div>
  );
};

export default BettingToolGames;
