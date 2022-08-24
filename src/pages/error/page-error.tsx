import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { ReactComponent as SportsBasketballIcon } from '../../assets/icons/icon_Basketball_black.svg';
import { ReactComponent as SportsBaseballIcon } from '../../assets/icons/icon_Tennis_black.svg';
import { ReactComponent as MotorcycleIcon } from '../../assets/icons/icon_Esport_black.svg';
import { ITheme } from '../../themes/theme';
import { Header } from '../../components';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      background: theme.palette.primary.light,
      height: '100vh',
    },
    content: {
      padding: '11.625rem 1rem 0 1rem',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },
    balls: {
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    textInfo: {
      inlineSize: '253px',
      overflowWrap: 'break-word',
      margin: '20px 39px 2px 0',
      fontSize: '20px',
      fontFamily: 'Source Sans Pro',
      color: theme.palette.white,
    },
    button: {
      height: '30px',
      margin: '0 3px 0 0',
      borderRadius: '3px',
      fontWeight: 600,
      padding: '0.4rem 1rem',
      background: theme.palette.white,
      color: theme.palette.black,
    },
    title: {
      height: '38px',
      margin: '0 61px 20px 0',
      color: theme.palette.white,
      fontSize: '30px',
    },
    infoBlock: {
      '& > *': {
        margin: theme.spacing(2, 0),
      },
    },
    stage: {
      margin: theme.spacing(2, 0.5),
    },
    icon: {
      height: 70,
      width: 70,
    },
  }),
);

const iconStyle = {
  height: 70,
  width: 70,
  fill: '#fff',
};

interface IPageError {
  title: string;
  link: string;
  linkText: string;
  content: string;
  hideHeader?: boolean;
  styles?: CSSProperties;
}

const PageError = ({
  title,
  link,
  linkText,
  content,
  styles,
  hideHeader,
}: IPageError): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root} style={styles}>
      {!hideHeader && <Header />}
      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        className={classes.content}
      >
        <div className={classes.infoBlock}>
          <Typography variant="h3" className={classes.title}>
            {title}
          </Typography>
          <Typography className={classes.textInfo} variant="body1">
            {content}
          </Typography>
          <Button href={link} className={classes.button} variant="contained">
            {linkText}
          </Button>
        </div>
        <div className={classes.balls}>
          <Typography variant="body1" />
          <Box display="flex">
            <div className={classes.stage}>
              <SvgIcon
                style={iconStyle}
                className="box1 bounce-1"
                component={SportsBasketballIcon}
              />
            </div>
            <div className={classes.stage}>
              <SvgIcon style={iconStyle} className="box2 bounce-1" component={SportsBaseballIcon} />
            </div>
            <div className={classes.stage}>
              <SvgIcon style={iconStyle} className="box3 bounce-1" component={MotorcycleIcon} />
            </div>
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default PageError;
