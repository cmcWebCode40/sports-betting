import React, { Dispatch, SetStateAction, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import { createStyles, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PaymentTable from './payment-table';
import { IPayment, paymentMethods } from '../../../../logic/admin/all-bookmarkers.logic';
import genRandomId from '../../../../helpers/gen-random-Id';
import { ITheme } from '../../../../themes/theme';

export const useStyle = makeStyles((theme: ITheme) =>
  createStyles({
    text: {
      fontSize: theme.typography.h4.fontSize,
      margin: theme.spacing(1.2, 0),
      fontWeight: 600,
      color: theme.palette.black,
    },
    error: {
      margin: theme.spacing(0.4, 0),
    },
  }),
);

interface IPaymentMethods {
  data: IPayment[];
  setData: Dispatch<SetStateAction<IPayment[]>>;
  title: string;
}

const PaymentMethods = ({ data, setData, title }: IPaymentMethods): JSX.Element => {
  const classes = useStyle();
  const [values, setValues] = useState({
    paymentMethod: 'visa',
    min: '',
    max: '',
    duration: '',
    currency: '$',
    id: '1',
  });
  const [errorMgs, setErrorMgs] = useState('');

  const addPaymentType = () => {
    // const isValidated = Object.keys
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(values)) {
      if (!value) {
        setErrorMgs(`no values for ${key}`);
        return;
      }
    }
    setValues((fields) => ({ ...fields, id: genRandomId() }));
    setData([...data, values]);
    setErrorMgs(``);
  };

  const removePaymentType = (id: string): void => {
    const items = data.filter((item) => item.id !== id);
    setData(items);
  };

  const onChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((fields) => ({ ...fields, [name]: value }));
  };

  return (
    <div>
      <Typography className={classes.text} variant="h6" id="tableTitle">
        {title}
      </Typography>
      <Divider />
      {errorMgs && (
        <Alert className={classes.error} severity="error">
          {errorMgs}
        </Alert>
      )}
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <TextField
            onChange={onChangeEvent}
            label="Payment Method"
            id={`${Math.random()}-id`}
            select
            fullWidth
            value={values.paymentMethod}
            name="paymentMethod"
            variant="outlined"
          >
            <MenuItem value="">Choose Payment Method</MenuItem>
            {paymentMethods.map((option: string) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            id={`${Math.random()}-id`}
            onChange={onChangeEvent}
            name="min"
            label="Min"
            fullWidth
            variant="outlined"
            type="number"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            onChange={onChangeEvent}
            name="max"
            id={`${Math.random()}-id`}
            label="Max"
            fullWidth
            variant="outlined"
            type="number"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            id={`${Math.random()}-id`}
            onChange={onChangeEvent}
            name="duration"
            label="Duration"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            id={`${Math.random()}-id`}
            onChange={onChangeEvent}
            name="currency"
            label="Currency"
            select
            value="$"
            fullWidth
            variant="outlined"
          >
            <MenuItem value="">Choose Currency</MenuItem>
            {[{ name: '$', id: 1 }].map((option: any) => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item md={12} xs={12}>
          <Button onClick={addPaymentType} variant="contained" color="primary" fullWidth>
            ADD
          </Button>
        </Grid>
      </Grid>
      <PaymentTable data={data} onDelete={removePaymentType} />
    </div>
  );
};

export default PaymentMethods;

export {};
