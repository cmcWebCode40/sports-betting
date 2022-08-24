import React, { SetStateAction, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useDropzone } from 'react-dropzone';
import TextField from '@material-ui/core/TextField';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { IconButton, makeStyles, createStyles, Box } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { AppModalView } from '../../../../../components';
import { IErrorArgs } from '../../../../../models/error-handler.model';
import { ITheme } from '../../../../../themes/theme';
import { mediaMiddlewareService, onErrorBannner } from '../../../../../logic/admin/banners.logic';
import { TMethod } from '../../../../../models';

type TData = {
  open: boolean;
  action: TMethod;
  itemId: number | undefined;
  getBanners: () => void;
  mediaData?: any;
  setMediaData: React.Dispatch<SetStateAction<any>>;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};
const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    square: {
      width: 80,
      height: 80,
      color: theme.palette.black,
      backgroundColor: theme.palette.white,
    },
    content: {},
    button: {
      margin: theme.spacing(0.9, 0),
    },
    uploadButton: {
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.5)',
      backgroundColor: theme.palette.white,
      margin: theme.spacing(1, 0),
    },
    uploadButtonSave: {
      padding: '4px 35px',
    },
    avatarThumb: {
      height: ' 170px',
      backgroundSize: 'cover',
      margin: theme.spacing(0.8),
      backgroundColor: theme.palette.veryLightPink.main,
    },
    thumbContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 16,
    },
  }),
);

const MediaUpload = ({
  open,
  setOpen,
  action,
  itemId,
  getBanners,
  mediaData,
  setMediaData,
}: TData): JSX.Element => {
  const classes = useStyles();
  const [files, setFiles] = useState<any>([]);
  const [mediaImageToEdit, setMediaImageToEdit] = useState<string>('');
  const { mutate, isLoading: loader } = useMutation<unknown, IErrorArgs, unknown, unknown>(
    (dataInput) =>
      mediaMiddlewareService<unknown, unknown>({
        data: dataInput,
        endPoint: action === 'patch' ? `banner/${itemId}` : 'banner',
        method: action || 'post',
      }),
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setMediaImageToEdit('');
      setFiles(
        acceptedFiles.map((file: unknown) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });
  useEffect(() => {
    setMediaImageToEdit(mediaData.link);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onRemoveImage = () => setFiles([]);

  const onSuccess = (res: any) => {
    getBanners();
    setOpen(!open);
    toast.success(res.data.message);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setMediaData((item: any) => ({ ...item, [name]: value }));
  };

  const onSubmitMedia = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', mediaData?.title);
    if (files[0]) {
      formData.append('banner', files[0]);
    }
    mutate(formData, { onSuccess, onError: onErrorBannner });
  };

  const thumbs = files.map((file: any) => (
    <div key={file.name}>
      <IconButton onClick={onRemoveImage}>
        <Delete color="error" />
      </IconButton>
      <img className={classes.avatarThumb} src={file.preview || mediaData.link} alt="name" />
    </div>
  ));
  return (
    <>
      <AppModalView disableBoxClose open={open} setOpen={setOpen} title="Website Media (image)">
        <form onSubmit={onSubmitMedia}>
          <div>
            <TextField
              fullWidth
              margin="dense"
              id="user_auth.title"
              label="Title"
              name="title"
              required
              value={mediaData?.title}
              onChange={handleChange}
              variant="outlined"
            />
          </div>
          <Box width={300} my={3}>
            <div className="container">
              <div
                style={{
                  background: '#e9e9e9',
                  height: 150,
                  border: '2px  #000 solid',
                  borderStyle: 'dashed',
                }}
                {...getRootProps({ className: 'dropzone' })}
              >
                <input {...getInputProps()} />
                <p>Drag and drop some files here, or click to select files</p>
              </div>
              {thumbs}
            </div>
          </Box>
          {mediaImageToEdit && (
            <img className={classes.avatarThumb} src={mediaImageToEdit} alt="name" />
          )}
          <div>
            <Button disabled={loader} type="submit" fullWidth variant="contained" color="primary">
              {action === 'patch' ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </AppModalView>
    </>
  );
};

export default MediaUpload;
