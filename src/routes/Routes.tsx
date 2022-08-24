import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import FallBack from '../components/loaders/fallback';
import genRandomId from '../helpers/gen-random-Id';
import NotFound from '../pages/NotFound/not-found';
import { getAppDetails, getBookmakers } from '../provider/features/bookmarkers';
import { useAppDispatch } from '../provider/hooks/hooks';
import ApplicationRouter from './app/application-router';
import AppRoutes from './config.routes';

const Routes: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getAppDetails());
    dispatch(getBookmakers());
  }, [dispatch]);

  return (
    <Suspense fallback={<FallBack />}>
      <Switch>
        {AppRoutes.map((route) => (
          <ApplicationRouter key={genRandomId()} {...route} exact />
        ))}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
