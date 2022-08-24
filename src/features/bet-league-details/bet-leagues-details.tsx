import React, { useEffect, useState, useCallback } from 'react';
import { makeStyles, createStyles, Box } from '@material-ui/core';

import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ITheme } from '../../themes/theme';
import DetailsHeader from './components/details-header';
import DetailsTable from './components/details-table';

import { queryUrl } from '../../helpers/query-params';
import { betsApiMiddleware, TBetsOddsResponse } from '../../logic/bets.logic';
import { setBetsOdds, setMatches } from '../../provider/features/leagues/leagues';
import { useAppDispatch, useAppSelector } from '../../provider/hooks/hooks';
import { TMatches } from '../../models/leagues.model';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      margin: '30px 55px 18px',
      [theme.breakpoints.down('sm')]: {
        margin: '30px 10px 12px',
      },
    },
    table: {
      minWidth: 650,
    },
  }),
);

const BetLeaguesDetails = (): JSX.Element => {
  const classes = useStyles();

  const location = useLocation();
  const queryCode = queryUrl(location).get('code');
  const currentLeague = queryUrl(location).get('current_league');
  const dispatch = useAppDispatch();
  const [matchTitle, setMatchTitle] = useState<TMatches | any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { activeSport } = useAppSelector((state) => state.bookmarkers);

  const filterCurrentMatches = (data: Array<any>) => data.find((item) => item.code === queryCode);

  const loadBetOdds = (item: any) => {
    betsApiMiddleware<{ data: TBetsOddsResponse }>({
      method: 'get',
      url: `/sports/${activeSport.id}/default-odds?url=${item.url}`,
    }).then((res) => {
      if (res?.data) {
        dispatch(setBetsOdds(res?.data));
      }
    });
  };

  const loadMatch = useCallback(() => {
    setIsLoading(!isLoading);
    betsApiMiddleware<any>({ url: currentLeague, method: 'get' })
      .then((res) => {
        dispatch(setMatches({ data: res.data, url: currentLeague }));
        const data = res?.data?.data;
        const currentMatch = filterCurrentMatches(data);
        if (!currentMatch) {
          setMatchTitle({});
          loadBetOdds({});
        } else {
          setMatchTitle(currentMatch);
          loadBetOdds(currentMatch);
        }
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLeague, dispatch]);

  useEffect(() => {
    if (queryCode && currentLeague) {
      loadMatch();
    } else {
      toast.error('Something went wrong');
    }
  }, [currentLeague, loadMatch, queryCode]);

  return (
    <div className={classes.root}>
      <Box my={5}>
        <DetailsHeader loading={isLoading} match={matchTitle} />
      </Box>

      <DetailsTable match={matchTitle} />
    </div>
  );
};

export default BetLeaguesDetails;
