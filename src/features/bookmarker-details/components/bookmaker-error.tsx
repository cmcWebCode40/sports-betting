import React, { SetStateAction } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { AppModalView } from '../../../components';
import { useRatingModalStyles } from '../styles/bookmakers-details.styles';

type TData = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

const BookMarkerError = ({ open, setOpen }: TData): JSX.Element => {
  const classes = useRatingModalStyles();

  const onClose = () => setOpen(!open);

  return (
    <>
      <AppModalView disableBoxClose open={open} setOpen={setOpen} title="Warning">
        <Box className={classes.boxContent}>
          <Typography className={classes.titleHeader} variant="h3">
            You can add maximum 4 bookmakers.
          </Typography>
          <Button
            variant="contained"
            className={classes.submitButton}
            onClick={onClose}
            color="primary"
          >
            Okay
          </Button>
        </Box>
      </AppModalView>
    </>
  );
};

export default BookMarkerError;
