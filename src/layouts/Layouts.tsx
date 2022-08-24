import React from 'react';
import { useLocation } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Container } from '@material-ui/core';
import { BottomAppBar, Coupons, Footer, Header, NavBarLowLayer, SocialMedia } from '../components';
import { AuthModal } from '../components/auth/auth-modal';
import { queryUrl } from '../helpers/query-params';
import { toggleModal } from '../provider/features/auth/auth';
import { useAppDispatch } from '../provider/hooks/hooks';
import ScrollTop from './scroll-top';

export interface LayoutProps {
  children?: React.ReactNode;
  navLowerLayer?: boolean;
  title: string;
}

const Layouts: React.FC<LayoutProps> = (props) => {
  const { children, navLowerLayer, title } = props;
  const location = useLocation();
  const hasAuthenticationQuery = queryUrl(location).get('authentication');
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (hasAuthenticationQuery) {
      dispatch(toggleModal({ persistOpen: true }));
    }
  }, [dispatch, hasAuthenticationQuery]);

  return (
    <>
      <div id="top">
        <Header />
        <AuthModal {...props} />
        {navLowerLayer && <NavBarLowLayer title={title} />}
        <Container
          style={{
            paddingBottom: '2rem',
            minHeight: 'calc(100vh - 70px)',
          }}
          fixed
        >
          <BottomAppBar />

          <main>
            {children}
            <SocialMedia />
            <Coupons />
          </main>
        </Container>
        <Footer />
      </div>
      <ScrollTop {...props}>
        <Fab color="secondary" href="#top" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default Layouts;
