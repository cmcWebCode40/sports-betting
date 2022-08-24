/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useAddBookMarkers } from '../styles/bookmarker.styles';
import { bookmakerApiMiddleware } from '../../../../logic/admin/all-bookmarkers.logic';
import { IErrorArgs } from '../../../../models/error-handler.model';
import { AppModalView } from '../../../../components';
import { useAppSelector } from '../../../../provider/hooks/hooks';

const AddWhiteListedBookmarker = (): JSX.Element => {
  const classes = useAddBookMarkers();
  const [open, setOpen] = useState(false);
  const [webName, setWebName] = useState('');
  const [files, setFiles] = useState<any>([]);
  const { mutate, isLoading } = useMutation<unknown, IErrorArgs, unknown, unknown>((dataInput) =>
    bookmakerApiMiddleware<unknown>({ data: dataInput, url: '/bookmakers', method: 'post' }),
  );
  const { bookmakersList } = useAppSelector((state) => state.bookmarkers);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file: unknown) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file as any),
          }),
        ),
      );
    },
  });
  const onOpenModal = () => setOpen(!open);
  const onRemoveImage = () => setFiles([]);

  const thumbs = files.map((file: any) => (
    <div key={file.name}>
      <IconButton onClick={onRemoveImage}>
        <DeleteIcon color="error" />
      </IconButton>
      <img className={classes.avatarThumb} src={file.preview} alt="name" />
    </div>
  ));

  const onSuccess = (res: any) => {
    toast.success(res.data.message);
    setFiles([]);
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWebName(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('logo', files[0]);
    formData.append('webName', webName);
    mutate(formData, { onSuccess });
  };

  useEffect(
    () => () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  return (
    <div>
      <Button onClick={onOpenModal} className={classes.button} variant="contained" color="primary">
        Add BookMarker
      </Button>
      <AppModalView open={open} setOpen={setOpen} title="Add BookMarker">
        <form onSubmit={onSubmit} className={classes.content}>
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
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
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                id="category-id"
                select
                fullWidth
                name="webNam"
                onChange={handleChange}
                required
                margin="dense"
                variant="outlined"
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Choose Category</option>
                {bookmakersList.map((option) => (
                  <option key={option.idProvider} value={option.WebName}>
                    {option.WebName}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            className={classes.uploadButtonSave}
            color="primary"
            fullWidth
            disabled={!!isLoading}
          >
            SAVE
          </Button>
        </form>
      </AppModalView>
    </div>
  );
};

export default AddWhiteListedBookmarker;
