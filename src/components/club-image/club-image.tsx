import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import sportLogo from '../../assets/icons/default_sports.png';
import { ITheme } from '../../themes/theme';

const useStyle = makeStyles((theme: ITheme) =>
  createStyles({
    teamImg: {
      width: '24px',
      height: '24px',
    },
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      textAlign: 'center',
    },
  }),
);

interface IClubImage {
  src: string;
  styles?: CSSProperties;
}
interface IImageLoader {
  logo: string;
  isError: boolean;
}

const ClubLogo = ({ src, styles }: IClubImage): JSX.Element => {
  const classes = useStyle();
  const [image, setImage] = useState<IImageLoader>({
    logo: '',
    isError: false,
  });

  const onError = () => {
    setImage({
      logo: sportLogo,
      isError: true,
    });
  };

  useEffect(() => {
    setImage({
      logo: src,
      isError: false,
    });
  }, [src]);

  return (
    <img
      src={image.logo || sportLogo}
      onError={onError}
      style={styles}
      className={classes.teamImg}
      alt="team-logo"
    />
  );
};

export default ClubLogo;
