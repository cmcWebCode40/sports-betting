import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, useMediaQuery } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ITheme } from '../../../themes/theme';
import SelectPanel from './select-panel';
import { TMatches } from '../../../models/leagues.model';
import { ClubLogo } from '../../../components';
import { mdTabletView } from '../../../themes/theme.constants';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      padding: '18px 20px 20px',
      backgroundColor: theme.palette.veryLightPink.main,
    },
    teamLeague: {
      margin: '27px 39px 39px 25px',
      fontSize: '16px',
      fontWeight: 600,
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
    },
    teamScore: {
      '&>*': {
        margin: theme.spacing(1, 1.1),
      },
    },
    status: {
      fontSize: '17px',
      fontWeight: 600,
      margin: '13px 0px',
      color: theme.palette.paleRed.main,
    },
    playedTime: {
      fontSize: '17px',
      fontWeight: 600,
      color: theme.palette.brownGrey.main,
      [theme.breakpoints.down('md')]: {
        fontSize: '14px',
        // fontSize: theme.typography.h5.fontSize,
      },
    },
    header: {},
    link: {
      textDecoration: 'none',
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
    teamName: {
      fontSize: theme.typography.h3.fontSize,
      fontWeight: 600,
      color: '#4a4a4a',
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.h5.fontSize,
      },
    },
    score: {
      [theme.breakpoints.down('md')]: {
        fontSize: '14px',
        // fontSize: theme.typography.h5.fontSize,
      },
    },
  }),
);

interface IDetailsHeader {
  match: TMatches;
  loading: boolean;
}

const DetailsHeader = ({ match, loading }: IDetailsHeader): JSX.Element => {
  const classes = useStyles();
  const mobileView = useMediaQuery(`(max-width:${mdTabletView})`);
  const [score, setScore] = useState({
    homeScore: '',
    awayScore: '',
  });

  const teamLogoStyles = {
    width: !mobileView ? '97.3px' : '24px',
    height: !mobileView ? '100px' : '24px',
  };

  useEffect(() => {
    if (match.status) {
      const scores = match.status.replace(':', ' ').split(' ');
      setScore({
        homeScore: scores[0],
        awayScore: scores[1],
      });
    }
  }, [match]);

  if (loading) {
    return <div className={classes.root} />;
  }

  return (
    <div className={classes.root}>
      <Box display="flex" className={classes.header}>
        <SelectPanel match={match} />
      </Box>
      <Box display="flex" className={classes.teamTitle}>
        <ClubLogo styles={teamLogoStyles} src={match.homeLogo} />
        <div>
          <Box display="flex" className={classes.teamScore} alignItems="center">
            <Link className={classes.link} to="##standing">
              <Typography className={classes.teamName} variant="h3" component="h6">
                {match.home}
              </Typography>
            </Link>
            <Typography className={classes.score} variant="h3" component="h6">
              {score.homeScore}
            </Typography>
            <Typography variant="h3" component="h6">
              -
            </Typography>
            <Typography className={classes.score} variant="h3" component="h6">
              {score.awayScore}
            </Typography>
            <Link className={classes.link} to="##standing">
              <Typography className={classes.teamName} variant="h3" component="h6">
                {match.away}
              </Typography>
            </Link>
          </Box>

          <Typography className={classes.playedTime} align="center" variant="h5" component="h6">
            {match.hour}
          </Typography>
        </div>
        <ClubLogo styles={teamLogoStyles} src={match.awayLogo} />
      </Box>
    </div>
  );
};

export default DetailsHeader;
