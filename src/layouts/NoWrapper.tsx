import React from 'react';
import { useLocation } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Footer, NavBarLowLayer } from '../components';
import { AuthModal } from '../components/auth/auth-modal';
import { queryUrl } from '../helpers/query-params';
import { toggleModal } from '../provider/features/auth/auth';
import { useAppDispatch } from '../provider/hooks/hooks';
import ScrollTop from './scroll-top';

export interface LayoutProps {
  children?: React.ReactNode;
  navLowerLayer?: boolean;
}

const NoWrapper: React.FC<LayoutProps> = (props) => {
  const { children, navLowerLayer } = props;
  const location = useLocation();
  const isAuthentication = queryUrl(location).get('authentication');
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (isAuthentication) {
      dispatch(toggleModal({ persistOpen: true }));
    }
  }, [dispatch, isAuthentication]);

  return (
    <>
      <div id="back-to-top-anchor">
        <AuthModal {...props} />
        {navLowerLayer && <NavBarLowLayer />}
        <main>{children}</main>
        <Footer />
      </div>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default NoWrapper;
