import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, SvgIcon } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { ReactComponent as SortIcon } from '../../assets/icons/sorting_icon.svg';
import { ITheme } from '../../themes/theme';
import { sortLettersAlphabetically } from '../../utils/common.helpers';
import { TAppBookMaker } from '../../models/bookmarkers.model';
import { updateBookmaker } from '../../provider/features/bookmarkers';
import { useAppSelector } from '../../provider/hooks/hooks';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      display: 'flex',
      margin: theme.spacing(1.3, 0),
    },
    button: {
      textTransform: 'capitalize',
      color: theme.palette.grayishBrown.main,
      fontSize: theme.typography.subtitle1.fontSize,
      [theme.breakpoints.down('md')]: {
        fontSize: '0.7rem',
      },
    },
    activeButton: {
      // margin: '21px 29px 24px 24px',
      padding: '6px 15px 8px 16px',
      textTransform: 'capitalize',
      borderRadius: theme.shape.borderRadius,
      border: `solid 1px ${theme.palette.oceanGreen.main}`,
      fontWeight: 600,

      color: theme.palette.oceanGreen.main,
      [theme.breakpoints.down('md')]: {
        fontSize: '0.7rem',
      },
    },
    boxParent: {
      margin: theme.spacing(0, 2),
      '& >*': {
        margin: theme.spacing(0, 1),
      },
    },
    sortButton: {
      textTransform: 'capitalize',
      color: theme.palette.grayishBrown.main,
      fontSize: theme.typography.subtitle1.fontSize,
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    sortButtonMobile: {
      display: 'none',
      margin: '0.3rem 0 -1.8rem 0',
      color: theme.palette.grayishBrown.main,
      fontSize: theme.typography.subtitle1.fontSize,
      [theme.breakpoints.down('md')]: {
        display: 'block',
      },
    },
  }),
);

const betSortList: Array<{
  title: TSortType;
}> = [
  {
    title: 'Alphabetical',
  },
];

type TSortType = 'Alphabetical';

const BookMarkerSortingBar = (): JSX.Element => {
  const classes = useStyles();
  const [activeState, setActiveState] = useState(1);
  const dispatch = useDispatch();
  const { oddsBugBookmakers } = useAppSelector((state) => state.bookmarkers);
  const onSelectType = (index: number): void => setActiveState(index);
  const filterOptions = (type: TSortType): void => {
    switch (type) {
      case 'Alphabetical': {
        const sortedData = sortLettersAlphabetically<TAppBookMaker>(oddsBugBookmakers, 'name');
        dispatch(updateBookmaker(sortedData));
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className={classes.root}>
      <Button className={classes.sortButton} startIcon={<SvgIcon component={SortIcon} />}>
        Sorting Criteria:
      </Button>
      <SvgIcon className={classes.sortButtonMobile} component={SortIcon} />
      <Box className={classes.boxParent} display="flex" justifyContent="space-between">
        {betSortList.map((list, index) => (
          <Button
            onClick={() => {
              onSelectType(index);
              filterOptions(list.title);
            }}
            className={activeState === index ? classes.activeButton : classes.button}
            key={list.title}
          >
            {list.title}
          </Button>
        ))}
      </Box>
    </div>
  );
};

export default BookMarkerSortingBar;
