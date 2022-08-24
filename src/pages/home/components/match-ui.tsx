import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { Link as RouteLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Divider } from '@material-ui/core';
import moment from 'moment';
import { useLeagueViewStyles } from './style/home.styles';
import { TMatches } from '../../../models/leagues.model';
import { useAppDispatch, useAppSelector } from '../../../provider/hooks/hooks';
import { onAddMatch } from '../../../provider/features/livescore';
import TimeZoneUtils, { truncateString } from '../../../utils/common.helpers';
import { ClubLogo } from '../../../components';
import { generateBetDetailsQueryUrl } from '../../../logic/bets.logic';

interface ILeagueMatchView {
  match: TMatches;
}

type TScore = 'home' | 'away';

const { convertTz } = TimeZoneUtils;
const MatchUI = ({ match }: ILeagueMatchView): JSX.Element => {
  const classes = useLeagueViewStyles();
  const {
    activeSport,

    timezone: { active },
  } = useAppSelector((state) => state.bookmarkers);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const getScore = (type: TScore, item: TMatches): string => {
    if (item.status !== 'waiting to start') {
      const scores = item.status.replace(':', ' ').split(' ');

      if (type === 'home') {
        return scores[0];
      }
      return scores[1];
    }
    return '';
  };
  useEffect(() => {}, [active]);

  const AddedNotification = () => (
    <div>
      Match Added
      <RouteLink className={classes.liveScoreLink} to="/live-scores">
        View collection here
      </RouteLink>
    </div>
  );
  const addMatch = (item: any) => {
    let score;
    if (item?.live?.score) {
      const scores = item.live.score.replace(':', ' ').split(' ');
      score = {
        homeScore: scores[0],
        awayScore: scores[1],
      };
    }
    const liveData = {
      ...item,
      score,
    };
    dispatch(onAddMatch(liveData));

    toast.success(AddedNotification);
  };

  const setLeagueDetailUrl = (data: TMatches): string => {
    const FormattedDate = moment.utc(`${data.day} ${data.year}`).format('YYYY-MM-DD');
    const date = FormattedDate.replace(/[^\w\s]/gi, '');

    const queryParams = generateBetDetailsQueryUrl({
      country: data.country,
      name: data.league,
      date,
      datedFormatted: true,
      sport: activeSport.id,
      code: data.code,
    });

    return queryParams;
  };

  return (
    <Box maxHeight={600} className={classes.root}>
      <Box display="flex" className={classes.grid}>
        <Link
          className={classes.link}
          target="_blanck"
          href={`/bet/soccer/premier?current_league=${setLeagueDetailUrl(match)}`}
        >
          <Typography className={classes.title}>
            {convertTz({ tz: active, time: match.hour })}
          </Typography>
        </Link>
        <Link
          className={classes.link}
          target="_blanck"
          href={`/bet/soccer/premier?current_league=${setLeagueDetailUrl(match)}`}
        >
          <Typography className={classes.gameText}>{truncateString(match.home)}</Typography>
        </Link>
        <ClubLogo src={match.homeLogo} />{' '}
        <Link
          className={classes.link}
          target="_blanck"
          href={`/bet/soccer/premier?current_league=${setLeagueDetailUrl(match)}`}
        >
          <Box
            style={{
              width: '3rem',
              minWidth: '3rem',
            }}
            className={classes.scoreParent}
            justifyContent="space-between"
            alignItems="center"
            display="flex"
          >
            <Box className={classes.scores} component="span">
              {getScore('home', match)}
            </Box>
            <Box component="span" fontWeight={500}>
              -
            </Box>
            <Box className={classes.scores} component="span">
              {getScore('away', match)}
            </Box>{' '}
          </Box>
        </Link>
        <ClubLogo src={match.awayLogo} />{' '}
        <Link
          className={classes.link}
          target="_blanck"
          href={`/bet/soccer/premier?current_league=${setLeagueDetailUrl(match)}`}
        >
          <Typography className={classes.gameText}>{truncateString(match.away)}</Typography>
        </Link>
        <Button
          color="inherit"
          onClick={() => addMatch(match)}
          className={classes.addMatchIcon}
          endIcon={<AddIcon color="inherit" />}
        >
          {t('homepage.league_match_section.add_match_text')}
        </Button>
      </Box>
      <Divider
        style={{
          background: '#ddd',
        }}
      />
    </Box>
  );
};

export default MatchUI;
