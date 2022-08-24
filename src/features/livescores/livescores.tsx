/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react';
import { Button, createStyles, Grid, makeStyles, SvgIcon } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { ITheme } from '../../themes/theme';
import { ClubLogo, CustomLoader, SportsIcon } from '../../components';
import genRandomId from '../../helpers/gen-random-Id';
import Bet from './components/bets/bets';
import { LiveScoreWatchList } from './components/livescore-watchlist';
import { useAppSelector } from '../../provider/hooks/hooks';
import { liveScoreFn } from '../../logic/livescores.logic';
import { useGetQuery } from '../../hooks/useGetQuery';
import { ILiveScore } from '../../models/leagues.model';
import { groupMatchesByLeague, sortLettersAlphabetically } from '../../utils/common.helpers';
import { ReactComponent as SortIcon } from '../../assets/icons/sorting_icon.svg';
import TimeZoneSelector from '../../components/time-zone-selector/timezone-selector';
import { TSortType } from '../../models';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {},
    divider: {
      height: '1px',
      margin: '-1px 0 21px',
      background: ` ${theme.palette.oceanGreen.main}`,
    },
    panelTab: {
      margin: theme.spacing(0, 4),
    },
    gridContainer: {
      margin: theme.spacing(3, 0, 3, 0),
      [theme.breakpoints.down('md')]: {
        margin: 'auto',
      },
    },
    bookmakersRoot: {
      [theme.breakpoints.down('md')]: {
        margin: '1rem auto',
      },
    },
    bookmakers: {
      flexBasis: '65%',
      margin: '20px 0',
      backgroundColor: theme.palette.veryLightPink.main,
      [theme.breakpoints.down('md')]: {},
    },
    content: {
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
      '& >*': {
        margin: theme.spacing(3, 1),
      },
    },
    button: {
      textTransform: 'capitalize',
      color: theme.palette.grayishBrown.main,
      fontSize: theme.typography.subtitle1.fontSize,
      [theme.breakpoints.down('md')]: {
        fontSize: '0.7rem',
      },
    },
    activeButton: {
      padding: '6px 15px 8px 16px',
      textTransform: 'capitalize',
      borderRadius: theme.shape.borderRadius,
      border: `solid 1px ${theme.palette.oceanGreen.main}`,
      fontWeight: 600,

      color: theme.palette.oceanGreen.main,
      [theme.breakpoints.down('md')]: {
        fontSize: '0.7rem',
      },
    },
    boxParent: {
      margin: theme.spacing(0, 2),
      '& >*': {
        margin: theme.spacing(0, 1),
      },
    },
    sortButton: {
      textTransform: 'capitalize',
      color: theme.palette.grayishBrown.main,
      fontSize: theme.typography.subtitle1.fontSize,
      '&:hover': {
        background: 'none',
      },
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    sortButtonMobile: {
      display: 'none',
      margin: '0.3rem 0 -1.8rem 0',
      color: theme.palette.grayishBrown.main,
      fontSize: theme.typography.subtitle1.fontSize,
      [theme.breakpoints.down('md')]: {
        display: 'block',
      },
    },
    league: {
      padding: '0.4rem  0.8rem',
      width: '100%',
      textTransform: 'capitalize',
      fontSize: theme.typography.subtitle1.fontSize,
      color: theme.palette.white,
      backgroundImage: theme.palette.primary.light,
    },
    timezonePanel: {
      marginLeft: '1.8rem',
      [theme.breakpoints.down('md')]: {
        margin: 'auto',
      },
    },
  }),
);

const queryOptions = {
  queryKey: 'livescore-view',
  options: {
    retry: true,
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
  },
};

interface ILiveScoreResponse {
  status: string;
  message: string;
  data: {
    data: ILiveScore[];
  };
}

const loaderStyle = {
  margin: '6rem 0',
};

const countryLogoStyles = {
  borderRadius: '50%',
  height: '20px',
  width: '20px',
  marginTop: '0.1rem',
};

const sortByStartTime = (data: ILiveScore[]) => {
  const liveGames = data.filter((item) => item.live.score);

  const pendingGames = data
    .filter((item) => !item.live.score)
    .map((item: any) => {
      const unixTs = moment(`${item.day},  ${item.year} ${item.hour}`, 'LLL').unix();
      return {
        ...item,
        hour: unixTs,
      };
    })
    .sort((a: any, b: any) => a.hour - b.hour)
    .map((item: any) => ({
      ...item,
      hour: moment.unix(item.hour).format('H:mm a'),
    }));

  return [...pendingGames, ...liveGames];
};

