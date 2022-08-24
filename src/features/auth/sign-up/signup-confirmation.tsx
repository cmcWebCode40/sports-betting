import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import Alert from '@material-ui/lab/Alert';
import { useMutation } from 'react-query';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthStyles } from '../styles/auth.styles';
import BackDropLoader from '../../../components/loaders/backdrop-loader';
import {
  IResendPasswordResetLink,
  IUserResponse,
  userAuthenticationFn,
} from '../../../logic/auth/user-authentication.logic';
import { IErrorArgs } from '../../../models/error-handler.model';
import { queryUrl } from '../../../helpers/query-params';

const SignUpConfirmation: React.FC = () => {
  const classes = useAuthStyles();
  const { t } = useTranslation();
  const location = useLocation();
  const email = queryUrl(location).get('email');
  const [errorMessage, setErrorMessage] = React.useState('');
  const { mutate, isLoading } = useMutation<
    IUserResponse,
    IErrorArgs,
    IResendPasswordResetLink,
    unknown
  >((data) =>
    userAuthenticationFn<IResendPasswordResetLink, IUserResponse>({
      data,
      endPoint: 'resend-verification-mail',
    }),
  );

  const userAuthError = (error: IErrorArgs): void | Promise<unknown> => {
    setErrorMessage(error.response.data.message);
  };

  function onSuccess(res: IUserResponse): void {
    toast.success(res.data.message);
  }

  const onSubmit = () => {
    if (!email) {
      setErrorMessage('Something went wrong');
      return;
    }
    const data = {
      email,
    };
    mutate(data, {
      onError: userAuthError,
      onSuccess,
    });
  };

  return (
    <div className={classes.root}>
      {!isLoading && !errorMessage && (
        <Typography variant="h3" className={classes.title} align="center" color="inherit">
          {t('user_auth.signup.acc_confirmation_mgs')}
        </Typography>
      )}
      {isLoading && <BackDropLoader message="Resending mail" isOpened={isLoading} />}
      {errorMessage && (
        <Alert severity="error" variant="outlined">
          {errorMessage}
        </Alert>
      )}
      <div className={classes.actionArea}>
        <Typography variant="body1" className={classes.title} align="center" color="inherit">
          {t('user_auth.signup.mgs_not_received')}
        </Typography>
        <Button onClick={onSubmit} fullWidth variant="contained" color="default">
          {t('user_auth.signup.send_again')}
        </Button>
      </div>
    </div>
  );
};

export default SignUpConfirmation;
