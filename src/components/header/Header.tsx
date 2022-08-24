/* eslint-disable no-bitwise */
import React from 'react';
import { createStyles, makeStyles, useMediaQuery } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Logo from './components/Logo';
import { SearchBar } from '..';
import NavBarPanel from './components/navbar-panel';
import { ITheme } from '../../themes/theme';
import UserIconNav from './components/user-icon-nav';
import LanguageSelector from './components/langauge-selector';
import { mdTabletView } from '../../themes/theme.constants';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      height: '50px',
      backgroundColor: theme.palette.primary.main,
      backgroundImage: theme.palette.primary.light,
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'space-between',
        padding: theme.spacing(0),
        margin: theme.spacing(0),
      },
    },
    languageWrapper: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      '& >*': {
        margin: theme.spacing(0.6, 0),
      },
      [theme.breakpoints.down('sm')]: {
        '& >*': {
          margin: theme.spacing(0, 6),
        },
      },
    },
  }),
);

export const Header: React.FC = () => {
  const classes = useStyles();
  const matches = useMediaQuery(`(max-width:${mdTabletView})`);

  return (
    <header className={classes.root}>
      <Container className={classes.wrapper}>
        <Logo />
        <NavBarPanel />
        <div className={classes.languageWrapper}>
          <LanguageSelector />
        </div>
        <SearchBar />
        {matches ? (
          <UserIconNav />
        ) : (
          <div>
            <UserIconNav />
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
