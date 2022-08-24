import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { AppDrawer } from '..';
import { ITheme } from '../../themes/theme';
import { navLinks } from '../header/components/navbar-panel';
import { useAppSelector } from '../../provider/hooks/hooks';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    appBar: {
      top: 'auto',
      bottom: 0,
      color: `${theme.palette.white}`,
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    grow: {
      flexGrow: 1,
    },
    listNav: {
      display: 'flex',
      background: theme.palette.primary.main,
      textAlign: 'right',
      padding: '2rem 0.4rem',
    },
    listItem: {
      color: `${theme.palette.white} `,
    },
    ul: {
      color: `${theme.palette.white} `,
      listStyle: 'none',
      margin: '1rem 0.5rem',
      '& li': {
        color: `${theme.palette.white} `,
        margin: '1rem 0.5rem',
        fontSize: '1rem',
        '& a': {
          color: `${theme.palette.white} `,
          textDecoration: 'none',
        },
      },
    },
  }),
);

const buttonProps = {
  'aria-label': 'open drawer',
  color: 'inherit',
  startIcon: <MenuIcon />,
};

export const BottomAppBar: React.FC = () => {
  const classes = useStyles();
  const { activeSport } = useAppSelector((state) => state.bookmarkers);

  const list = (
    <div className={classes.listNav}>
      <div className={classes.grow} />
      <ul className={classes.ul}>
        {navLinks(activeSport.name).map((text) => (
          <li key={text.title}>
            <Link to={text.path}>{text.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <div className={classes.grow} />
        <AppDrawer buttonText="MENU" anchorProps="bottom" buttonProps={buttonProps}>
          {list}
        </AppDrawer>
      </Toolbar>
    </AppBar>
  );
};

export default BottomAppBar;
