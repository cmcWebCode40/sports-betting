/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { toggleModal } from '../../provider/features/auth/auth';
import { useAppDispatch } from '../../provider/hooks/hooks';
import { UserUtils } from '../../utils/functions/user-utils';
import { IApplicationRouter } from '../@types/type';

const ApplicationRouter: React.FC<IApplicationRouter> = (props) => {
  const { role, isPublic, location, layout: Layout, component: Component, ...rest } = props;
  const dispatch = useAppDispatch();
  const { getUserToken } = UserUtils;
  const isAuthenticated = getUserToken();

  React.useEffect(() => {
    if (!isAuthenticated && !isPublic) {
      dispatch(toggleModal({ persistOpen: true }));
    }
  }, [dispatch, isAuthenticated, isPublic]);

  return (
    <Route
      exact
      {...rest}
      render={(pageProps) =>
        Layout ? (
          <Layout {...props}>
            <Component {...props} {...pageProps} />
          </Layout>
        ) : (
          <Component {...props} {...pageProps} />
        )
      }
    />
  );
};

export default ApplicationRouter;
