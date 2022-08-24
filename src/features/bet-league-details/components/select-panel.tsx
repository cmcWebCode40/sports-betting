import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core';
import { ITheme } from '../../../themes/theme';
import { TMatches } from '../../../models/leagues.model';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      [theme.breakpoints.down('md')]: {
        display: 'block',
        margin: theme.spacing(0, 'auto'),
      },
    },
    teamLeague: {
      margin: '27px 39px 39px 25px',
      fontSize: '16px',
      fontWeight: 600,
      textTransform: 'capitalize',
      color: theme.palette.greenishBrown.main,
      '&-highlighted': {
        fontSize: '16px',
        margin: '27px 39px 39px 25px',
        color: theme.palette.oceanGreen.main,
      },
    },
    teamTitle: {
      justifyContent: 'space-between',
    },
    teamImage: {
      width: '97.3px',
      height: '100px',
      background: '#ddd',
    },
    teamScore: {
      '&>*': {
        margin: theme.spacing(0.3, 1.1),
      },
    },
    status: {
      margin: '13px 0px',
      fontSize: '17px',
      fontWeight: 600,
      color: theme.palette.paleRed.main,
    },
    playedTime: {
      fontSize: '17px',
      fontWeight: 600,
      color: theme.palette.brownGrey.main,
    },
  }),
);

interface ISelectPanel {
  match?: TMatches;
}

const SelectPanel = ({ match }: ISelectPanel): JSX.Element => {
  const classes = useStyles();
  return (
    <Box display="flex" className={classes.root}>
      <Typography className={classes.teamLeague} variant="h4" component="h6">
        {`${match?.country} - ${match?.league}`}
      </Typography>
    </Box>
  );
};

export default SelectPanel;
