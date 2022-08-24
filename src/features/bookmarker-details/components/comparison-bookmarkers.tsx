import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Rating from '@material-ui/lab/Rating';
import SvgIcon from '@material-ui/core/SvgIcon';
import CloseIcon from '@material-ui/icons/Close';
import { ReactComponent as GoodIcon } from '../../../assets/icons/green_check.svg';
import { ReactComponent as AndroidIcon } from '../../../assets/icons/noun_Android_824395.svg';
import { ReactComponent as IosIcon } from '../../../assets/icons/noun_mac_2076879.svg';
import { useComparisonStyles } from '../styles/bookmakers-details.styles';
import { TAppBookMaker } from '../../../models/bookmarkers.model';

interface IBlockDisplay {
  title?: string | number;
  value?: string | number;
}

const BlockDisplay = ({ title, value }: IBlockDisplay) => {
  const classes = useComparisonStyles();
  return (
    <div className={classes.blockDisplay}>
      <Typography className={classes.subtitle1} variant="subtitle1">
        {title}
      </Typography>
      <Typography className={classes.caption} variant="caption">
        {value}
      </Typography>
    </div>
  );
};

const BlockIcon = ({ title, value }: { title: string; value: any }) => {
  const classes = useComparisonStyles();
  return (
    <div className={classes.blockDisplay}>
      <Typography className={classes.subtitle1} variant="subtitle1">
        {title}
      </Typography>
      <Typography className={classes.caption} variant="caption">
        {value}
      </Typography>
    </div>
  );
};

interface IComparisonBookmarkers {
  data: TAppBookMaker;
  onRemove: (arg0: string | number) => void;
}

const ComparisonBookmarkers = ({ data, onRemove }: IComparisonBookmarkers): JSX.Element => {
  const classes = useComparisonStyles();

  if (!data?.id) {
    return (
      <Typography variant="h4" align="center">
        No Data
      </Typography>
    );
  }

  return (
    <div className={classes.root}>
      <IconButton
        className={classes.closeIcon}
        onClick={() => onRemove(data?.id as string | number)}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h4" className={classes.title}>
        {data.name}
      </Typography>
      <Typography className={classes.bookmarkerLogo}>
        <img src={data.logo} alt={data.name} />
      </Typography>
      <BlockDisplay title="Rating" value="6.5" />
      <Rating name="read-only" className={classes.rating} value={2.5} readOnly />
      <BlockDisplay title="Welcome Bonus" value="$100" />
      <BlockDisplay title="Bonus Percentage" value="%100" />
      <BlockDisplay
        title="Minimum Deposit"
        value={`${data?.deposit[0]?.currency}${data?.deposit[0]?.max}`}
      />
      <BlockIcon title="Live Betting" value={<SvgIcon component={GoodIcon} />} />
      <BlockIcon title="Live broadcast" value={<SvgIcon component={GoodIcon} />} />
      <BlockIcon title="Cashout" value={<SvgIcon component={GoodIcon} />} />
      <BlockIcon
        title="Cashout"
        value={
          <>
            <SvgIcon component={AndroidIcon} />
            <SvgIcon component={IosIcon} />
          </>
        }
      />
    </div>
  );
};

export default ComparisonBookmarkers;
