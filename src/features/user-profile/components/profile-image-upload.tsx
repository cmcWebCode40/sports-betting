/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import AppModalView from '../../../components/app-modal-view/app-modal-view';
import { onError, userProfileFn } from '../../../logic/user-profile.logic';
import { IErrorArgs } from '../../../models/error-handler.model';
import { useStylesProfilePics } from '../styles/user-profile.styles';

type TData = {
  data: {
    profilePics: string;
    username: string;
  };
};

const ProfileImageUpload = ({ data }: TData): JSX.Element => {
  const classes = useStylesProfilePics();
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<any>([]);
  const [user, setUser] = useState<{ profilePics: string }>({
    profilePics: '',
  });

  const { mutate, isLoading } = useMutation<unknown, IErrorArgs, unknown, unknown>((dataInput) =>
    userProfileFn<unknown, unknown>({ data: dataInput }),
  );
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file: unknown) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });
  const onOpenModal = () => setOpen(!open);

  const thumbs = files.map((file: any) => (
    <div key={file.name}>
      <img className={classes.avatarThumb} src={file.preview} alt="name" />
    </div>
  ));

  const onSuccess = (res: any) => {
    toast.success(res.data.message);
    setFiles([]);
    setOpen(false);
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append('image', files[0]);
    mutate(formData, { onSuccess, onError });
  };
  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
      setUser({ profilePics: data?.profilePics });
    },
    [files, data],
  );

  return (
    <div>
      <Avatar className={classes.square} src={user?.profilePics}>
        {data?.username[0]}
      </Avatar>
      <Button onClick={onOpenModal} className={classes.button}>
        Upload Photo
      </Button>
      <AppModalView open={open} setOpen={setOpen} title="Upload New Photo">
        <div className={classes.content}>
          {files.length ? thumbs : <Avatar className={classes.avatarThumb}>.</Avatar>}
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {!files.length && (
              <Button className={classes.uploadButton} variant="contained" color="inherit">
                UPLOAD A PHOTO FROM YOUR COMPUTER
              </Button>
            )}
          </div>
          {files.length && (
            <Button
              onClick={onSubmit}
              variant="contained"
              className={classes.uploadButtonSave}
              color="primary"
              disabled={!!isLoading}
            >
              SAVE
            </Button>
          )}
        </div>
      </AppModalView>
    </div>
  );
};

export default ProfileImageUpload;
