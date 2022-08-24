import React from 'react';
import { createStyles, IconButton, makeStyles, SvgIcon } from '@material-ui/core';
import { ReactComponent as FacebookIcon } from './icons/Facebook.svg';
import { ReactComponent as InstagramIcon } from './icons/Instagram.svg';
import { ReactComponent as TwitterIcon } from './icons/Twitter_1.svg';
import { useAppSelector } from '../../provider/hooks/hooks';

const useStyles = makeStyles(() =>
  createStyles({
    icons: {
      width: '40px',
      height: '170px',
      position: 'fixed',
      top: '200px',
      right: '0',
      padding: '31px 10px 28px 10px',
      backgroundColor: '#369074',
      borderTopLeftRadius: '8px',
      borderBottomLeftRadius: '8px',
    },
    button: {
      width: '20px',
      height: '20px',
      marginBottom: '20px',
    },
  }),
);

export const SocialMedia = (): JSX.Element => {
  const classes = useStyles();
  const scLinks = useAppSelector((state) => state.bookmarkers.app?.socialLinks);

  if (!scLinks) {
    return <span />;
  }

  return (
    <div className={classes.icons}>
      <IconButton className={classes.button} target="_blanck" href={scLinks.facebook}>
        <SvgIcon component={FacebookIcon} />
      </IconButton>
      <IconButton className={classes.button} target="_blanck" href={scLinks.instagram}>
        <SvgIcon component={InstagramIcon} />
      </IconButton>
      <IconButton className={classes.button} target="_blanck" href={scLinks.twitter}>
        <SvgIcon component={TwitterIcon} />
      </IconButton>
    </div>
  );
};

export default SocialMedia;
