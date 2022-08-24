import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useBookmakerPlatformStyles } from './style/home.styles';
import { ReactComponent as AndroidIcon } from '../../../assets/icons/noun_Android_824395.svg';
import { ReactComponent as IosIcon } from '../../../assets/icons/noun_mac_2076879.svg';
import { ReactComponent as NotGoodIcon } from '../../../assets/icons/Path 10.svg';
import { TAppBookMaker } from '../../../models/bookmarkers.model';

const BookmakerPlatformDetails = ({ data }: { data: TAppBookMaker }): JSX.Element => {
  const classes = useBookmakerPlatformStyles();
  const { t } = useTranslation();
  const pathToTranslation = 'homepage.bookmarker_detail_card';
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.bookMakerLogo}>
          <img height="30" src={data.logo} alt={data.name} />
        </div>
        <Box className={classes.boxContent} display="flex">
          <div>
            <Typography className={classes.boxText} variant="h5">
              {t(`${pathToTranslation}.bonus_percentage_text`)}
            </Typography>
            <Typography className={classes.boxText} variant="h5">
              {t(`${pathToTranslation}.minimum_deposit_text`)}
            </Typography>
            <Typography className={classes.boxText} variant="h5">
              {t(`${pathToTranslation}.live_betting_text`)}
            </Typography>
            <Typography className={classes.boxText} variant="h5">
              {t(`${pathToTranslation}.live_broadcast_text`)}
            </Typography>
            <Typography className={classes.boxText} variant="h5">
              {t(`${pathToTranslation}.cash_out_text`)}
            </Typography>
            <Typography className={classes.boxText} variant="h5">
              {t(`${pathToTranslation}.platforms_text`)}
            </Typography>
          </div>
          <div>
            <Typography className={classes.boxSpan}>%100</Typography>
            <Typography className={classes.boxSpan}>
              {/* {data?.deposit[0]?.currency}
              {data?.deposit[0]?.min} */}
            </Typography>
            <div>
              <SvgIcon component={NotGoodIcon} className={classes.boxSpan} />
            </div>
            <div>
              <SvgIcon component={NotGoodIcon} className={classes.boxSpan} />
            </div>
            <div>
              <SvgIcon component={NotGoodIcon} className={classes.boxSpan} />
            </div>
            <div>
              <SvgIcon component={AndroidIcon} />
              <SvgIcon component={IosIcon} />
            </div>
          </div>
        </Box>
        <div className={classes.buttonWrapper}>
          <div>
            <Button
              href={data?.registrationLink}
              className={classes.button}
              variant="contained"
              fullWidth
              color="primary"
            >
              {t(`${pathToTranslation}.action_buttons.go_to_website`)}
            </Button>
          </div>
          <div>
            <Button
              href={data?.registrationLink}
              className={classes.button}
              variant="contained"
              fullWidth
              color="secondary"
            >
              {t(`${pathToTranslation}.action_buttons.register_text`)}
            </Button>
          </div>
          <div>
            <span className={classes.fullPreview}>
              {' '}
              <Link className={classes.fullPreviewLink} to={`/bookmakers/${data?.id}`}>
                {t(`${pathToTranslation}.action_buttons.go_to_full_review`)}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmakerPlatformDetails;
