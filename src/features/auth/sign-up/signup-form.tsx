import React, { Dispatch, SetStateAction } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Alert from '@material-ui/lab/Alert';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import { withStyles } from '@material-ui/core';
import { customInputStyles, useAuthStyles } from '../styles/auth.styles';
import BackDropLoader from '../../../components/loaders/backdrop-loader';
import { useAppDispatch } from '../../../provider/hooks/hooks';
import {
  ISignUpInputs,
  IUserResponse,
  SignUpSchema,
  userAuthenticationFn,
} from '../../../logic/auth/user-authentication.logic';
import { handleAuthentication } from '../../../provider/features/auth/auth';
import { IErrorArgs } from '../../../models/error-handler.model';

interface SignUpProps {
  setSteps: Dispatch<SetStateAction<number>>;
  steps: number;
}

const CustomTextField = withStyles(customInputStyles)(TextField);

const SignUpForm = ({ setSteps, steps }: SignUpProps): JSX.Element => {
  const classes = useAuthStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpInputs>({
    resolver: yupResolver(SignUpSchema),
  });
  const [errorMessage, setErrorMessage] = React.useState('');
  const [newsBulletin, setNewsBulletin] = React.useState(false);

  function onSuccess(res: IUserResponse) {
    const { data: userData } = res?.data;
    dispatch(handleAuthentication({ userData, isNewUser: true }));
    history.push(`?step=1&type=signup&email=${userData.email}`);
    setSteps(steps + 1);
  }

  const { mutate, isLoading, isSuccess } = useMutation<
    IUserResponse,
    IErrorArgs,
    ISignUpInputs,
    unknown
  >((data) => userAuthenticationFn<ISignUpInputs, IUserResponse>({ data, endPoint: 'signup' }));

  const userAuthError = (error: IErrorArgs): void | Promise<unknown> => {
    setErrorMessage(error.response.data.message);
  };

  const onSelectNewsLetter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewsBulletin(event.target.checked);
  };

  const onSubmit = (inputData: ISignUpInputs) => {
    const data: ISignUpInputs = {
      email: inputData?.email,
      username: inputData?.username,
      password: inputData?.password,
    };
    if (newsBulletin) data.newsBulletin = 'on';

    mutate(data, {
      onSuccess,
      onError: userAuthError,
    });
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      {isLoading && <BackDropLoader message="creating user" isOpened={isLoading} />}
      <Typography variant="h3" className={classes.title} align="center" color="inherit">
        {t('user_auth.signup.title')}
      </Typography>
      {errorMessage && (
        <Alert data-testid="error" severity="error" variant="outlined">
          {errorMessage}
        </Alert>
      )}
      {isSuccess && (
        <Alert data-testid="success" severity="success" variant="outlined">
          Account created successfully
        </Alert>
      )}
      <div className={classes.formControl}>
        <CustomTextField
          fullWidth
          focused
          margin="dense"
          id="user_auth.name"
          label={t('user_auth.name')}
          variant="outlined"
          {...register('username')}
          error={!!errors?.username}
          helperText={
            errors?.username?.message && (
              <span className={classes.error}>{errors.username?.message}</span>
            )
          }
        />
      </div>
      <div className={classes.formControl}>
        <CustomTextField
          fullWidth
          focused
          margin="dense"
          id="user_auth.email"
          label={t('user_auth.email')}
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
          id="user_auth.password"
          label={t('user_auth.password')}
          variant="outlined"
          {...register('password')}
          error={!!errors?.password}
          helperText={
            errors?.password?.message && (
              <span className={classes.error}>{errors.password?.message}</span>
            )
          }
        />
      </div>
      <div className={classes.checkBox}>
        <FormControlLabel
          color="default"
          control={
            <Checkbox
              classes={{
                root: classes.checkBoxForm,
              }}
              required
              color="default"
            />
          }
          label={t('user_auth.signup.terms')}
          classes={{ label: classes.checkBoxForm }}
        />
      </div>
      <div className={classes.checkBox}>
        <FormControlLabel
          classes={{
            label: classes.checkBoxForm,
          }}
          control={
            <Checkbox
              classes={{
                root: classes.checkBoxForm,
              }}
              onChange={onSelectNewsLetter}
              name="newsBulletin"
            />
          }
          label={t('user_auth.signup.newsletter')}
        />
      </div>
      <div className={classes.actionArea}>
        <Button
          fullWidth
          variant="contained"
          data-testid="signup"
          disabled={!!isLoading}
          type="submit"
          color="default"
        >
          {t('user_auth.signup.header')}
        </Button>
        <Button className={classes.facebookButton} fullWidth variant="contained" color="primary">
          {t('user_auth.signup.facebook')}
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
