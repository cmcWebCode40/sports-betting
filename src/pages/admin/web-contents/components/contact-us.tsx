import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { useMutation } from 'react-query';
import { createStyles, makeStyles } from '@material-ui/core';
import { toast } from 'react-toastify';
import { useGetQuery } from '../../../../hooks/useGetQuery';
import {
  contentMgtFn,
  IContactResponse,
  onErrorCMG,
} from '../../../../logic/admin/webcontent.logic';
import { IErrorArgs } from '../../../../models/error-handler.model';
import { ITheme } from '../../../../themes/theme';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      display: 'flex',
      margin: theme.spacing(1.3, 0),
    },
    buttonWrapper: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    title: {
      fontWeight: 600,
      color: theme.palette.black,
      margin: theme.spacing(1, 0),
    },
    btnDanger: {
      margin: '14px 0px',
      fontWeight: 600,
      background: theme.palette.error.main,
      color: theme.palette.white,
      '&:hover': {
        background: theme.palette.error.light,
      },
    },
  }),
);

const queryOptions = {
  queryKey: 'bookmaker-view',
  options: {
    retry: false,
    refetchOnWindowFocus: false,
  },
};
type TMethod = 'post' | 'get' | 'patch' | 'put' | 'delete';

const AdminContactUs = (): JSX.Element => {
  const classes = useStyles();
  const [method, setMethod] = useState<TMethod>('get');
  const [email, setEmail] = useState('');
  const [pMethod, setPMethod] = useState<TMethod>('post');
  const {
    data: response,
    // isLoading,
    refetch,
  } = useGetQuery<IContactResponse>({
    queryFn: () => contentMgtFn<unknown, IContactResponse>({ method, endPoint: 'contact-us' }),
    ...queryOptions,
  });
  const { mutate, isLoading: loader } = useMutation<unknown, IErrorArgs, unknown, unknown>(
    (dataInput) =>
      contentMgtFn<unknown, unknown>({
        data: dataInput,
        endPoint: 'contact-us',
        method: pMethod,
      }),
  );

  const onSuccess = (res: any) => {
    toast.success(res.data.message);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    if (response?.data.email) {
      setEmail(response?.data.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const postContent = () => {
    mutate({ email }, { onSuccess, onError: onErrorCMG });
  };

  const deleteContent = () => {
    refetch();
  };

  const updateContent = () => {
    mutate({ email }, { onSuccess, onError: onErrorCMG });
  };

  return (
    <div>
      <Typography className={classes.title} variant="h3">
        Admin: Contact
      </Typography>
      <div>
        <TextField
          onChange={handleChange}
          fullWidth
          margin="dense"
          id="contact"
          label="Contact"
          variant="outlined"
        />
      </div>
      <div className={classes.buttonWrapper}>
        <Button
          onClick={postContent}
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
          disabled={loader && pMethod === 'post'}
        >
          Create
        </Button>
        <Button
          onClick={() => {
            setPMethod('put');
            updateContent();
          }}
          startIcon={<EditIcon />}
          variant="contained"
          color="secondary"
          disabled={loader && pMethod === 'put'}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            setMethod('delete');
            deleteContent();
          }}
          startIcon={<DeleteIcon />}
          variant="contained"
          color="inherit"
          className={classes.btnDanger}
          disabled={loader && method === 'delete'}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default AdminContactUs;
