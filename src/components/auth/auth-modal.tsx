import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import SvgIcon from '@material-ui/core/SvgIcon';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import ModalBox from '../modal-box';
import SignIn from '../../features/auth/sign-In/sigin-in';
import SignUp from '../../features/auth/sign-up/sign-up';
import { queryUrl } from '../../helpers/query-params';
import { LocationProps } from './auth-modal-types';
import { useAuthModalStyles } from './styles/auth-modal.styles';
import { useAppDispatch } from '../../provider/hooks/hooks';
import { toggleModal } from '../../provider/features/auth/auth';
import { ReactComponent as CloseMenuIcon } from '../../assets/icons/icon_remove.svg';

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

const getAuthenticationType = (type: string): number => {
  switch (type) {
    case 'signin':
      return 0;
    case 'signup':
      return 1;
    default:
      return 0;
  }
};

const getActiveAuthComponent = (type: string): JSX.Element => {
  switch (type) {
    case 'signin':
      return <SignIn />;
    case 'signup':
      return <SignUp />;
    default:
      return <p>Not found</p>;
  }
};

interface AuthModalProps {
  location?: LocationProps;
  isPublic?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({ location, isPublic }) => {
  const modalTitle = queryUrl(location).get('title');
  const authType = queryUrl(location).get('type');
  const step = queryUrl(location).get('step');
  const authState = queryUrl(location).get('user_auth_type');
  const classes = useAuthModalStyles();
  const { t } = useTranslation();
  const type = getAuthenticationType(authType);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [value, setValue] = React.useState<number>(authType ? type : Number(authState || 0));

  useEffect(() => {
    if (authType === 'signin' && step === '0') {
      setValue(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleChange = (_: unknown, newValue: number) => {
    history.push(`?user_auth_type=${newValue}`);
    setValue(newValue);
  };

  const handleClose = () => {
    dispatch(toggleModal({}));
  };

  const CloseIcon = (
    <SvgIcon
      component={CloseMenuIcon}
      onClick={handleClose}
      fontSize="large"
      className={classes.closeIcon}
    />
  );

  const DoubleTabsAuthenticationView = (
    <>
      <AppBar className={classes.appBar} elevation={0} position="relative">
        <Tabs
          value={value}
          indicatorColor="secondary"
          onChange={handleChange}
          centered
          aria-label="simple tabs example"
        >
          <Tab label={t('user_auth.signin.header')} {...a11yProps(0)} />
          <Tab label={t('user_auth.signup.header')} {...a11yProps(1)} />
        </Tabs>
        {isPublic && CloseIcon}
      </AppBar>
      <TabPanel value={value} index={0}>
        <SignIn location={location} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SignUp location={location} />
      </TabPanel>
    </>
  );

  const SingleTabAuthenticationView = (
    <>
      <AppBar className={classes.appBar} elevation={0} position="relative">
        <Tabs
          value={value}
          indicatorColor="secondary"
          onChange={handleChange}
          centered
          aria-label="simple tabs example"
        >
          <Tab label={modalTitle} {...a11yProps(value)} />
        </Tabs>
        {isPublic && CloseIcon}
      </AppBar>
      <TabPanel value={value} index={value}>
        {getActiveAuthComponent(authType)}
      </TabPanel>
    </>
  );

  return (
    <ModalBox>
      <div className={classes.root}>
        {!modalTitle ? DoubleTabsAuthenticationView : SingleTabAuthenticationView}
      </div>
    </ModalBox>
  );
};
