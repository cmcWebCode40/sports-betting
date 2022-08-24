import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useAppDispatch, useAppSelector } from '../../provider/hooks/hooks';
import { setTimeZone } from '../../provider/features/bookmarkers';
import { ITheme } from '../../themes/theme';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    toggleBtn: {
      background: 'transparent',
      fontWeight: 600,
      textTransform: 'capitalize',
      color: theme.palette.oceanGreen.main,
      borderRadius: theme.shape.borderRadius,
      outline: 'none',
      border: 'none',
      // margin: theme.spacing(1.5, 0, -0.5, 0),
    },
  }),
);

interface ITime {
  fullWidth?: boolean;
}

export default function TimeZoneSelector({ fullWidth }: ITime): JSX.Element {
  const classes = useStyles();
  const { timezone } = useAppSelector((state) => state.bookmarkers);

  const dispatch = useAppDispatch();

  const updateTimezone = (zoneName: string) => {
    dispatch(setTimeZone(zoneName));
  };

  return (
    <Autocomplete
      fullWidth={fullWidth}
      id="tz-id"
      options={timezone.list}
      getOptionLabel={(option) => option.value}
      style={{ width: 300 }}
      onChange={(event, data: any) => {
        if (data) {
          updateTimezone(data.value);
        }
      }}
      renderInput={(params) => (
        <TextField
          margin="dense"
          className={classes.toggleBtn}
          {...params}
          placeholder={timezone.active}
          variant="outlined"
        />
      )}
    />
  );
}
