/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  MenuItem,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import Alert from '@material-ui/lab/Alert';
import { toast } from 'react-toastify';

import AppModalView from '../../../components/app-modal-view';
import { userSettingsMiddleware } from '../../../logic/admin/user-settings.logic';
import { MethodTypes } from '../../../utils/common.definitions';
import { getFirstAndLastInitialsFromText } from '../../../utils/common.helpers';
import handleError from '../../../utils/functions/error-handler';
import { IErrorArgs } from '../../../models/error-handler.model';
import { ActionMenuComponent } from '../../../components';

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 650,
  },
  input: {
    display: 'none',
  },
  userStatus_1: {
    '& .MuiAlert-root': {
      width: 'fit-content',
      margin: 'auto',
    },
  },
  userStatus_2: {
    '& .MuiAlert-root': {
      width: 'fit-content',
    },
  },
  avatar: {
    width: 80,
    height: 80,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer * 2,
  },
  root: {
    overflowX: 'unset',
  },
}));

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  newsBulletin: yup.string().required(),
  // role: yup.string().required(),
  profilePics: yup.mixed(),
});

const fetchUsers = () => {
  return userSettingsMiddleware({ method: MethodTypes.GET });
};

type FormData = {
  profilePics: Blob | string;
  firstName: string;
  lastName: string;
  newsBulletin: string;
  id: string;
};

const updateUsers = (body: FormData) => {
  const formData = new FormData();
  Object.entries(body).forEach(([key, value]) => {
    if (key !== 'id' && key !== 'profilePics') formData.append(key, value);
  });

  return userSettingsMiddleware({ method: MethodTypes.PATCH, formData, id: body.id });
};

const deleteUser = (body: any) => {
  return userSettingsMiddleware({ method: MethodTypes.DELETE, id: body.id });
};

