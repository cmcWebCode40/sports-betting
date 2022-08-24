import React from 'react';
import Box from '@material-ui/core/Box';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import LiveSportIcon from './live-sport-icon';
import { useWatchListStyles } from './styles/livescore-watch.styles';
import { useAppDispatch, useAppSelector } from '../../../provider/hooks/hooks';
import { onRemoveMatch } from '../../../provider/features/livescore';
import { ELiveIcon } from '../../../models/leagues.model';
import { ClubLogo } from '../../../components';

export const LiveScoreWatchList: React.FC = () => {
  const classes = useWatchListStyles();
  const dispatch = useAppDispatch();
  const { watchList } = useAppSelector((state) => state.liveMatch);
  const { t } = useTranslation();

  const pathToTranslation = 'livescores_page';

  const removeDateAmPm = (date: string) => date.split(' ').slice(0, -1);

  return (
    <Box borderRadius={6} boxShadow={3} className={classes.root}>
      <Box borderRadius={6} boxShadow={3} className={classes.appBar}>
        {t(`${pathToTranslation}.my_matches_section.title`)} | {watchList.length}
      </Box>
      <div>
        {watchList.length ? (
          <>
            {watchList?.map((item) => (
              <div key={item.code} className={classes.bookMarkerContainer}>
                <Box className={classes.lsTopHead} display="flex">
                  <ClubLogo src={item.countryLogo} />
                  <span className={classes.leagueTitleDate}>{item.day}</span>

                  <LiveSportIcon type={item.sports as ELiveIcon} />
                </Box>
                <div className={classes.lsTopCenterFinished}>{removeDateAmPm(item.hour)}</div>
                <Box className={classes.lsTopBottom} display="flex">
                  <span className={classes.leagueTitle}>{item.home}</span>
                  <span>
                    <Box className={classes.leagueTitleDate} display="flex">
                      <span>{item.score?.homeScore}</span>
                      <span>-</span>
                      <span>{item.score?.awayScore}</span>
                    </Box>
                  </span>
                  <span className={classes.leagueTitle}>{item.away}</span>
                </Box>
                <Box className={classes.lsTopHead} display="flex">
                  <HighlightOffIcon
                    fontSize="small"
                    onClick={() => dispatch(onRemoveMatch(item?.code))}
                  />
                </Box>
              </div>
            ))}
          </>
        ) : (
          <Typography variant="body1" className={classes.body1}>
            {t(`${pathToTranslation}.my_matches_section.guide_to_add_matches_text`)}
          </Typography>
        )}
      </div>
    </Box>
  );
};

export default LiveScoreWatchList;
