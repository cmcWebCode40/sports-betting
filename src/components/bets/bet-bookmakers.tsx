import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { useDispatch } from 'react-redux';
import { ITheme } from '../../themes/theme';
import { onAddCoupon } from '../../provider/features/coupon/coupon';
import genRandomId from '../../helpers/gen-random-Id';
import { useAppSelector } from '../../provider/hooks/hooks';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {},
    subRoot: {
      display: 'flex',
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        borderBottom: '0.5px solid #ccc',
        margin: '1rem  0',
      },
    },
    bookmaker: {
      width: '100px',
      margin: '0 30px 20px 20px',
      padding: '8px 4px 0px 4px',
      borderRadius: '4px',
      cursor: 'pointer',
      backgroundColor: theme.palette.white,
      [theme.breakpoints.down('sm')]: {
        width: '60px',
        margin: '0 8px 10px 8px',
      },
    },
    bookmakerLogo: {
      width: '3rem',
      height: 'auto',
    },
    title: {
      fontSize: ' 15px',
      fontWeight: 600,
      color: theme.palette.black,
    },
    subTitle: {
      fontSize: ' 14px',
      color: theme.palette.brownGrey.main,
    },
  }),
);

type IMakers = {
  bookmakers: any;
  componentType?: any;
};

const BetBookmakers = (props: IMakers): JSX.Element => {
  const { bookmakers, componentType = 'div' } = props;
  const classes = useStyles();
  const [odds, setOdds] = useState<any>({});
  const { activeSport } = useAppSelector((state) => state.bookmarkers);
  const dispatch = useDispatch();

  const addCoupon = (odd?: number, type?: string) => {
    const data = {
      odd,
      type,
      id: genRandomId(),
      ...bookmakers,
    };
    dispatch(onAddCoupon(data));
  };

  useEffect(() => {
    if (bookmakers?.bookmakers.length) {
      setOdds(bookmakers?.bookmakers[0]?.odds);
    }
  }, [bookmakers]);

  const bookmakerLogo = (
    <Box component={componentType}>
      {bookmakers?.bookmakers.length ? (
        <img src={bookmakers?.bookmakers[0].logo} className={classes.bookmakerLogo} alt="logo" />
      ) : (
        ''
      )}
    </Box>
  );
  return (
    <Box component={componentType} className={classes.subRoot}>
      <Box
        onClick={() => addCoupon(odds['0'], '1')}
        component={componentType}
        className={classes.bookmaker}
      >
        <Typography className={classes.title} variant="h4">
          {odds['0']}
        </Typography>
        <Typography className={classes.subTitle} variant="body1" />
        {bookmakerLogo}
      </Box>
      <Box
        onClick={() => addCoupon(odds['1'], 'x')}
        component={componentType}
        className={classes.bookmaker}
      >
        <Typography className={classes.title} variant="h4">
          {odds['1']}
        </Typography>
        <Typography className={classes.subTitle} variant="body1" />
        {bookmakerLogo}
      </Box>
      {![2, 3, 4].includes(activeSport.id) && (
        <Box
          onClick={() => addCoupon(odds['2'], '2')}
          component={componentType}
          className={classes.bookmaker}
        >
          <Typography className={classes.title} variant="h4">
            {odds['2']}
          </Typography>
          <Typography className={classes.subTitle} variant="body1" />
          {bookmakerLogo}
        </Box>
      )}
    </Box>
  );
};

export default BetBookmakers;
