import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import Alert from '@material-ui/lab/Alert';
import { toast } from 'react-toastify';
import { useAuthStyles } from '../styles/auth.styles';
import { IErrorArgs } from '../../../models/error-handler.model';
import { IUserResponse, userAuthenticationFn } from '../../../logic/auth/user-authentication.logic';
import BackDropLoader from '../../../components/loaders/backdrop-loader';
import { toggleModal } from '../../../provider/features/auth/auth';
import { useAppDispatch } from '../../../provider/hooks/hooks';

interface IToken {
  token: string;
}

interface IVerifyAccount {
  tokenId: string;
}

const VerifyAccount = ({ tokenId }: IVerifyAccount): JSX.Element => {
  const classes = useAuthStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = React.useState('');

  const { mutate, isLoading, isSuccess } = useMutation<IUserResponse, IErrorArgs, IToken, unknown>(
    (data) => userAuthenticationFn<IToken, IUserResponse>({ data, endPoint: 'verify-account' }),
  );

  const userAuthError = (error: IErrorArgs): void | Promise<unknown> => {
    setErrorMessage(error.response.data.message);
  };

  function onSuccess(): void {
    toast.success(t('user_auth.signup.confirmed'));
    history.push(`?step=0&type=signin`);
  }

  const onSubmit = () => {
    if (!tokenId) {
      setErrorMessage('No token Provided');
      dispatch(toggleModal({}));
      return;
    }

    const data = {
      token: tokenId,
    };
    mutate(data, {
      onError: userAuthError,
      onSuccess,
    });
  };

  const onSignIn = () => {
    history.push('?user_auth_type=0');
  };

  useEffect(() => {
    onSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      {isSuccess && (
        <Typography variant="h3" className={classes.title} align="center" color="inherit">
          {t('user_auth.signup.confirmed')}
        </Typography>
      )}
      {isLoading && <BackDropLoader message=" " isOpened={isLoading} />}
      {errorMessage && (
        <Alert severity="error" variant="outlined">
          {errorMessage}
        </Alert>
      )}
      <div className={classes.actionArea}>
        <Button fullWidth variant="contained" onClick={onSignIn} color="default">
          {t('user_auth.signin.header')}
        </Button>
      </div>
    </div>
  );
};

export default VerifyAccount;
