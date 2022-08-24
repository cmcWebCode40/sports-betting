import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import Alert from '@material-ui/lab/Alert';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthStyles } from '../styles/auth.styles';
import {
  ChangePasswordSchema,
  IUpdatePassword,
  userAuthenticationFn,
} from '../../../logic/auth/user-authentication.logic';
import { IErrorArgs } from '../../../models/error-handler.model';
import BackDropLoader from '../../../components/loaders/backdrop-loader';

interface IPasswordUpdate {
  tokenId: string;
}

const PasswordUpdate = ({ tokenId }: IPasswordUpdate): JSX.Element => {
  const classes = useAuthStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdatePassword>({
    resolver: yupResolver(ChangePasswordSchema),
  });
  const [errorMessage, setErrorMessage] = React.useState('');
  const { mutate, isLoading, isSuccess } = useMutation<
    unknown,
    IErrorArgs,
    IUpdatePassword,
    unknown
  >((data) =>
    userAuthenticationFn<IUpdatePassword, unknown>({ data, endPoint: 'change-password' }),
  );

  function onSuccess(): void {
    toast.success(`Password Successfully updated`);
    history.push(`?step=0&type=signin`);
  }

  const userAuthError = (error: IErrorArgs): void | Promise<unknown> => {
    setErrorMessage(error.response.data.message);
  };

  const onSubmit = (data: IUpdatePassword) => {
    if (!tokenId) {
      setErrorMessage('Reset Password link is invalid');
    } else {
      const postData = {
        token: tokenId,
        password: data?.password,
      };
      mutate(postData, {
        onSuccess,
        onError: userAuthError,
      });
    }
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      {errorMessage && (
        <Alert severity="error" data-testid="error" variant="outlined">
          {errorMessage}
        </Alert>
      )}
      {isLoading && <BackDropLoader message="creating user" isOpened={isLoading} />}
      <Typography variant="h3" className={classes.title} align="center" color="inherit">
        {t('user_auth.signin.update_password_title')}
      </Typography>
      {isSuccess && (
        <Typography
          variant="h3"
          data-testid="success"
          className={classes.title}
          align="center"
          color="inherit"
        >
          {t('user_auth.signin.password_saved')}
        </Typography>
      )}
      <div className={classes.formControl}>
        <TextField
          margin="dense"
          fullWidth
          color="secondary"
          id="user_auth.password"
          variant="outlined"
          label={t('user_auth.password')}
          {...register('password')}
          error={!!errors?.password}
          helperText={
            errors?.password?.message && (
              <span className={classes.error}>{errors.password?.message}</span>
            )
          }
        />
      </div>
      <div className={classes.formControl}>
        <TextField
          margin="dense"
          fullWidth
          color="secondary"
          id="user_auth.password"
          variant="outlined"
          {...register('confirmPassword')}
          error={!!errors?.confirmPassword}
          label={t('user_auth.confirm_password')}
          helperText={
            errors?.confirmPassword?.message && (
              <span className={classes.error}>{errors.confirmPassword?.message}</span>
            )
          }
        />
      </div>
      <div>
        <Button variant="text" className={classes.subButton}>
          {t('user_auth.signup.header')}
        </Button>
      </div>
      <div className={classes.actionArea}>
        <Button fullWidth variant="contained" type="submit" color="default">
          {t('user_auth.signin.update_password')}
        </Button>
      </div>
    </form>
  );
};

export default PasswordUpdate;
