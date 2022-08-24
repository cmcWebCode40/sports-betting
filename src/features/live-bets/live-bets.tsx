import React, { useState, useEffect, useCallback } from 'react';
import { Box, createStyles, makeStyles } from '@material-ui/core';
import { useQuery } from 'react-query';
import { BettingSortingPanel, CustomLoader, SportsIcon } from '../../components';
import { ITheme } from '../../themes/theme';
import genRandomId from '../../helpers/gen-random-Id';
import { serviceApiMiddleware } from '../../services/services';
import { useAppSelector } from '../../provider/hooks/hooks';
import { ILiveBets } from '../../models/leagues.model';
import BetLeaguesTitle from '../../components/bets/bet-leagues-title';
import BetBookmakers from '../../components/bets/bet-bookmakers';
import { TSortType } from '../../models';
import TimeZoneUtils from '../../utils/common.helpers';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        alignItems: 'center',
        flexFlow: 'column nowrap',
      },
    },
    panelTab: {
      margin: theme.spacing(0, 4),
    },
    bookmakersRoot: {
      [theme.breakpoints.down('md')]: {
        margin: '10px 10px 0',
      },
    },
    bookmakers: {
      padding: '19px 0 0 29px',
      margin: '20px 0',
      backgroundColor: theme.palette.veryLightPink.main,
      [theme.breakpoints.down('md')]: {},
    },
    link: {
      textDecoration: 'none',
      display: 'block',
    },
  }),
);

const queryOptions = {
  queryKey: 'live-bet-view',
  options: {
    retry: true,
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
  },
};

const { convertSecToMin } = TimeZoneUtils;

const LiveBets = (): JSX.Element => {
  const classes = useStyles();
  const [liveMatch, setLiveMatch] = useState<ILiveBets[]>([]);
  const [activeFilter, setActiveFilter] = useState(3);

  const { activeSport } = useAppSelector((state) => state.bookmarkers);
  const {
    data: response,
    isLoading,
    refetch,
  } = useQuery<{ data: { data: ILiveBets[] } }>({
    queryFn: () =>
      serviceApiMiddleware({ method: 'get', url: `sports/${activeSport.id}/live-bet` }),
    ...queryOptions,
  });

  const filterOptions = useCallback(
    (type: TSortType) => {
      switch (type) {
        case 'Start Time': {
          const byStartTime = response?.data.data.sort(
            (a: any, b: any) => convertSecToMin(a.timeSec) - convertSecToMin(b.timeSec),
          );
          setLiveMatch(byStartTime as any);
          break;
        }
        default:
          break;
      }
    },
    [response?.data.data],
  );

  useEffect(() => {
    if (response?.data?.data.length) {
      if (activeFilter === 1) {
        filterOptions('Start Time');
      } else {
        setLiveMatch(response.data.data);
      }
    }
  }, [activeFilter, filterOptions, response]);

  useEffect(() => {
    setLiveMatch([]);
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSport]);

  if (isLoading && !liveMatch.length) {
    return (
      <Box>
        <CustomLoader />
      </Box>
    );
  }

  return (
    <Box className={classes.bookmakersRoot}>
      <BettingSortingPanel
        onFilter={filterOptions}
        customTypes="Country"
        activeState={activeFilter}
        setActiveState={setActiveFilter}
      />
      <Box borderRadius={6} boxShadow={3} className={classes.bookmakers}>
        {liveMatch.length ? (
          liveMatch.map((list: any) => (
            <Box
              className={classes.root}
              justifyContent="space-between"
              display="flex"
              alignItems="center"
              key={genRandomId()}
            >
              {list?.bookmakers && (
                <>
                  <BetLeaguesTitle data={list} /> <BetBookmakers bookmakers={list} />
                </>
              )}
            </Box>
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
            <>
              {' '}
              Sorry no Live match for {activeSport.name} at the moment
              <Box mt={6} mb={-6}>
                <SportsIcon type={activeSport.name} />
              </Box>{' '}
            </>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default LiveBets;
