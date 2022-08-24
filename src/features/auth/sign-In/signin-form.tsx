import React, { SetStateAction } from 'react';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { withStyles } from '@material-ui/core';
import { customInputStyles, useAuthStyles } from '../styles/auth.styles';
import {
  ISignInInputs,
  IUserResponse,
  SignInSchema,
  userAuthenticationFn,
} from '../../../logic/auth/user-authentication.logic';
import { useAppDispatch } from '../../../provider/hooks/hooks';
import { handleAuthentication } from '../../../provider/features/auth/auth';
import { IErrorArgs } from '../../../models/error-handler.model';
import BackDropLoader from '../../../components/loaders/backdrop-loader';

interface ISignUpProps {
  setSteps: React.Dispatch<SetStateAction<number>>;
  steps: number;
}
const CustomTextField = withStyles(customInputStyles)(TextField);

const SignInForm = ({ setSteps, steps }: ISignUpProps): JSX.Element => {
  const classes = useAuthStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInInputs>({
    resolver: yupResolver(SignInSchema),
  });
  const [errorMessage, setErrorMessage] = React.useState('');

  const { mutate, isLoading } = useMutation<IUserResponse, IErrorArgs, ISignInInputs, unknown>(
    (data) => userAuthenticationFn<ISignInInputs, IUserResponse>({ data, endPoint: 'signin' }),
  );

  function onSuccess(res: IUserResponse) {
    dispatch(handleAuthentication({ userData: res?.data?.data }));
  }

  const userAuthError = (error: IErrorArgs): void | Promise<unknown> => {
    setErrorMessage(error.response.data.message || 'Something Went Wrong');
    toast.error(error.response.data.message, {
      toastId: '1',
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const onSubmit = async (data: ISignInInputs) => {
    mutate(data, {
      onSuccess,
      onError: userAuthError,
    });
  };

  const OnPasswordReset = () => {
    setSteps(steps + 1);
    history.push(`?title=Reset-password&step=${1}&type=signin`);
  };

  return (
    <form className={classes.root} autoComplete="false" onSubmit={handleSubmit(onSubmit)}>
      {errorMessage && (
        <Alert severity="error" data-testid="error" variant="outlined">
          {errorMessage}
        </Alert>
      )}
      {isLoading && <BackDropLoader message="Signing in" isOpened={isLoading} />}
      <div className={classes.formControl}>
        <CustomTextField
          fullWidth
          focused
          id="user_auth.signin.email"
          label={t('user_auth.email')}
          margin="dense"
          variant="outlined"
          {...register('email')}
          error={!!errors?.email}
          helperText={
            errors?.email?.message && <span className={classes.error}>{errors.email?.message}</span>
          }
        />
      </div>
      <div className={classes.formControl}>
        <CustomTextField
          fullWidth
          focused
          type="password"
          margin="dense"
          variant="outlined"
          error={!!errors?.password}
          {...register('password')}
          id="'user_auth.signin.password"
          label={t('user_auth.password')}
          helperText={
            errors?.password?.message && (
              <span className={classes.error}>{errors.password?.message}</span>
            )
          }
        />
      </div>
      <div>
        <Button variant="text" className={classes.subButton} onClick={OnPasswordReset}>
          {t('user_auth.signin.forgot_password')}
        </Button>
      </div>
      <div className={classes.actionArea}>
        <Button
          fullWidth
          variant="contained"
          className={classes.btn}
          disabled={!!isLoading}
          type="submit"
          color="default"
          data-testid="login-button"
        >
          {t('user_auth.signup.login')}
        </Button>
        <Button fullWidth className={classes.facebookButton} variant="contained" color="primary">
          {t('user_auth.signin.facebook')}
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
