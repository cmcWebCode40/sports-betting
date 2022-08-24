/* eslint-disable no-plusplus */
/* eslint-disable react/display-name */
import React, { forwardRef, useState, useMemo } from 'react';
import { Box, Button, createStyles, IconButton, makeStyles } from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import { ReactComponent as CalendarIcon } from '../../assets/icons/icon_calendar.svg';
import { ITheme } from '../../themes/theme';
import genRandomId from '../../helpers/gen-random-Id';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
      margin: '1rem 0 0 0 ',
      overflowX: 'auto',
    },
    activeButton: {
      width: '132px',
      height: '2.5rem',
      fontWeight: 600,
      fontSize: '1rem',
      textTransform: 'capitalize',
      color: theme.palette.oceanGreen.main,
      border: `solid 1px ${theme.palette.oceanGreen.main}`,
      borderBottomLeftRadius: '0',
      borderBottomRightRadius: '0',
      background: theme.palette.veryLightPink.main,
    },
    button: {
      fontSize: '1rem',
      width: '132px',
      height: '2.5rem',
      textTransform: 'capitalize',
      color: theme.palette.mediumGrey.main,
      '&:hover': {
        border: `solid 1px ${theme.palette.oceanGreen.main}`,
        borderBottomLeftRadius: '0',
        borderBottomRightRadius: '0',
      },
    },
  }),
);

type TDateList = {
  month: string;
  day: number;
};

const leapMonths = ['sep', 'Apr', 'Jun', 'Nov'];

const monthAbr = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const getMonth = (month: string) => {
  let addedMonth;
  if (month !== 'Dec') {
    const indexOfMonth = monthAbr.indexOf(month);
    addedMonth = monthAbr[indexOfMonth + 1];
  } else {
    const [firstMonth] = monthAbr;
    addedMonth = firstMonth;
  }
  return addedMonth;
};

interface IDatePanel {
  maxDate?: number;
  startDate: any;
  setStartDate: any;
}

export const DatePanel = ({ maxDate = 7, startDate, setStartDate }: IDatePanel): JSX.Element => {
  const classes = useStyles();
  const [state, setState] = useState(0);
  const [picked, setPicked] = useState(false);
  const [dateLimit] = useState(maxDate);
  const [dateList, setDateList] = useState<TDateList[]>([]);

  const { t } = useTranslation();

  const DateSelector = forwardRef(({ onClick }: any, ref: any) => (
    <IconButton onClick={onClick} ref={ref}>
      <SvgIcon component={CalendarIcon} />
    </IconButton>
  ));

  const setViewCalender = () => {
    if (!picked) {
      const selectedDates = [];
      const proceedingMonth: TDateList[] = [];
      const date = startDate?.toDateString()?.split(' ');

      const selectedMonth = date[1];
      const dateToNumber = Number(date[2]);
      const nextMonth = getMonth(selectedMonth);

      const validateDate = () => {
        if (dateToNumber >= 24 && !leapMonths.includes(selectedMonth)) {
          const newNumber = 31 - dateToNumber;
          for (let index = 0; index < dateLimit - newNumber; index++) {
            proceedingMonth.push({ month: nextMonth, day: index + 1 });
          }
          return newNumber;
        }
        if (dateToNumber >= 24 && leapMonths.includes(selectedMonth)) {
          const newNumber = 30 - dateToNumber;
          for (let index = 0; index < 6 - newNumber; index++) {
            proceedingMonth.push({ month: nextMonth, day: index + 1 });
          }
          return newNumber;
        }
        return dateLimit;
      };
      const testValidateDate = () => {
        if (dateToNumber >= 24 && !leapMonths.includes(selectedMonth)) {
          const newNumber = 32 - dateToNumber;
          return newNumber;
        }
        if (dateToNumber >= 24 && leapMonths.includes(selectedMonth)) {
          const newNumber = 31 - dateToNumber;
          return newNumber;
        }
        return dateLimit;
      };
      validateDate();
      const days = testValidateDate();
      for (let index = 0; index < days; index++) {
        selectedDates.push({ month: selectedMonth, day: index + dateToNumber - 1 + 1 });
      }
      setState(0);
      if (proceedingMonth.length) {
        setDateList(selectedDates.concat(proceedingMonth));
      } else {
        setDateList(selectedDates);
      }
    }
  };

  const onSelectDate = (item: any, index: number) => {
    setPicked(true);
    const UTCFormat = new Date().toString().split(' ');
    UTCFormat[2] = `${item.day}`;
    const date = new Date(UTCFormat.join(' '));

    setStartDate(date);
    setState(index);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => setViewCalender(), [startDate]);

  return (
    <div>
      <div className={classes.root}>
        {dateList.map((list, index) => (
          <Button
            variant="text"
            className={state === index ? classes.activeButton : classes.button}
            onClick={() => {
              onSelectDate(list, index);
            }}
            key={genRandomId()}
          >
            {t(`homepage.date_panel_section.${list.month.toLowerCase()}`, {
              date: list.day,
            })}
          </Button>
        ))}
        <Box display="flex">
          <div />
          <DatePicker
            selected={startDate}
            onChange={(date: any) => {
              setPicked(false);
              setStartDate(date);
            }}
            customInput={<DateSelector />}
          />
        </Box>
      </div>
    </div>
  );
};

export default DatePanel;
