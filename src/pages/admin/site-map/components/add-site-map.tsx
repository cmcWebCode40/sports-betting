import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { createStyles, makeStyles } from '@material-ui/core';
import { IErrorArgs } from '../../../../models/error-handler.model';
import { onErrorSMF, siteMapFn } from '../../../../logic/admin/sitemap.logic';
import { ITheme } from '../../../../themes/theme';

export const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      margin: theme.spacing(2),
      padding: theme.spacing(3, 1),
    },
  }),
);

const AddSiteMap = (): JSX.Element => {
  const classes = useStyles();
  const [path, setPath] = useState('');
  const { mutate, isLoading } = useMutation<unknown, IErrorArgs, unknown, unknown>((dataInput) =>
    siteMapFn<unknown>({ data: dataInput }),
  );

  const onSuccess = (res: any) => {
    toast.success(res.data.message);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPath(event.target.value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ path }, { onSuccess, onError: onErrorSMF });
  };

  return (
    <div className={classes.root}>
      <form onSubmit={onSubmit}>
        <Box display="flex">
          <TextField
            // margin="dense"
            onChange={handleChange}
            id="site-id"
            label="path"
            required
            variant="outlined"
          />
          <Button
            variant="contained"
            disabled={!!isLoading}
            type="submit"
            size="small"
            color="primary"
            data-testid="login-button"
          >
            ADD
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddSiteMap;
