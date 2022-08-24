import React, { SetStateAction } from 'react';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, SvgIcon } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ITheme } from '../../themes/theme';
import { ReactComponent as SortIcon } from '../../assets/icons/sorting_icon.svg';
import { TSortType } from '../../models';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      margin: theme.spacing(1, 0, -1, 0),
    },
    button: {
      textTransform: 'capitalize',
      [theme.breakpoints.down('md')]: {
        fontSize: '0.7rem',
      },
    },
    activeButton: {
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
      '&:hover': {
        background: '#fff',
      },
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    sortButtonMobile: {
      display: 'none',
      margin: '0.3rem 0 -1.8rem 0',
      [theme.breakpoints.down('md')]: {
        display: 'block',
      },
    },
    checkBoxForm: {
      color: `${theme.palette.white}`,
    },
    checkBoxForm2: {
      color: `${theme.palette.white}`,
      margin: theme.spacing(0, 0, 0, 2),
    },
    selectLive: {
      display: 'inline',
      height: '50px',
      margin: theme.spacing(2, 0, 0, 0),
      padding: theme.spacing(0.3),
      background: theme.palette.primary.light,
      borderRadius: theme.shape.borderRadius,
    },
    contentWrapper: {
      justifyContent: 'space-between',
    },
  }),
);

interface IBettingSortingPanel {
  showLiveMatches?: boolean;
  setActiveState: React.Dispatch<SetStateAction<number>>;
  activeState: number;
  customTypes?: TSortType;
  onFilter: (arg: TSortType) => any;
}
const pathToTranslation = 'livescores_page.header_section';

export const BettingSortingPanel = ({
  showLiveMatches,
  onFilter,
  activeState,
  setActiveState,
  customTypes,
}: IBettingSortingPanel): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation();
  const onSelectType = (index: number): void => setActiveState(index);

  const betSortList: Array<{
    title: TSortType;
    value: TSortType;
  }> = [
    {
      title: t(`${pathToTranslation}.start_time_label_text`),
      value: 'Start Time',
    },
    {
      title: t(`${pathToTranslation}.country_label_text`),
      value: 'Country',
    },
  ];

  const renderAcceptedOptions = () => {
    if (customTypes) {
      return betSortList.filter((item) => item.value !== customTypes);
    }

    return betSortList;
  };

  return (
    <div className={classes.root}>
      <Box className={classes.contentWrapper} display="flex">
        <Box display="flex">
          <Button className={classes.sortButton} startIcon={<SvgIcon component={SortIcon} />}>
            {`${t(`${pathToTranslation}.sorting_criteria_text`)}:`}
          </Button>
          <SvgIcon className={classes.sortButtonMobile} component={SortIcon} />
          <Box className={classes.boxParent} display="flex" justifyContent="space-between">
            {renderAcceptedOptions().map((list, index) => (
              <Button
                onClick={() => {
                  onSelectType(index);
                  onFilter(list.value);
                }}
                className={activeState === index ? classes.activeButton : classes.button}
                key={list.title}
              >
                {list.title}
              </Button>
            ))}
          </Box>
        </Box>
        {showLiveMatches && (
          <span className={classes.selectLive}>
            <FormControlLabel
              classes={{
                label: classes.checkBoxForm,
              }}
              control={
                <Checkbox
                  classes={{
                    root: classes.checkBoxForm2,
                  }}
                  name="liveBets"
                />
              }
              label="Show Only Live Matches"
            />
          </span>
        )}
      </Box>
    </div>
  );
};

export default BettingSortingPanel;
