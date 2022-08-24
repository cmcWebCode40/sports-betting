import React from 'react';
import { makeStyles, Grid, createStyles } from '@material-ui/core';

import TotalUsers from './Users';
import { ITheme } from '../../../themes/theme';

export const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      padding: theme.spacing(4),
    },
  }),
);

const Dashboard = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalUsers />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalUsers />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalUsers />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalUsers />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
