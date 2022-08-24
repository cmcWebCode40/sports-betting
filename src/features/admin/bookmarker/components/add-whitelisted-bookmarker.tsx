/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Autocomplete } from '@material-ui/lab';
import { useHistory, useLocation } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import { Box } from '@material-ui/core';
import { useAddBookMarkers } from '../styles/bookmarker.styles';
import {
  AddBookmakerSchema,
  bookmakerApiMiddleware,
  IAddBookmakerSchema,
  onErrorBMK,
  prepareBookmakerData,
} from '../../../../logic/admin/all-bookmarkers.logic';
import { IErrorArgs } from '../../../../models/error-handler.model';
import { useAppSelector } from '../../../../provider/hooks/hooks';
import TagInputField from './tag-input-field';
import { TBookmarkers } from '../../../../models/bookmarkers.model';
import PaymentMethods from './payment-methods';
import { queryUrl } from '../../../../helpers/query-params';
import useBookmakerDetails from '../hooks/use-bookmaker-details';
import AddDiller from './add-diller';
import { resizeFile } from '../../../../utils/functions/image-resizer';

const AddWhiteListedBookmarker = (): JSX.Element => {
  const classes = useAddBookMarkers();
  const history = useHistory();
  const location = useLocation();
  const queryId = queryUrl(location).get('id');
  const [app, setApp] = useState({ ios: false, android: false });
  const [diller, setDiller] = useState<any>([]);
  const [telephone, setTelePhone] = useState<any>('');
  const [withdrawal, setWithdrawal] = useState<any[]>([]);
  const [deposit, setDeposit] = useState<any[]>([]);
  const [playableSports, setPlayableSports] = useState<any>([]);
  const [files, setFiles] = useState<any>([]);
  const [bettingOptions, setBettingOptions] = useState({
    cashout: false,
    liveStreaming: false,
    liveBetting: false,
  });
  const isMounted = useRef<boolean>(false);
  const { mutate, isLoading } = useMutation<unknown, IErrorArgs, unknown, unknown>((dataInput) =>
    bookmakerApiMiddleware<unknown>({
      data: dataInput,
      method: queryId ? 'patch' : 'post',
      url: queryId ? `/bookmakers/slug/${queryId}` : '/bookmakers',
    }),
  );

  const { isLoading: isFetching, response } = useBookmakerDetails({ id: queryId });
  const { bookmakersList } = useAppSelector((state) => state.bookmarkers);
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddBookmakerSchema>({
    resolver: yupResolver(AddBookmakerSchema),
  });

  useEffect(() => {
    if (!isMounted.current && response?.id) {
      setApp(response.app);
      setDiller(response.diller);
      setWithdrawal(response.withdrawal);
      reset({
        dateFounded: moment(response.about.dateFounded).format('YYYY-MM-DD'),
        hq: response.about.hq,
        license: response.about.license,
        website: response.about.website,
        email: response.about.email,
        helpDesk: response.about.helpDesk,
        name: response.slug,
        registrationLink: response.registrationLink,
      });
      setTelePhone({ phoneInput: response.about?.telephone });
      setDeposit(response.deposit);
      setPlayableSports(response.playableSports);
      setBettingOptions(response.bettingOptions);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: async (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file: unknown) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file as unknown as any),
          }),
        ),
      );
    },
  });

  const handleAppOptions = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setApp((apps) => ({ ...apps, [name]: checked }));
  };

  const handleBettingOptions = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setBettingOptions((bets) => ({ ...bets, [name]: checked }));
  };

  const onRemoveImage = () => setFiles([]);

  const imagePreview = files.map((file: any) => (
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
    history.push(`/admin/bookmakers`);
  };

  const onSubmit = async (values: IAddBookmakerSchema) => {
    let image;
    if (files[0]) {
      image = await resizeFile(files[0]);
    }
    const formData = prepareBookmakerData({
      values,
      files: image,
      app,
      telephone,
      bettingOptions,
      diller,
      playableSports,
      deposit,
      withdrawal,
    });

    mutate(formData, { onSuccess, onError: onErrorBMK });
  };

  useEffect(
    () => () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  if (isFetching) {
    return <p>Loading.....</p>;
  }

  return (
    <Paper className={classes.contentWrapper}>
      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          <PaymentMethods data={withdrawal} setData={setWithdrawal} title="Withdrawal" />
        </Grid>
        <Grid item md={6} xs={12}>
          <PaymentMethods data={deposit} setData={setDeposit} title="Deposit" />
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.content}>
        <Grid container spacing={4}>
          <Grid item md={3} xs={12}>
            <Box component="h4">{response.slug}</Box>

            <Autocomplete
              id="combo-box-demo"
              options={bookmakersList}
              getOptionLabel={(option: TBookmarkers) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  fullWidth
                  label="Bookmaker Name"
                  {...register('name')}
                  error={!!errors?.name}
                  helperText={errors?.name?.message}
                />
              )}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <Controller
              name="website"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Website"
                  placeholder="e.g https://example.com/"
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.website)}
                  helperText={errors.website?.message}
                />
              )}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <Controller
              name="dateFounded"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  type="date"
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.dateFounded)}
                  helperText={errors.dateFounded?.message}
                />
              )}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <Controller
              name="license"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  label="license"
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.license)}
                  helperText={errors.license?.message}
                />
              )}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <Controller
              name="hq"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  label="hq"
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.hq)}
                  helperText={errors.hq?.message}
                />
              )}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <Controller
              name="helpDesk"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Help Desk"
                  value={value}
                  placeholder="e.g https://example.com/"
                  onChange={onChange}
                  error={Boolean(errors.helpDesk)}
                  helperText={errors.helpDesk?.message}
                />
              )}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Email"
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <Controller
              name="registrationLink"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="e.g https://example.com/"
                  label="Registration Link"
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.registrationLink)}
                  helperText={errors.registrationLink?.message}
                />
              )}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <div>
              <span>+{telephone?.phoneInput}</span>
            </div>
            <PhoneInput
              country="us"
              inputStyle={{
                width: '100%',
                height: '2.5rem',
              }}
              onChange={(phoneInput) => setTelePhone({ phoneInput })}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <Controller
              name="deposit"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Deposit"
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.deposit)}
                  helperText={errors.deposit?.message}
                />
              )}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <Controller
              name="welcomeBonus"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Welcome Bonus"
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.welcomeBonus)}
                  helperText={errors.welcomeBonus?.message}
                />
              )}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <AddDiller title="Diller" values={diller} setValues={setDiller} />
          </Grid>
          <Grid item md={3} xs={12}>
            <TagInputField
              title="Playable Sports"
              values={playableSports}
              setValues={setPlayableSports}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <h4>App Availability</h4>
            <FormControlLabel
              control={
                <Checkbox
                  checked={app.ios}
                  onChange={handleAppOptions}
                  name="ios"
                  color="primary"
                />
              }
              label="Ios"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={app.android}
                  onChange={handleAppOptions}
                  name="android"
                  color="primary"
                />
              }
              label="android"
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <h4>Betting Options</h4>
            <FormControlLabel
              control={
                <Checkbox
                  checked={bettingOptions.cashout}
                  name="cashout"
                  onChange={handleBettingOptions}
                  color="primary"
                />
              }
              label="Cashout"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={bettingOptions.liveStreaming}
                  name="liveStreaming"
                  onChange={handleBettingOptions}
                  color="primary"
                />
              }
              label="live Streaming"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={bettingOptions.liveBetting}
                  name="liveBetting"
                  onChange={handleBettingOptions}
                  color="primary"
                />
              }
              label="live Betting"
            />
          </Grid>
          <Grid item md={12} xs={12} className={classes.imgContainer}>
            <img src={response.logo} alt={response.name} height="100" />
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
              {imagePreview}
            </div>
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
    </Paper>
  );
};

export default AddWhiteListedBookmarker;
