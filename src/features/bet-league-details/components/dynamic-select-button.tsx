import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core';
// import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { ITheme } from '../../../themes/theme';
import { betsApiMiddleware, TBetsOddsResponse } from '../../../logic/bets.logic';
import { setBetsOdds } from '../../../provider/features/leagues/leagues';
import { useAppSelector } from '../../../provider/hooks/hooks';
import { TMatches } from '../../../models';
import { errorMessageToaster } from '../../../utils/functions/error-handler';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      display: 'flex',
      margin: theme.spacing(1.5, 0),
    },
    button: {
      fontWeight: 600,
      textTransform: 'capitalize',
      [theme.breakpoints.down('md')]: {
        fontSize: theme.typography.h5.fontSize,
      },
    },
    activeButton: {
      padding: '6px 15px 8px 16px',
      textTransform: 'capitalize',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.white,
      border: `solid 1px ${theme.palette.oceanGreen.main}`,
      fontWeight: 600,

      color: theme.palette.oceanGreen.main,
      [theme.breakpoints.down('md')]: {
        fontSize: theme.typography.h5.fontSize,
      },
    },
    boxParent: {
      margin: theme.spacing(0, 2),
      [theme.breakpoints.down('md')]: {
        display: 'block',
      },
      '& >*': {
        margin: theme.spacing(0, 1),
        [theme.breakpoints.down('md')]: {
          margin: theme.spacing(0),
        },
      },
    },
    sortButton: {
      textTransform: 'capitalize',
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    sortButtonMobile: {
      display: 'none',
      margin: '0.3rem 0 -1.8rem 0',
      [theme.breakpoints.down('md')]: {
        display: 'block',
      },
    },
    link: {
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: 600,
      color: '#4a4a4a',
    },
  }),
);

type OddsMarkets = {
  market: string;
};

interface IDynamicSelectButton {
  urlCode?: TMatches;
}
const DynamicSelectButton = ({ urlCode }: IDynamicSelectButton): JSX.Element => {
  const classes = useStyles();
  const [activeState, setActiveState] = useState(0);
  const [oddTypeUrl, setOddsTypeUrl] = useState('');
  const [oddsMarkets, setOddsMarkets] = useState<any>([]);
  const dispatch = useDispatch();
  const { activeSport } = useAppSelector((state) => state.bookmarkers);
  const saveGameOddsType = (res: any) => {
    setOddsMarkets(res?.data?.data);
  };

  const { refetch } = useQuery<any>({
    queryFn: () =>
      betsApiMiddleware<{ data: { data: OddsMarkets[] } }>({
        method: 'get',
        url: `/sports/${activeSport.id}/odds-type?url=${urlCode?.code}`,
      }),
    queryKey: 'odds-markets',
    retry: false,
    enabled: false,
    onSuccess: saveGameOddsType,
    refetchOnWindowFocus: false,
  });

  const handleOddsTypeResponse = (odds: any) => {
    dispatch(setBetsOdds(odds.data.data));
  };
  const { refetch: refetchFn } = useQuery<any>({
    queryFn: () =>
      betsApiMiddleware<{ data: TBetsOddsResponse }>({
        method: 'get',
        url: oddTypeUrl,
      }),
    queryKey: 'odds-types',
    retry: false,
    enabled: false,
    onSuccess: handleOddsTypeResponse,
    onError: (error: any) => errorMessageToaster(error, 'warn'),
  });
  const onSelectType = (index: number): void => setActiveState(index);

  const getMarketPeriods = (data: any) => {
    const arr: any = [];

    Object.keys(data.periods).forEach((key) => arr.push(key));

    // setting only first half , will support for second soon
    setOddsTypeUrl(`/sports/${activeSport.id}/odds/${arr[0]}?url=${urlCode?.url}`);
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" className={classes.root}>
      <Box className={classes.boxParent} display="flex" justifyContent="space-between">
        {oddsMarkets.map((list: OddsMarkets, index: number) => (
          <Button
            onClick={() => {
              getMarketPeriods(list);
              onSelectType(index);
              setTimeout(() => {
                refetchFn();
              }, 500);
            }}
            className={activeState === index ? classes.activeButton : classes.button}
            key={list.market}
          >
            {list.market}
          </Button>
        ))}
      </Box>
      {/* <Box fontSize={14} mr={2}>
        <Link
          className={classes.link}
          to={`/league-table?url=${urlCode?.country}/${urlCode?.league}`}
        >
          Standings
        </Link>
      </Box> */}
    </Box>
  );
};

export default DynamicSelectButton;
