import React, { useEffect, useMemo, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useBookmakerStyles } from './styles/bookmarker.styles';
import { queryUrl } from '../../../helpers/query-params';
import AllBookmarkers from './components/all-bookmarkers';

import { CustomLoader, CustomViewTable } from '../../../components';
import {
  bookmakerApiMiddleware,
  IBookMarkerResponse,
} from '../../../logic/admin/all-bookmarkers.logic';
import useWhiteListedBookMarker from './hooks/use-whitelisted-bookmarker';
import { useGetQuery } from '../../../hooks/useGetQuery';

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const queryOptions = {
  queryKey: 'all-bookmarkers',
  options: {
    retry: false,
    refetchOnWindowFocus: false,
  },
};

const Bookmarker = (): JSX.Element => {
  const location = useLocation();
  const classes = useBookmakerStyles();
  const page = queryUrl(location).get('current-page');
  const history = useHistory();
  const [value, setValue] = React.useState<number>(Number(page) || 0);

  const [data, setData] = useState<any>(useMemo(() => [], []));
  const [skipPageReset] = useState(false);

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

  useEffect(() => {
    if (response?.data) {
      setData(response.data.data);
    }
  }, [response]);

  const handleChange = (_: unknown, newValue: number) => {
    history.push(`?current-page=${newValue}`);
    setValue(newValue);
  };

  return (
    <div>
      <AppBar className={classes.appBar} color="secondary" elevation={3} position="relative">
        <Tabs
          value={value}
          indicatorColor="primary"
          onChange={handleChange}
          centered
          aria-label="simple tabs example"
        >
          <Tab label="All Bookmarker" {...a11yProps(0)} />
          <Tab label="Whitelisted Bookmarker" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <AllBookmarkers />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Link to="/admin/bookmakers-list">Add New Bookmarker</Link>
        {isLoading ? (
          <CustomLoader />
        ) : (
          <Paper elevation={3}>
            <CustomViewTable
              data={data}
              actionKey="slug"
              tableTitle={3}
              withSearchBar
              setData={setData}
              skipPageReset={skipPageReset}
              columns={whiteListedHeader}
            />
          </Paper>
        )}
      </TabPanel>
    </div>
  );
};

export default Bookmarker;
