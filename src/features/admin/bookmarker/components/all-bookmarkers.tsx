import React, { useEffect, useMemo, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles } from '@material-ui/core';
import { CustomLoader, CustomViewTable } from '../../../../components';
import useAllBookmarker from '../hooks/use-all-bookmarkers';
import { ITheme } from '../../../../themes/theme';
import { useAppSelector } from '../../../../provider/hooks/hooks';
import { TBookmarkers } from '../../../../models/bookmarkers.model';

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

const AllBookmarkers = (): JSX.Element => {
  const classes = useStyles();
  const { AllBookmarkerHeader } = useAllBookmarker();
  const [data, setData] = useState<TBookmarkers[]>(useMemo(() => [], []));
  const [skipPageReset] = useState(false);
  const { bookmakersList, isLoading } = useAppSelector((state) => state.bookmarkers);

  useEffect(() => {
    if (bookmakersList.length) {
      setData(bookmakersList);
    }
  }, [bookmakersList]);

  return (
    <div className={classes.root}>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <Paper>
          <CustomViewTable
            data={data}
            actionKey="id"
            tableTitle={data.length}
            setData={setData}
            withSearchBar
            skipPageReset={skipPageReset}
            columns={AllBookmarkerHeader}
          />
        </Paper>
      )}
    </div>
  );
};

export default AllBookmarkers;
