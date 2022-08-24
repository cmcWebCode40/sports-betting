import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { ReactComponent as PersonOutlineIcon } from '../../../assets/icons/icon_signin.svg';
import { useAppDispatch, useAppSelector } from '../../../provider/hooks/hooks';
import { handleLogout, toggleModal } from '../../../provider/features/auth/auth';
import { ITheme } from '../../../themes/theme';
import routesPath from '../../../routes/path.routes';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    user: {
      order: 3,
      color: theme.palette.white,
      borderRadius: '0px',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    userBorder: {
      background: theme.palette.white,
      height: '3px',
      margin: '3px 0 -10px 0px',
      [theme.breakpoints.down('md')]: {
        display: 'none',
        margin: '0',
      },
    },
    gap: {
      margin: '8px 0 0 0 ',
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    mobileUser: {
      order: 3,
      display: 'none',
      color: theme.palette.white,
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },
    menu: {
      textTransform: 'uppercase',
      fontWeight: 600,
      color: theme.palette.primary.main,
    },
  }),
);

export default function UserIconNav(): JSX.Element {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [, /* mobileMoreAnchorEl */ setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const dispatch = useAppDispatch();
  const {
    authentication: { credentials },
  } = useAppSelector((state) => state);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const onNavigateToProfile = () => {
    handleMenuClose();
    history.push('/user/profile');
  };

  const onLogout = () => {
    dispatch(handleLogout());
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (!credentials?.username) {
      dispatch(toggleModal({}));
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const menuList = [
    {
      fn: onNavigateToProfile,
      text: 'Profile',
    },
    {
      fn: onLogout,
      text: 'Logout',
    },
  ];
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {menuList.map((item) => (
        <MenuItem key={item.text} className={classes.menu} onClick={item.fn}>
          {item.text}
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <>
      <Button
        onClick={handleProfileMenuOpen}
        className={classes.user}
        color="inherit"
        startIcon={<PersonOutlineIcon />}
      >
        {!credentials?.username && `${t('user_auth.signin.header')}`}
      </Button>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        className={classes.mobileUser}
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <SvgIcon component={PersonOutlineIcon} color="inherit" />
      </IconButton>
      {location.pathname === routesPath.USER_PROFILE && (
        <>
          <div className={classes.gap} />
          <div className={classes.gap} />
          <div className={classes.gap} />
          <div className={classes.gap} />
          <div className={classes.gap} />
          <div className={classes.userBorder} />
        </>
      )}
      {renderMenu}
    </>
  );
}
