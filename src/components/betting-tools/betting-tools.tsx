import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import { ITheme } from '../../themes/theme';
import OddViewType from './odd-view-type';
import BettingToolMatches from './betting-tool-matches';
import BettingToolGames from './betting-tool-games';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      // margin: '33px 20px 35px 35px',
      width: '570px',
      margin: theme.spacing(3, 2),
      padding: '20px 20px 21px 19px',
      backgroundColor: theme.palette.veryLightPink.main,
    },
    header: {
      height: '40px',
      margin: '0 0 19px 1px',
      padding: '10px 20px 8px 19px',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.white,
      justifyContent: 'space-between',
    },
    title: {
      fontSize: theme.typography.subtitle1.fontSize,
      fontWeight: 600,
      color: theme.palette.primary.main,
    },
    box: {
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
        '&> *': {
          margin: theme.spacing(0.3, 0, 0, 0),
        },
      },
    },
    link: {
      fontSize: theme.typography.h5.fontSize,
      fontWeight: 600,
      textAlign: 'right',
      color: theme.palette.grayishBrown.main,
      textDecoration: 'none',
    },
  }),
);

interface IBettingTools {
  view?: string;
  title: string;
}

const BettingTools = ({ view, title }: IBettingTools): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box display="flex" className={classes.header}>
        <Typography className={classes.title} variant="h6">
          {title}
        </Typography>
        <Link className={classes.link} to={`/betting-tools-dashboard/${title}`}>
          see all
        </Link>
      </Box>
      {[1, 2, 3].map((item) => (
        <Box className={classes.box} display="flex" key={item}>
          <BettingToolMatches />
          <OddViewType view={view} />
          <BettingToolGames />
        </Box>
      ))}
    </div>
  );
};

export default BettingTools;
