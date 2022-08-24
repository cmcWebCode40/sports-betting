import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { ITheme } from '../../themes/theme';

const drawerWidth = 240;

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    title: {
      fontWeight: 500,
      color: theme.palette.white,
    },
  }),
);

interface IAdminHeader {
  open: boolean;
  isAdmin: boolean;
  handleDrawerOpen: () => void;
}

export const AdminHeader = ({ open, handleDrawerOpen, isAdmin }: IAdminHeader): JSX.Element => {
  const classes = useStyles();
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          {isAdmin && <MenuIcon />}
        </IconButton>
        <Typography variant="h4" className={classes.title} noWrap>
          {!isAdmin ? 'Admin Dashboard' : 'Admin Login'}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
