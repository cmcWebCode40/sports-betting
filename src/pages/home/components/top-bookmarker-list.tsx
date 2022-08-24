import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ArrowUpIcon from '@material-ui/icons/ArrowDropUp';
import { Skeleton } from '@material-ui/lab';
import { IconButton } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDropDown';
import { useTranslation } from 'react-i18next';
import genRandomId from '../../../helpers/gen-random-Id';
import { ReactComponent as BonusIcon } from '../../../assets/icons/bonus.svg';
import { useTopBookmakerStyles } from './style/home.styles';
import BookmakerPlatformDetails from './bookmaker-platform-details';
import { IBookMarkerResponseHL, middlewareBookmakerApi } from '../../../logic/home/home.logic';
import { useGetQuery } from '../../../hooks/useGetQuery';

const queryOptions = {
  queryKey: 'bookmaker-view',
  options: {
    retry: false,
    refetchOnWindowFocus: false,
  },
};

const pathToTranslation = 'homepage.bookmarker_detail_card';
const TopBookmakerList = (): JSX.Element => {
  const classes = useTopBookmakerStyles();
  const { t } = useTranslation();
  const [state, setState] = useState<any>([]);
  const [isOpen, setIsOpen] = useState({
    id: 0,
    open: false,
  });
  const [bkData, setBkData] = useState<any>([]);
  const { data: response, isLoading } = useGetQuery<IBookMarkerResponseHL>({
    queryFn: () => middlewareBookmakerApi<IBookMarkerResponseHL>({ method: 'get' }),
    ...queryOptions,
  });

  const onHover = (item: any) => {
    if (item.id === isOpen.id) {
      setIsOpen({ id: 0, open: false });
    } else {
      setIsOpen({ id: item.id, open: true });
      setState(item);
    }
  };

  useEffect(() => {
    if (response?.data?.data) {
      setBkData(response?.data?.data);
    }
  }, [response]);

  if (isLoading) {
    return (
      <Box borderRadius={6} boxShadow={3} className={classes.root}>
        <Skeleton variant="rect" height={300} />
      </Box>
    );
  }

  return (
    <Box borderRadius={6} boxShadow={3} className={classes.root}>
      <Box borderRadius={6} className={classes.topHeader}>
        <Typography className={classes.title} variant="h4">
          {t(`${pathToTranslation}.top_bookmakers`)}
        </Typography>
      </Box>
      <div className={classes.bonusIcon}>
        <BonusIcon
          style={{
            height: 60,
            width: 60,
          }}
        />
      </div>
      <div className={classes.listBg}>
        {bkData.map((list: any) => (
          <Box className={classes.boxList} display="flex" key={genRandomId()}>
            {isOpen.open && list.id === isOpen.id && <BookmakerPlatformDetails data={state} />}
            <div className={classes.logo}>
              <img height="30" src={list.logo} alt={list.name} />
            </div>
            <Typography variant="h4" className={classes.ratingSelected}>
              {5}/5
            </Typography>
            <Typography variant="h4" className={classes.discountedAmount}>
              {list.deposit[0]?.max}
              {list.deposit[0]?.currency}
            </Typography>
            <div className={classes.arrowIcon}>
              <IconButton
                style={{
                  margin: '-0.5rem 0 0 0 ',
                }}
                onClick={() => {
                  onHover(list);
                }}
              >
                {isOpen.open && list.id === isOpen.id ? (
                  <ArrowDownwardIcon color="primary" />
                ) : (
                  <ArrowUpIcon color="primary" />
                )}
              </IconButton>
            </div>
          </Box>
        ))}
      </div>
    </Box>
  );
};

export default TopBookmakerList;