const UserSettings: FC = () => {
  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const [isEditUserInfo, setIsEditUserInfo] = useState<boolean>(false);
  const [showBottomClose, setShowBottomClose] = useState<boolean>(false);
  const [openIndex, setOpenIndex] = useState<number>();

  const queryClient = useQueryClient();

  const {
    register,
    getValues,
    reset,
    watch,
    control,
    formState: { isValid, errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const { data: users, isLoading } = useQuery('users', fetchUsers, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!open) {
      setIsEditUserInfo(false);
      setShowBottomClose(false);
      reset();
    }
  }, [open, reset]);

  const handleEditUserInfo = () => {
    if (!isEditUserInfo) {
      reset({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        role: userInfo.role,
        newsBulletin: userInfo.newsBulletin,
        profilePics: userInfo.profilePics,
      });
    }
    setIsEditUserInfo(!isEditUserInfo);
    setShowBottomClose(!showBottomClose);
  };

  const openModal = (user?: any) => {
    setOpen(true);
    setUserInfo(user || {});
  };

  const { mutate, isLoading: isSubmitting } = useMutation(updateUsers, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('users');
      toast.success(data?.data?.message);
      handleEditUserInfo();
    },
    onError: (err) => {
      const error = handleError(err as IErrorArgs);
      toast.error(error.message);
    },
  });

  const { mutate: mutateDeleteUser } = useMutation(deleteUser, {
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      queryClient.invalidateQueries('users');
    },
    onError: (err) => {
      const error = handleError(err as IErrorArgs);
      toast.error(error.message);
    },
  });

  const editButtonText = isEditUserInfo ? 'Cancel Edit' : 'Edit';

  const profilePicture = watch('profilePics') || [];

  const previewPicture = profilePicture.length ? URL.createObjectURL(profilePicture[0]) : '';

  const closeModal = () => {
    const value = getValues();
    if (isValid) mutate({ ...value, id: userInfo.id, profilePics: profilePicture[0] });
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <Box>
      <header>
        <Box my={2}>
          <Typography variant="h3" color="textPrimary">
            User Settings
          </Typography>
        </Box>
      </header>
      <main>
        <TableContainer component={Paper} className={classes.root}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Box fontWeight="bold">Profile picture</Box>
                </TableCell>
                <TableCell align="left">
                  <Box fontWeight="bold">First name</Box>
                </TableCell>
                <TableCell align="left">
                  <Box fontWeight="bold">Last name</Box>
                </TableCell>
                <TableCell align="left">
                  <Box fontWeight="bold">Username</Box>
                </TableCell>
                <TableCell align="left">
                  <Box fontWeight="bold">Email</Box>
                </TableCell>
                <TableCell align="center">
                  <Box fontWeight="bold">Status</Box>
                </TableCell>
                {/* <TableCell align="center">
                  <Box fontWeight="bold">Role</Box>
                </TableCell> */}
                <TableCell align="right">
                  <Box fontWeight="bold">Newsletter</Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.data.data?.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell component="th" scope="row">
                    <Avatar src={row.profilePics} alt={row.firstName}>
                      {getFirstAndLastInitialsFromText(`${row.firstName} ${row.lastName}`)}
                    </Avatar>
                  </TableCell>
                  <TableCell align="left">{row.firstName}</TableCell>
                  <TableCell align="left">{row.lastName}</TableCell>
                  <TableCell align="left">{row.username}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="center" className={classes.userStatus_1}>
                    {row.isEmailVerified ? (
                      <Alert severity="success">Verified</Alert>
                    ) : (
                      <Alert severity="warning">Not Verified</Alert>
                    )}
                  </TableCell>
                  {/* <TableCell align="center">{row.role}</TableCell> */}
                  <TableCell align="right">{row.newsBulletin}</TableCell>
                  <TableCell>
                    <ActionMenuComponent
                      openMenu={setOpenIndex}
                      openMenuIndex={openIndex}
                      menuIndex={Number(row.id)}
                      menuComponent={
                        <>
                          <span
                            data-testid="menu"
                            onClick={() => {
                              openModal(row);
                              setOpenIndex(undefined);
                            }}
                          >
                            Edit
                          </span>
                          <span
                            data-testid="menu"
                            onClick={() => {
                              mutateDeleteUser(row);
                              setOpenIndex(undefined);
                            }}
                          >
                            Delete
                          </span>
                        </>
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
      <AppModalView
        closeModal={closeModal}
        showBottomClose={showBottomClose}
        open={open}
        setOpen={setOpen}
        title="User information"
      >
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <section />
          <Button variant="outlined" color="primary" onClick={handleEditUserInfo}>
            {editButtonText}
          </Button>
        </Box>
        <Box minWidth="500px" component="form">
          <Box my={3}>
            <Box fontWeight="bold" my={1} fontSize="1.1rem">
              Profile Picture
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Avatar
                src={userInfo.profilePics || previewPicture}
                alt={userInfo.firstName}
                className={classes.avatar}
              >
                {getFirstAndLastInitialsFromText(`${userInfo.firstName} ${userInfo.lastName}`)}
              </Avatar>
              {isEditUserInfo && (
                <>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                    {...register('profilePics')}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </>
              )}
            </Box>
          </Box>
          <Box my={3}>
            <Box fontWeight="bold" my={1} fontSize="1.1rem">
              First Name
            </Box>
            {isEditUserInfo ? (
              <Controller
                name="firstName"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <TextField
                      label=""
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={onChange}
                      defaultValue={value}
                      error={errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  );
                }}
              />
            ) : (
              <Typography variant="subtitle1" color="textPrimary">
                {userInfo.firstName}
              </Typography>
            )}
          </Box>
          <Box my={3}>
            <Box fontWeight="bold" my={1} fontSize="1.1rem">
              Last Name
            </Box>
            {isEditUserInfo ? (
              <Controller
                name="lastName"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <TextField
                      label=""
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={onChange}
                      defaultValue={value}
                      error={errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  );
                }}
              />
            ) : (
              <Typography variant="subtitle1" color="textPrimary">
                {userInfo.lastName}
              </Typography>
            )}
          </Box>
          {!isEditUserInfo && (
            <>
              <Box my={3}>
                <Box fontWeight="bold" my={1} fontSize="1.1rem">
                  Username
                </Box>
                <Typography variant="subtitle1" color="textPrimary">
                  {userInfo.username}
                </Typography>
              </Box>
              <Box my={3}>
                <Box fontWeight="bold" my={1} fontSize="1.1rem">
                  Email
                </Box>
                <Typography variant="subtitle1" color="textPrimary">
                  {userInfo.email}
                </Typography>
              </Box>
              <Box my={3} className={classes.userStatus_2}>
                <Box fontWeight="bold" my={1} fontSize="1.1rem">
                  Status
                </Box>
                {userInfo.isEmailVerified ? (
                  <Alert severity="success">Verified</Alert>
                ) : (
                  <Alert severity="warning">Not Verified</Alert>
                )}
              </Box>
            </>
          )}
          <Box my={3}>
            <Box fontWeight="bold" my={1} fontSize="1.1rem">
              Role
            </Box>
            {isEditUserInfo ? (
              <TextField
                id={userInfo.role}
                label=""
                select
                defaultValue={userInfo.role}
                variant="outlined"
                size="small"
                fullWidth
                {...register('role')}
                error={errors.role}
                helperText={errors.role?.message}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </TextField>
            ) : (
              <Typography variant="subtitle1" color="textPrimary">
                {userInfo.role}
              </Typography>
            )}
          </Box>
          <Box my={3}>
            <Box fontWeight="bold" my={1} fontSize="1.1rem">
              Newsletter
            </Box>
            {isEditUserInfo ? (
              <TextField
                id={userInfo.newsBulletin}
                label=""
                select
                defaultValue={userInfo.newsBulletin}
                variant="outlined"
                size="small"
                fullWidth
                {...register('newsBulletin')}
                error={errors.newsBulletin}
                helperText={errors.newsBulletin?.message}
              >
                <MenuItem value="on">On</MenuItem>
                <MenuItem value="off">Off</MenuItem>
              </TextField>
            ) : (
              <Typography variant="subtitle1" color="textPrimary">
                {userInfo.newsBulletin}
              </Typography>
            )}
          </Box>
        </Box>
      </AppModalView>
      <Backdrop className={classes.backdrop} open={isSubmitting}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default UserSettings;
