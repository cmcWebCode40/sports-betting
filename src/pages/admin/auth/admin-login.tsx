import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import {
  LockOutlined as LockOutlinedIcon,
  EmailOutlined as EmailOutLinedIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons/';
import {
  Input,
  Paper,
  Avatar,
  Button,
  InputAdornment,
  Grid,
  Typography,
  Container,
  IconButton,
} from '@material-ui/core';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAdminAuthStyles } from './style';
import {
  IUserResponse,
  userAuthenticationFn,
  ISignInInputs,
} from '../../../logic/admin/login.logic';
import { handleAuthentication } from '../../../provider/features/auth/auth';
import { IErrorArgs } from '../../../models/error-handler.model';

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

const AdminLogin = (): JSX.Element => {
  const classes = useAdminAuthStyles();
  const dispatch = useDispatch();
  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    showPassword: false,
  });
  const [errorMessage, setErrorMessage] = React.useState('');
  const history = useHistory();

  const { mutate, isLoading } = useMutation<IUserResponse, IErrorArgs, ISignInInputs, unknown>(
    (data) => userAuthenticationFn<ISignInInputs, IUserResponse>({ data, endPoint: 'signin' }),
  );

  function onSuccess(res: IUserResponse) {
    dispatch(handleAuthentication({ userData: res?.data?.data }));
    history.push(`/admin/dashboard`);
  }

  const userAuthError = (error: IErrorArgs): void | Promise<unknown> => {
    setErrorMessage(error.response.data.message || 'Something Went Wrong');
    toast.error(error.response.data.message, {
      toastId: '1',
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      email: values.email,
      password: values.password,
    };
    mutate(data, {
      onSuccess,
      onError: userAuthError,
    });
  };

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} onSubmit={onSubmit} noValidate>
          {errorMessage && (
            <Alert severity="error" data-testid="error" variant="outlined">
              {errorMessage}
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                fullWidth
                placeholder="email"
                onChange={handleChange('email')}
                startAdornment={
                  <InputAdornment position="start">
                    <EmailOutLinedIcon color="primary" />
                  </InputAdornment>
                }
                inputProps={{ 'aria-label': 'description' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                fullWidth
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                }
                id="standard-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="password"
                inputProps={{ 'aria-label': 'description' }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!!isLoading}
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
