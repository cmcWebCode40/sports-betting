import React, { useEffect, useMemo, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { useAppDispatch } from '../../../provider/hooks/hooks';
import { getBookmakers } from '../../../provider/features/bookmarkers';
import { CustomLoader, CustomViewTable } from '../../../components';
import { useGetQuery } from '../../../hooks/useGetQuery';
import useSiteMapHeader from './hooks/use-sitemap-header';
import { siteMapFn } from '../../../logic/admin/sitemap.logic';
import AddSiteMap from './components/add-site-map';

const queryOptions = {
  queryKey: 'all-site-maps',
  options: {
    retry: false,
    refetchOnWindowFocus: false,
  },
};

const SiteMapView = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [data, setData] = useState<any>(useMemo(() => [], []));
  const [skipPageReset] = useState(false);

  const {
    data: response,
    isLoading,
    refetch,
  } = useGetQuery<{ data: any }>({
    queryFn: () => siteMapFn<{ data: any }>({ method: 'get' }),
    ...queryOptions,
  });
  const { siteMapHeader } = useSiteMapHeader({ refetch });

  useEffect(() => {
    if (response?.data) {
      setData(response.data.data);
    }
  }, [response]);

  useEffect(() => {
    dispatch(getBookmakers());
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <Paper>
          <AddSiteMap />
          <CustomViewTable
            data={data}
            actionKey="id"
            tableTitle={3}
            withSearchBar
            setData={setData}
            skipPageReset={skipPageReset}
            columns={siteMapHeader}
          />
        </Paper>
      )}
    </div>
  );
};

export default SiteMapView;
