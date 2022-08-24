/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { createStyles, Grid, makeStyles, Link } from '@material-ui/core';

import { useTranslation } from 'react-i18next';
import { ITheme } from '../../../../themes/theme';
import { ILiveScore } from '../../../../models/leagues.model';
import { onAddMatch } from '../../../../provider/features/livescore';
import TimeZoneUtils, { truncateString } from '../../../../utils/common.helpers';
import { ClubLogo } from '../../../../components';
import { generateBetDetailsQueryUrl } from '../../../../logic/bets.logic';
import { useAppSelector } from '../../../../provider/hooks/hooks';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      flexBasis: '100%',
      [theme.breakpoints.down('sm')]: {
        flexBasis: '100%',
        '& > *': {
          margin: '0.2rem 0 ',
        },
      },
    },
    grid: {
      margin: '1rem 2rem',
      '& > *': {
        margin: '0.4rem 0rem ',
      },
      [theme.breakpoints.down('sm')]: {
        margin: '0',
        '& > *': {
          textAlign: 'center',
        },
      },
    },
    title: {
      height: '22px',
      fontSize: '17px',
      fontWeight: 600,
      // margin: '0 -1rem ',
      textAlign: 'center',
      color: theme.palette.nastyGreen.main,
      [theme.breakpoints.down('sm')]: {},
    },
    gameText: {
      fontSize: '1rem',
      color: theme.palette.grayishBrown.main,
    },
    scores: {
      // height: '19px',
      fontSize: '1rem',
      fontWeight: 600,
      textAlign: 'right',
      marginLeft: '20px',
      color: theme.palette.black,
      [theme.breakpoints.down('sm')]: {
        margin: 'auto',
      },
    },
    dashedLine: {
      width: '8px',
      height: '1px',
      margin: '13px 11px 8px',
    },
    link: {
      textDecoration: 'none !important',
      display: 'block',
    },
    button: {
      width: '10rem',
      minWidth: '10rem',
      margin: theme.spacing(0, 'auto'),
      color: theme.palette.grayishBrown.main,
      '&:hover': {
        color: theme.palette.oceanGreen.main,
        fontWeight: 600,
      },
    },
    scoreGrid: {
      margin: '0.3rem  -1.2rem  0 -1.2rem',
      [theme.breakpoints.down('sm')]: {
        margin: 'auto',
      },
    },
    gameTextGrid: {
      [theme.breakpoints.down('sm')]: {
        margin: 'auto',
      },
    },
  }),
);

type BetLeaguesProps = {
  data: ILiveScore;
};

const { convertTz } = TimeZoneUtils;

const BetLeaguesTitle = ({ data }: BetLeaguesProps): JSX.Element => {
  const classes = useStyles();
  const [score, setScore] = useState({
    homeScore: '',
    awayScore: '',
  });

  const { t } = useTranslation();
  // const gameTypes = ['Half-time', 'Full-time', 'Finished'];
  const dispatch = useDispatch();
  const {
    activeSport,
    timezone: { active: activeTz },
  } = useAppSelector((state) => state.bookmarkers);

  const addMatch = (item: any) => {
    const liveData = {
      ...item,
      score,
    };
    dispatch(onAddMatch(liveData));

    toast.success(t('common.live_match_added_text'), {
      toastId: '1',
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const setLeagueDetailUrl = (): string => {
    const queryParams = generateBetDetailsQueryUrl({
      country: data.country,
      name: data.league,
      date: new Date(),
      sport: activeSport.id,
      code: data.code,
    });
    return `/bet/soccer/premier?current_league=${queryParams}`;
  };

  useEffect(() => {
    if (data?.live?.score) {
      const scores = data.live.score.replace(':', ' ').split(' ');
      setScore({
        homeScore: scores[0],
        awayScore: scores[1],
      });
    }
  }, [data]);

  return (
    <>
      <div className={classes.root}>
        <Grid container className={classes.grid}>
          <Grid className={classes.scoreGrid} item sm={2} xs={12}>
            <Link className={classes.link} href={setLeagueDetailUrl()}>
              <span className={classes.title}>
                {data?.live?.status || convertTz({ time: data.hour, tz: activeTz })}
              </span>
            </Link>
          </Grid>
          <Grid item sm={2} xs={12}>
            <Link className={classes.link} target="_blanck" href={setLeagueDetailUrl()}>
              {' '}
              <span className={classes.gameText}>{truncateString(data.home)}</span>
            </Link>
          </Grid>
          <span className={classes.gameTextGrid}>
            <ClubLogo src={data.homeLogo} />
          </span>

          <Grid
            style={
              {
                // marginLeft: '3rem',
              }
            }
            item
            sm={2}
            xs={12}
          >
            <span className={classes.scores}>
              {score.homeScore}
              <strong className={classes.dashedLine}>-</strong>
              {score.awayScore}
            </span>
          </Grid>
          <span className={classes.gameTextGrid}>
            <ClubLogo src={data.awayLogo} />
          </span>
          <Grid
            item
            sm={2}
            xs={12}
            className={classes.gameTextGrid}
            style={{
              margin: '0.5rem 0 0 1.2rem',
            }}
          >
            <Link className={classes.link} target="_blanck" href={setLeagueDetailUrl()}>
              <span className={classes.gameText}>{truncateString(data.away)}</span>
            </Link>
          </Grid>
          <Grid
            sm={2}
            xs={12}
            item
            className={classes.gameTextGrid}
            style={{
              margin: '0 0rem 0 0rem',
            }}
          >
            <Button
              className={classes.button}
              size="small"
              onClick={() => addMatch(data)}
              color="inherit"
              endIcon={<AddIcon color="inherit" />}
            >
              {t('common.add_match_text')}
            </Button>
          </Grid>
        </Grid>
        <div />
      </div>
    </>
  );
};

export default BetLeaguesTitle;