const Livescore = (): JSX.Element => {
  const { t } = useTranslation();
  const pathToTranslation = 'livescores_page.header_section';
  const classes = useStyles();
  const [liveMatch, setLiveMatch] = useState<ILiveScore[]>([]);
  const [activeState, setActiveState] = useState(1);

  const { activeSport } = useAppSelector((state) => state.bookmarkers);
  const betSortList: Array<{
    title: TSortType;
    value: TSortType;
  }> = [
    {
      title: t(`${pathToTranslation}.start_time_label_text`),
      value: 'Start Time',
    },
    {
      title: t(`${pathToTranslation}.country_label_text`),
      value: 'Country',
    },
  ];

  const {
    data: response,
    isLoading,
    refetch,
  } = useGetQuery<ILiveScoreResponse>({
    queryFn: () => liveScoreFn<ILiveScoreResponse>({ method: 'get', sport: activeSport.id }),
    ...queryOptions,
  });

  const onSelectType = (index: number): void => setActiveState(index);

  const filterOptions = (type: TSortType): void => {
    switch (type) {
      case 'Country': {
        const liveScoreData = groupMatchesByLeague(response?.data?.data as ILiveScore[]);
        const sortedData = sortLettersAlphabetically<ILiveScore>(liveScoreData, 'country');
        setLiveMatch(sortedData);
        break;
      }
      case 'Start Time': {
        const byStartTime = sortByStartTime(response?.data?.data as ILiveScore[]);
        setLiveMatch(byStartTime as any);
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    if (response?.data?.data.length) {
      if (activeState === 1) {
        const liveScoreData = groupMatchesByLeague(response?.data?.data);
        setLiveMatch(liveScoreData);
        setTimeout(() => {
          filterOptions('Country');
        }, 200);
      } else if (activeState === 0) {
        filterOptions('Start Time');
      } else {
        const liveScoreData = groupMatchesByLeague(response?.data?.data);
        setLiveMatch(liveScoreData);
      }
    }
  }, [response]);

  useEffect(() => {
    refetch();
  }, [activeSport]);

  return (
    <div className={classes.root}>
      <div className={classes.bookmakersRoot}>
        <Grid container className={classes.gridContainer}>
          <Grid item md={8}>
            <Box display="flex">
              <Button className={classes.sortButton} startIcon={<SvgIcon component={SortIcon} />}>
                {`${t(`${pathToTranslation}.sorting_criteria_text`)}:`}
              </Button>
              <SvgIcon className={classes.sortButtonMobile} component={SortIcon} />
              <Box className={classes.boxParent} display="flex" justifyContent="space-between">
                {betSortList?.map((list, index) => (
                  <Button
                    onClick={() => {
                      onSelectType(index);
                      filterOptions(list.value);
                    }}
                    className={activeState === index ? classes.activeButton : classes.button}
                    key={list.title}
                  >
                    {list.title}
                  </Button>
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid item md={3} sm={12} xs={12} className={classes.timezonePanel}>
            <TimeZoneSelector />
          </Grid>
        </Grid>
        {isLoading ? (
          <CustomLoader styles={loaderStyle} />
        ) : (
          <Box display="flex" className={classes.content}>
            <Box mx={2} borderRadius={6} boxShadow={3} className={classes.bookmakers}>
              {liveMatch.length ? (
                liveMatch.map((list: any) => (
                  <Fragment key={genRandomId()}>
                    {activeState === 1 ? (
                      <Box key={genRandomId()}>
                        {list.matches.map((item: ILiveScore) => (
                          <Box key={genRandomId()}>
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              className={classes.league}
                            >
                              {list.league}
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                fontSize={16}
                              >
                                <span>{list.country}</span>
                                <Box mx={2}>
                                  <ClubLogo styles={countryLogoStyles} src={list.countryLogo} />
                                </Box>
                              </Box>
                            </Box>
                            <Bet key={item.id}>
                              <Bet.BetLeaguesTitle data={item} />
                            </Bet>
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      <Bet key={genRandomId()}>
                        <Bet.BetLeaguesTitle data={list} />
                      </Bet>
                    )}
                  </Fragment>
                ))
              ) : (
                <Box
                  fontSize={17}
                  textAlign="center"
                  justifyContent="center"
                  height={500}
                  color="primary"
                  alignItems="center"
                >
                  {isLoading ? (
                    <CustomLoader styles={loaderStyle} />
                  ) : (
                    <>
                      Sorry no Live match for {activeSport.name} at the moment
                      <Box mt={6} mb={-6}>
                        <SportsIcon type={activeSport.name} />
                      </Box>{' '}
                    </>
                  )}
                </Box>
              )}
            </Box>
            <LiveScoreWatchList />
          </Box>
        )}
      </div>
    </div>
  );
};

export default Livescore;
