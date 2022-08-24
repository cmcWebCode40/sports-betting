/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core';
import ProfileImageUpload from './components/profile-image-upload';
import InputForm from './components/input-form';
import { ITheme } from '../../themes/theme';
import { useGetQuery } from '../../hooks/useGetQuery';
import { userProfileFn, IUserProfile } from '../../logic/user-profile.logic';
import UserProfileSkeleton from './components/user-profile-skeleton';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      margin: theme.spacing(1, 3),
    },
    content: {
      backgroundColor: theme.palette.veryLightPink.main,
      padding: theme.spacing(1.8),
    },
    text: {
      margin: '12px 0px 8px 0px',
      fontSize: theme.typography.h3.fontSize,
      fontWeight: 600,
      color: theme.palette.grayishBrown.main,
    },
  }),
);

type TData = {
  data: {
    profilePics: string;
    username: string;
  };
};

const UserProfile = (): JSX.Element => {
  const classes = useStyles();
  const [isUpdating, setIsUpdating] = useState(false);
  const { data, isLoading } = useGetQuery<any>({
    queryFn: () => userProfileFn<IUserProfile, TData>({ method: 'get' }),
    queryKey: 'user-profile',
    options: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  });

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.text}>
        Profile
      </Typography>
      {isLoading ? (
        <UserProfileSkeleton />
      ) : (
        <div className={classes.content}>
          <ProfileImageUpload data={data?.data?.data} />
          <Box display="flex">
            <div>
              <InputForm
                isUpdate={isUpdating}
                data={data?.data?.data}
                setIsUpdating={setIsUpdating}
              />
            </div>
          </Box>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
