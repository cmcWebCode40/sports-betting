import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ITheme } from '../../../themes/theme';
import LogoIcon from '../../../assets/icons/oddsbug_logotype-01.svg';

const useStyles = makeStyles(({ breakpoints }: ITheme) =>
  createStyles({
    root: {
      height: 60,
      margin: '-0.8rem 4rem 0.3rem -4rem',
    },
    link: {
      textDecoration: 'none',
      width: '3rem',
      height: '1.5rem',
      textTransform: 'capitalize',
      [breakpoints.down('sm')]: {
        order: 2,
      },
    },
  }),
);

const Logo: React.FC = () => {
  const classes = useStyles();

  return (
    <Link to="/" className={classes.link}>
      <img src={LogoIcon} className={classes.root} alt="company" />
    </Link>
  );
};

export default Logo;
