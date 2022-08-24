import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { AppModalView } from '../../../components';
import { useRatingModalStyles } from '../styles/bookmakers-details.styles';
import { IErrorArgs } from '../../../models/error-handler.model';
import { IEmptyResponseData, onError } from '../../../logic/bookmaker.logic';
import BackDropLoader from '../../../components/loaders/backdrop-loader';
import { serviceApiMiddleware } from '../../../services/services';

type TData = {
  rating: string;
  bookmakerName: string;
};

const RatingModal = ({ name }: { name: string }): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState<number | null>(0);
  const [, /* hover */ setHover] = React.useState(-1);
  const classes = useRatingModalStyles();
  const { mutate, isLoading } = useMutation<unknown, IErrorArgs, TData, unknown>((dataInput) =>
    serviceApiMiddleware<IEmptyResponseData>({
      method: 'post',
      data: dataInput,
      url: '/bookmakers/rating',
    }),
  );

  const onOpenModal = () => setOpen(!open);

  const onSuccess = (res: any) => {
    toast.success(res?.data?.message);
    onOpenModal();
  };

  const onSubmit = () => {
    const data = {
      rating: `${value}`,
      bookmakerName: name,
    };
    mutate(data, { onSuccess, onError });
  };

  return (
    <>
      <Button variant="text" className={classes.rateOpen} onClick={onOpenModal}>
        Rate it
      </Button>
      <AppModalView disableBoxClose open={open} setOpen={setOpen}>
        <Box className={classes.boxContent}>
          <Typography className={classes.titleHeader} variant="h3">
            How would you rate this bookmakers?
          </Typography>
          {isLoading && <BackDropLoader isOpened={isLoading} />}
          <Rating
            name="hover-feedback"
            value={value}
            precision={0.5}
            size="large"
            onChange={(_event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(_event, newHover) => {
              setHover(newHover);
            }}
            className={classes.rating}
          />
          <Button
            variant="contained"
            className={classes.submitButton}
            onClick={onSubmit}
            disabled={isLoading}
            color="primary"
          >
            Submit
          </Button>
        </Box>
      </AppModalView>
    </>
  );
};

export default RatingModal;
