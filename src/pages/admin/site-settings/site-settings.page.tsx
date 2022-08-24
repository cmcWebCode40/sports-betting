/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC, useEffect, useState, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  ListItemText,
  makeStyles,
  FormControl,
  Select,
  MenuItem,
  Input,
  CircularProgress,
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ITheme } from '../../../themes/theme';
import { MethodTypes } from '../../../utils/common.definitions';
import { siteSettingsMiddleware } from '../../../logic/admin/site-settings';
import handleError from '../../../utils/functions/error-handler';
import { IErrorArgs } from '../../../models/error-handler.model';
import { useAppSelector } from '../../../provider/hooks/hooks';
import { TLangauage } from '../../../models/bookmarkers.model';

const fetchSiteSettings = () => {
  return siteSettingsMiddleware({ method: MethodTypes.GET });
};

const createSiteSettings = (formData: any) => {
  return siteSettingsMiddleware({ method: MethodTypes.POST, formData });
};

const updateSiteSettings = (formData: any) => {
  return siteSettingsMiddleware({ method: MethodTypes.PATCH, formData });
};

const useStyles = makeStyles(({ palette: { black } }: ITheme) => ({
  root: {
    '& .site-logo': {
      width: 80,
      height: 80,
      background: 'grey',
      marginRight: '1rem',
    },
    '& button': {
      margin: '0 .5rem',
    },
    '& .label': {
      '& span': { color: black, fontSize: '1.1rem' },
      margin: '.5rem 0',
    },
  },
  input: {
    display: 'none',
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  languages: yup.array().required(),
  facebook: yup.string().url().required(),
  telegram: yup.string().url().required(),
  instagram: yup.string().url().required(),
  twitter: yup.string().url().required(),
});

export const SiteSettingsPage: FC = () => {
  const classes = useStyles();

  const [personName, setPersonName] = useState<string[]>([]);
  const [isSiteSettingCreated, setIsSiteSettingCreated] = useState<boolean>(false);
  const isMounted = useRef<boolean>(false);
  const { app } = useAppSelector((state) => state.bookmarkers);

  const { data, isLoading } = useQuery('site-details', fetchSiteSettings);

  const queryClient = useQueryClient();

  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!data?.data) {
      setIsSiteSettingCreated(false);
    } else {
      setIsSiteSettingCreated(true);
    }
  }, [data, reset]);

  useEffect(() => {
    if (!isMounted.current && !isLoading && data) {
      const languages = data.data.translations.map((translation) => translation.code);
      reset({
        name: data?.data.name,
        email: data?.data.email,
        ...data?.data.socialLinks,
        languages,
      });
      isMounted.current = true;
      setPersonName(languages);
    }
  }, [reset, data, isLoading]);

  const { mutate, isLoading: isSubmitting } = useMutation(
    isSiteSettingCreated ? updateSiteSettings : createSiteSettings,
    {
      onSuccess: (res) => {
        toast.success(res?.message);
        queryClient.invalidateQueries('site-details');
      },
      onError: (err) => {
        const error = handleError(err as IErrorArgs);
        toast.error(error.message);
      },
    },
  );

  const handleChange = (event: React.ChangeEvent<{ value: string[] }>) => {
    setPersonName(event.target.value as string[]);
    setValue(`languages`, event.target.value);
  };

  const onSubmitForm = (values: { [key: string]: any }) => {
    const formData = new FormData();
    let socialLinks: { [key: string]: string } = {};
    Object.entries(values).forEach(([key, value]) => {
      if (['twitter', 'facebook', 'telegram', 'instagram'].includes(key)) {
        socialLinks = {
          ...socialLinks,
          [key]: value,
        };
        delete values[key];
      }
    });

    formData.append('socialLinks', JSON.stringify(socialLinks));

    Object.entries(values).forEach(([key, value]) => {
      if (key === 'languages') formData.append(key, JSON.stringify(String(value).split(',')));
      else formData.append(key, value);
    });

    mutate(formData);
  };

  if (isLoading) return <>Loading...</>;

  return (
    <Box
      width="60%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      mx="auto"
      className={classes.root}
    >
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <header>
          <Box my={2}>
            <Typography variant="h2" color="textPrimary">
              <b>Site Setting</b>
            </Typography>
          </Box>
        </header>
        <Box display="flex" flexDirection="column" my={2}>
          <ListItemText className="label">Site name:</ListItemText>
          <Box display="flex" flexDirection="row" width="100%" alignItems="center">
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" my={2}>
          <ListItemText className="label">Contact email:</ListItemText>
          <Box display="flex" flexDirection="row" width="100%" alignItems="center">
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  type="email"
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" my={2}>
          <ListItemText className="label">Social links:</ListItemText>
          <Box display="flex" flexDirection="row" width="100%" alignItems="center" my={1}>
            <Box fontWeight="bold" fontSize="1rem">
              <Typography variant="h5" color="textPrimary">
                Twitter
              </Typography>
            </Box>
            <Controller
              name="twitter"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  style={{ paddingLeft: '.5rem' }}
                  error={Boolean(errors.twitter)}
                  type="url"
                  helperText={errors.twitter?.message}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Box>
          <Box display="flex" flexDirection="row" width="100%" alignItems="center" my={1}>
            <Box fontWeight="bold" fontSize="1rem">
              <Typography variant="h5" color="textPrimary">
                Instagram
              </Typography>
            </Box>
            <Controller
              name="instagram"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  style={{ paddingLeft: '.5rem' }}
                  error={Boolean(errors.instagram)}
                  helperText={errors.instagram?.message}
                  type="url"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Box>
          <Box display="flex" flexDirection="row" width="100%" alignItems="center" my={1}>
            <Box fontWeight="bold" fontSize="1rem">
              <Typography variant="h5" color="textPrimary">
                Facebook
              </Typography>
            </Box>
            <Controller
              name="facebook"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  style={{ paddingLeft: '.5rem' }}
                  error={Boolean(errors.facebook)}
                  helperText={errors.facebook?.message}
                  type="url"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Box>
          <Box display="flex" flexDirection="row" width="100%" alignItems="center" my={1}>
            <Box fontWeight="bold" fontSize="1rem">
              <Typography variant="h5" color="textPrimary">
                Telegram
              </Typography>
            </Box>
            <Controller
              name="telegram"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  style={{ paddingLeft: '.5rem' }}
                  error={Boolean(errors.telegram)}
                  helperText={errors.telegram?.message}
                  type="url"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" my={2}>
          <Controller
            name="languages"
            control={control}
            render={({ field: { value } }) => (
              <FormControl
                variant="outlined"
                size="small"
                fullWidth
                error={Boolean(errors.languages)}
              >
                <ListItemText className="label">Site languages:</ListItemText>
                <Select
                  labelId="demo-mutiple-name-label"
                  id="demo-mutiple-name"
                  multiple
                  value={personName}
                  onChange={
                    handleChange as
                      | ((
                          event: React.ChangeEvent<{
                            name?: string | undefined;
                            value: unknown;
                          }>,
                          child: React.ReactNode,
                        ) => void)
                      | undefined
                  }
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {(app.translations || []).map((item: TLangauage) => (
                    <MenuItem key={item.code} value={item.code}>
                      {item.code}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Box>
        <Button fullWidth disabled={isSubmitting} type="submit" variant="contained" color="primary">
          {!isSubmitting ? 'Submit' : <CircularProgress size={24} />}
        </Button>
      </form>
    </Box>
  );
};
