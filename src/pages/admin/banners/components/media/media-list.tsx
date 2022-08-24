import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import { useGetQuery } from '../../../../../hooks/useGetQuery';
import { ITheme } from '../../../../../themes/theme';
import handleError from '../../../../../utils/functions/error-handler';
import BackDropLoader from '../../../../../components/loaders/backdrop-loader';
import MediaUpload from './media-upload';
import {
  mediaMiddlewareService,
  TBannerItem,
  TBannerResponse,
} from '../../../../../logic/admin/banners.logic';
import { TMethod } from '../../../../../models';
import { CustomLoader } from '../../../../../components';

const queryOptions = {
  queryKey: 'media',
  options: {
    retry: false,
    refetchOnWindowFocus: false,
  },
};

type TResponse = {
  data: {
    data: TBannerResponse;
  };
};

const useStyles = makeStyles((theme: ITheme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  title: {
    fontWeight: 600,
    color: theme.palette.black,
    margin: theme.spacing(1, 0),
  },
  button: {
    margin: theme.spacing(1, 0),
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));

export const MediaList = (): JSX.Element => {
  const classes = useStyles();
  const [media, setMedia] = useState<TBannerItem[]>([]);
  const [open, setOpen] = useState(false);
  const [itemId, setItemId] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [mediaData, setMediaData] = useState<any>({});
  const [action, setAction] = useState<TMethod>('post');
  const {
    data: response,
    isLoading,
    refetch,
  } = useGetQuery<TBannerResponse>({
    queryFn: () =>
      mediaMiddlewareService<unknown, TBannerResponse>({ method: 'get', endPoint: 'banner' }),
    ...queryOptions,
  });

  const openModal = () => {
    setAction('post');
    setOpen(!open);
  };

  const onUpdate = (item: TBannerItem) => {
    setMediaData(item);
    setAction('patch');
    setItemId(item.id);
    setOpen(true);
  };

  const onDelete = (id: number | undefined) => {
    setLoading(!loading);
    mediaMiddlewareService<unknown, TResponse>({ method: 'delete', endPoint: `banner/${id}` })
      .then(() => {
        toast.success('deleted');
        refetch();
      })
      .catch((err: any) => {
        const error = handleError(err);
        toast.error(error.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (response?.data?.data) {
      setMedia(response?.data?.data || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response?.data]);
  if (isLoading) {
    return (
      <Box m={5} display="flex" alignItems="center" justifyContent="center">
        <CustomLoader />
      </Box>
    );
  }
  return (
    <Container fixed>
      {loading && <BackDropLoader isOpened={loading} />}

      <Typography className={classes.title} variant="h3">
        Site Media
      </Typography>
      {open && (
        <MediaUpload
          mediaData={mediaData}
          setMediaData={setMediaData}
          getBanners={refetch}
          action={action}
          open={open}
          itemId={itemId}
          setOpen={setOpen}
        />
      )}
      <div>
        <Box my={3}>
          <Button onClick={openModal} size="small" variant="contained" color="primary">
            Add Site Media
          </Button>
        </Box>
        <Grid container spacing={2}>
          {media.map((item: TBannerItem) => (
            <Grid md={4} xs={12} item key={item.id}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia className={classes.media} image={item.link} title={item.title} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" onClick={() => onUpdate(item)}>
                    update
                  </Button>
                  <Button size="small" onClick={() => onDelete(item.id as number)} color="primary">
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default MediaList;
