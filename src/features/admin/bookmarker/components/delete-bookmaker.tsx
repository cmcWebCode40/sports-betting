import React, { useState, SetStateAction, Dispatch } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import { createStyles, makeStyles } from '@material-ui/core';
import { ITheme } from '../../../../themes/theme';
import { apiServer } from '../../../../services/services';
import BackDropLoader from '../../../../components/loaders/backdrop-loader';
import { AppModalView } from '../../../../components';
import { UserUtils } from '../../../../utils/functions/user-utils';
import handleError from '../../../../utils/functions/error-handler';

export const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      margin: theme.spacing(2, 6),
    },
    boxContent: {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
      justifyContent: 'center',
      height: '230px',
      padding: '23px 21px 50px 35px',
    },
    titleHeader: {
      margin: '22px 14px 6px 0',
      padding: '7px 35px 4px 35px',
      fontSize: theme.typography.h3.fontSize,
      fontWeight: 100,
      textAlign: 'center',
    },

    submitButton: {
      padding: '7px 35px 4px 35px',
      margin: '20px 14px 6px 0',
      width: '170px',
      background: theme.palette.error.main,
    },
  }),
);

const { getUserToken } = UserUtils;

interface IDeleteBookmaker {
  id: string;
  open: boolean;
  refetch?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DeleteBookmaker = ({ id, open, setOpen, refetch }: IDeleteBookmaker): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

  const headers = {
    'content-Type': 'application/json',
    Authorization: getUserToken(),
  };

  const onSubmit = async () => {
    setIsLoading(!isLoading);
    try {
      const res = await apiServer.delete(`/bookmakers/${id}`, { headers });
      toast.success(res?.data?.message);
      refetch();
      setOpen(!open);
    } catch (error) {
      const errMgs = handleError(error as any);
      toast.success(errMgs.message);
    } finally {
      setIsLoading(!isLoading);
    }
  };

  return (
    <>
      <AppModalView disableBoxClose open={open} setOpen={setOpen}>
        <Box className={classes.boxContent}>
          <Typography className={classes.titleHeader} variant="h3">
            Are you sure you want to delete this bookmaker?
          </Typography>
          {isLoading && <BackDropLoader isOpened={isLoading} />}
          <Button
            variant="contained"
            className={classes.submitButton}
            onClick={onSubmit}
            disabled={isLoading}
          >
            Submit
          </Button>
        </Box>
      </AppModalView>
    </>
  );
};
export default DeleteBookmaker;
