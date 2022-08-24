import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory, useParams } from 'react-router-dom';
import TitleHeader from './components/title-header';
import { useBookmarkerStyles } from './styles/bookmakers-details.styles';
import About from './components/about';
import Deposits from './components/deposits';
import SportInformation from './components/sport-informations';
import Diller from './components/diller';
import PlayableSports from './components/playable-sport';
import { useGetQuery } from '../../hooks/useGetQuery';
import { TAppBookMaker } from '../../models/bookmarkers.model';
import { CustomLoader } from '../../components';
import { serviceApiMiddleware } from '../../services/services';

export interface IBookMarkerResponse {
  status: string;
  message: string;
  data: {
    data: TAppBookMaker;
  };
}

const queryOptions = {
  queryKey: 'bookmarkers-details',
  options: {
    retry: false,
    refetchOnWindowFocus: false,
  },
};

const queryOptions2 = {
  queryKey: 'all-bookmarkers',
  options: {
    retry: false,
    refetchOnWindowFocus: false,
  },
};

const loaderStyle = {
  margin: '6rem 0',
};

const BookmarkerDetails = (): JSX.Element => {
  const history = useHistory();
  const classes = useBookmarkerStyles();
  const match = useParams<{ id: string }>();
  const onGoBack = () => history.push('/bookmakers');
  const [data, setData] = useState<TAppBookMaker | any>(null);
  const [bookmaker, setBookmaker] = useState<TAppBookMaker[] | any>([]);
  const { data: response, isLoading } = useGetQuery<IBookMarkerResponse>({
    queryFn: () =>
      serviceApiMiddleware<IBookMarkerResponse>({
        method: 'get',
        url: `/bookmakers/slug/${match?.id}`,
      }),
    ...queryOptions,
  });
  const { data: res } = useGetQuery<IBookMarkerResponse>({
    queryFn: () =>
      serviceApiMiddleware<IBookMarkerResponse>({ method: 'get', url: '/bookmakers/' }),
    ...queryOptions2,
  });

  useEffect(() => {
    if (response?.data?.data) {
      setData(response?.data?.data);
    }
    if (res?.data?.data) {
      setBookmaker(res?.data?.data);
    }
  }, [res?.data, res?.data?.data, response]);

  if (isLoading) {
    return <CustomLoader styles={loaderStyle} />;
  }

  if (!data) {
    return (
      <p>
        <strong>No Data</strong>
      </p>
    );
  }

  return (
    <div className={classes.root}>
      <Button
        variant="text"
        className={classes.goBackIcon}
        onClick={onGoBack}
        color="default"
        startIcon={<ArrowBackIosIcon />}
      >
        Matchbook
      </Button>
      <div className={classes.titleWrapper}>
        <TitleHeader data={data} />
      </div>
      <About diller={data.diller} data={data.about} />
      <PlayableSports playableSports={data.playableSports} />
      <div>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <Typography variant="h4" className={classes.tableHeaders}>
              Deposit
            </Typography>
            <Deposits deposit={data.deposit} />
          </Grid>
          <Grid item md={6}>
            <Typography variant="h4" className={classes.tableHeaders}>
              Withdraw money
            </Typography>
            <Deposits deposit={data.withdrawal} />
          </Grid>
        </Grid>
      </div>
      <Diller diller={data.diller} />
      {bookmaker.length && <SportInformation data={bookmaker} />}
    </div>
  );
};

export default BookmarkerDetails;
