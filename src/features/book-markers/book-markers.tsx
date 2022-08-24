import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import BookmarkerList from './bookmarker-list';
import BookMarkerSortingBar from './sorting-bar';
import { ITheme } from '../../themes/theme';
import { useGetQuery } from '../../hooks/useGetQuery';
import { bookmakerApiFn, IBookMarkerResponse } from '../../logic/bookmaker.logic';
import { CustomLoader } from '../../components';
import { updateBookmaker } from '../../provider/features/bookmarkers';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      display: 'flex',
      margin: theme.spacing(1.3, 0),
    },
    title: {
      margin: '14px 0px',
      fontWeight: 600,
      color: theme.palette.grayishBrown.main,
    },
  }),
);

const loaderStyle = {
  margin: '6rem 0',
};

const queryOptions = {
  queryKey: 'bookmaker-view',
  options: {
    retry: false,
    refetchOnWindowFocus: false,
  },
};

const BookMarkers = (): JSX.Element => {
  const classes = useStyles();
  const { data: response, isLoading } = useGetQuery<IBookMarkerResponse>({
    queryFn: () => bookmakerApiFn<IBookMarkerResponse>({ method: 'get' }),
    ...queryOptions,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (response?.data) {
      dispatch(updateBookmaker(response.data.data));
    }
  }, [dispatch, response?.data]);

  return (
    <Container maxWidth="lg">
      <Typography className={classes.title} color="inherit" variant="h3">
        Betting Companies
      </Typography>
      <BookMarkerSortingBar />
      {isLoading ? <CustomLoader styles={loaderStyle} /> : <BookmarkerList />}
    </Container>
  );
};

export default BookMarkers;
