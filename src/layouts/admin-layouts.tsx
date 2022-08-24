import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { ITheme } from '../themes/theme';
import { AdminHeader, Footer } from '../components';
import { useAppSelector } from '../provider/hooks/hooks';
import AdminNavBar from '../components/admin-sidenav/admin-side-navbar';
import { UserUtils } from '../utils/functions/user-utils';

const drawerWidth = 240;

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(6) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      height: '100vh',
      margin: theme.spacing(2),
      background: theme.palette.veryLightPink.main,
    },
    footer: {
      margin: theme.spacing(15, 0, 0, 0),
    },
  }),
);

const { getUserToken } = UserUtils;
export interface IAdminLayouts {
  children?: React.ReactNode;
  navLowerLayer?: boolean;
}

const AdminLayouts = ({ children }: IAdminLayouts): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const {
    authentication: { credentials },
  } = useAppSelector((state) => state);

  React.useEffect(() => {
    if (!getUserToken()) {
      history.push('/admin/login-odds-bug');
    }
  }, [history]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const hasAdminAccess = () => credentials.role === 'admin';

  return (
    <div>
      <div className={classes.root}>
        <AdminHeader open={open} isAdmin={hasAdminAccess()} handleDrawerOpen={handleDrawerOpen} />
        {hasAdminAccess() && (
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
            <AdminNavBar isOpen={open} />
          </Drawer>
        )}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Box px={2}>{children}</Box>
          <div className={classes.footer}>
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayouts;
