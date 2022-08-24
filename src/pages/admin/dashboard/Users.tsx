import React from 'react';
import {
  makeStyles,
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  createStyles,
} from '@material-ui/core';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import { ITheme } from '../../../themes/theme';

export const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      height: '100%',
    },
    content: {
      alignItems: 'center',
      display: 'flex',
    },
    title: {
      fontWeight: 700,
    },
    avatar: {
      backgroundColor: theme.palette.success.main,
      height: 56,
      width: 56,
    },
    icon: {
      height: 32,
      width: 32,
    },
    difference: {
      marginTop: theme.spacing(2),
      display: 'flex',
      alignItems: 'center',
    },
    differenceIcon: {
      color: theme.palette.success.main,
    },
    differenceValue: {
      color: theme.palette.success.main,
      marginRight: theme.spacing(1),
    },
  }),
);

const TotalUsers = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              TOTAL USERS
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PeopleIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <ArrowUpwardIcon className={classes.differenceIcon} />
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalUsers;
