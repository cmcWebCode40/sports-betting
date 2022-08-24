/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { SetStateAction, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { onError, userProfileFn } from '../../../logic/user-profile.logic';
import { IErrorArgs } from '../../../models/error-handler.model';
import { useStylesProfile } from '../styles/user-profile.styles';

type TData = {
  firstName: string;
  lastName: string;
};

interface IInputFormProps {
  isUpdate?: boolean;
  setIsUpdating: React.Dispatch<SetStateAction<boolean>>;
  data: any;
}

const InputForm = ({ isUpdate = false, setIsUpdating, data }: IInputFormProps): JSX.Element => {
  const classes = useStylesProfile();
  const [user, setUser] = useState<TData>({
    firstName: '',
    lastName: '',
  });

  const { mutate, isLoading } = useMutation<unknown, IErrorArgs, TData, unknown>((dataInput) =>
    userProfileFn<TData, unknown>({ data: dataInput }),
  );

  const toggleProfileUpdate = () => {
    setIsUpdating(!isUpdate);
  };

  const onSaveProfileUpdate = () => {
    setIsUpdating(!isUpdate);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSuccess = (res: any) => {
    toast.success(res?.data?.message);
    onSaveProfileUpdate();
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(user, { onSuccess, onError });
  };

  useEffect(() => {
    setUser({ firstName: data?.firstName, lastName: data?.lastName });
  }, [data]);

  return (
    <form onSubmit={onSubmit}>
      <Box display="flex" className={classes.formLabel}>
        <label htmlFor="username-id">Username</label>
        {isUpdate ? (
          <TextField
            className={classes.input}
            id="username-id"
            hiddenLabel
            required
            margin="dense"
            disabled
            variant="outlined"
            value={data?.username}
          />
        ) : (
          <Typography className={classes.dataText} variant="h4">
            {data?.username}
          </Typography>
        )}
      </Box>
      <Box display="flex" className={classes.formLabel}>
        <label htmlFor="outlined" id="email-id">
          Email
        </label>
        {isUpdate ? (
          <TextField
            className={classes.input}
            id="email-id"
            hiddenLabel
            disabled
            value={data?.email}
            margin="dense"
            variant="outlined"
          />
        ) : (
          <Typography className={classes.dataText} variant="h4">
            {data?.email}
          </Typography>
        )}
      </Box>
      <Box display="flex" className={classes.formLabel}>
        <label htmlFor="outlined" id="firstName-id">
          Surname
        </label>
        {isUpdate ? (
          <TextField
            className={classes.input}
            id="firstName-id"
            hiddenLabel
            required
            margin="dense"
            name="firstName"
            variant="outlined"
            value={user.firstName}
            onChange={handleChange}
          />
        ) : (
          <Typography className={classes.dataText} variant="h4">
            {data?.firstName}
          </Typography>
        )}
      </Box>
      <Box display="flex" className={classes.formLabel}>
        <label htmlFor="outlined" id="lastName-id">
          Name
        </label>
        {isUpdate ? (
          <TextField
            className={classes.input}
            id="lastName-id"
            hiddenLabel
            required
            margin="dense"
            name="lastName"
            variant="outlined"
            value={user.lastName}
            onChange={handleChange}
          />
        ) : (
          <Typography className={classes.dataText} variant="h4">
            {data?.lastName}
          </Typography>
        )}
      </Box>
      <Box display="flex" className={classes.formLabel}>
        <label htmlFor="outlined" id="pass-id">
          Password
        </label>
        {isUpdate ? (
          <TextField
            className={classes.input}
            id="pass-id"
            hiddenLabel
            margin="dense"
            disabled
            variant="outlined"
          />
        ) : (
          <Typography className={classes.dataText} variant="h4">
            *******
          </Typography>
        )}
      </Box>
      <Box className={classes.formLabel}>
        {isUpdate ? (
          <>
            <span />
            <Button
              className={classes.button}
              color="primary"
              type="submit"
              disabled={!!isLoading}
              variant="contained"
            >
              Save
            </Button>
          </>
        ) : (
          <Button
            className={classes.buttonActive}
            onClick={toggleProfileUpdate}
            color="primary"
            variant="text"
          >
            UPDATE PROFILE INFORMATION
          </Button>
        )}
      </Box>
    </form>
  );
};

export default InputForm;
