import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useAuthStyles } from '../styles/auth.styles';
import {
  IResetPassword,
  ResetPasswordSchema,
  userAuthenticationFn,
} from '../../../logic/auth/user-authentication.logic';
import { IErrorArgs } from '../../../models/error-handler.model';
import BackDropLoader from '../../../components/loaders/backdrop-loader';

const PasswordReset: React.FC = () => {
  const classes = useAuthStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = React.useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPassword>({
    resolver: yupResolver(ResetPasswordSchema),
  });
  const { mutate, isLoading, isSuccess } = useMutation<
    unknown,
    IErrorArgs,
    IResetPassword,
    unknown
  >((data) => userAuthenticationFn<IResetPassword, unknown>({ data, endPoint: 'reset-password' }));

  const OnPasswordReset = () => {
    history.push(`?user_auth_type=${1}&type=signup`);
  };

  const userAuthError = (error: IErrorArgs): void | Promise<unknown> => {
    setErrorMessage(error.response.data.message);
  };
  const onSuccess = () => {
    toast.success(t('user_auth.signin.email_sent'));
    setErrorMessage('');
  };

  const onSubmit = (data: IResetPassword) => mutate(data, { onSuccess, onError: userAuthError });

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      {errorMessage && (
        <Alert severity="error" data-testid="error-message" color="error" variant="outlined">
          {errorMessage}
        </Alert>
      )}
      {isLoading && <BackDropLoader message="please wait" isOpened={isLoading} />}
      {isSuccess && (
        <Typography className={classes.title} data-testid="success" variant="h4">
          {t('user_auth.signin.email_sent')}
        </Typography>
      )}
      <div className={classes.formControl}>
        <TextField
          fullWidth
          margin="dense"
          color="secondary"
          variant="outlined"
          {...register('email')}
          error={!!errors?.email}
          helperText={
            errors?.email?.message && <span className={classes.error}>{errors.email?.message}</span>
          }
          id="user_auth.signin.registered_email"
          label={t('user_auth.signin.registered_email')}
        />
      </div>
      <div>
        <Button variant="text" onClick={OnPasswordReset} className={classes.subButton}>
          {t('user_auth.signup.header')}
        </Button>
      </div>
      <div className={classes.actionArea}>
        <Button fullWidth type="submit" color="default" variant="contained" disabled={!!isLoading}>
          {t('user_auth.signin.send_email')}
        </Button>
      </div>
    </form>
  );
};

export default PasswordReset;
