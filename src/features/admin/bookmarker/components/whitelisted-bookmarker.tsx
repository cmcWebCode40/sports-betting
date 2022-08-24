import React, { useEffect, useMemo, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles } from '@material-ui/core';
import { CustomLoader, CustomViewTable } from '../../../../components';
import { ITheme } from '../../../../themes/theme';
import {
  bookmakerApiMiddleware,
  IBookMarkerResponse,
} from '../../../../logic/admin/all-bookmarkers.logic';
import { useGetQuery } from '../../../../hooks/useGetQuery';
import useWhiteListedBookMarker from '../hooks/use-whitelisted-bookmarker';
import AddWhiteListedBookmarker from './add-whitelisted-bookmarker';
import { useAppDispatch } from '../../../../provider/hooks/hooks';
import { getBookmakers } from '../../../../provider/features/bookmarkers';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '96%',
      margin: theme.spacing(0.5, 'auto'),
    },
    Paper: {
      backgroundColor: theme.palette.background.paper,
    },
    addBtn: {
      margin: theme.spacing(1, 'auto'),
    },
  }),
);

const queryOptions = {
  queryKey: 'all-bookmarkers',
  options: {
    retry: false,
    refetchOnWindowFocus: false,
  },
};

const WhiteListedBookmarkers = (): JSX.Element => {
  const classes = useStyles();
  const {
    data: response,
    isLoading,
    refetch,
  } = useGetQuery<{ data: IBookMarkerResponse }>({
    queryFn: () =>
      bookmakerApiMiddleware<{ data: IBookMarkerResponse }>({ method: 'get', url: '/bookmakers' }),
    ...queryOptions,
  });
  const { whiteListedHeader } = useWhiteListedBookMarker({ refetch });
  const [data, setData] = useState<any>(useMemo(() => [], []));
  const [skipPageReset] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (response?.data) {
      setData(response.data.data);
    }
  }, [response]);

  useEffect(() => {
    dispatch(getBookmakers());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <AddWhiteListedBookmarker />
      {isLoading ? (
        <CustomLoader />
      ) : (
        <Paper>
          <CustomViewTable
            data={data}
            actionKey="id"
            tableTitle={3}
            withSearchBar
            setData={setData}
            skipPageReset={skipPageReset}
            columns={whiteListedHeader}
          />
        </Paper>
      )}
    </div>
  );
};

export default WhiteListedBookmarkers;
