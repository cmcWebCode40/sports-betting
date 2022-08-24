import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { useMutation } from 'react-query';
import { createStyles, makeStyles } from '@material-ui/core';
import { toast } from 'react-toastify';
import RichTextEditor from '../../../../components/markdown/rich-editor';
import useEditor from '../../../../components/markdown/useEditor';
import { useGetQuery } from '../../../../hooks/useGetQuery';
import {
  contentMgtFn,
  IContentResponse,
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

const TermsAndConditions = (): JSX.Element => {
  const classes = useStyles();
  const [method, setMethod] = useState<TMethod>('get');
  const [pMethod, setPMethod] = useState<TMethod>('post');
  const { data: response, refetch } = useGetQuery<IContentResponse>({
    queryFn: () =>
      contentMgtFn<unknown, IContentResponse>({ method, endPoint: 'terms-and-conditions' }),
    ...queryOptions,
  });
  const { mutate, isLoading: loader } = useMutation<unknown, IErrorArgs, unknown, unknown>(
    (dataInput) =>
      contentMgtFn<unknown, unknown>({
        data: dataInput,
        endPoint: 'terms-and-conditions',
        method: pMethod,
      }),
  );
  const { editEditorText, getMarkDown, setEditorText, setMDContent } = useEditor();

  const onSuccess = (res: any) => {
    toast.success(res.data.message);
  };

  useEffect(() => {
    if (response?.data?.data) {
      setMDContent(response?.data.data.text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const postContent = () => {
    const markDownString = getMarkDown();

    if (!markDownString) return toast.error('Description must not be empty');
    mutate({ text: markDownString }, { onSuccess, onError: onErrorCMG });
    return true;
  };

  const deleteContent = () => {
    refetch();
  };

  const updateContent = () => {
    const markDownString = getMarkDown();
    if (!markDownString) return toast.error('Description must not be empty');
    mutate({ text: markDownString }, { onSuccess, onError: onErrorCMG });
    return true;
  };

  return (
    <div>
      <Typography className={classes.title} variant="h3">
        Terms and Conditions
      </Typography>
      <RichTextEditor state={editEditorText} setState={setEditorText} />
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

export default TermsAndConditions;
