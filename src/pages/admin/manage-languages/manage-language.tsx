import React, { useState } from 'react';
import {
  MenuItem,
  Select,
  TextField,
  Box,
  FormControl,
  makeStyles,
  Avatar,
  Divider,
  Typography,
} from '@material-ui/core/';
import { ITheme } from '../../../themes/theme';
import { LanguageSchema } from './schemas/language.schema';
import { useAppSelector } from '../../../provider/hooks/hooks';
import { TLangauage } from '../../../models/bookmarkers.model';
import { TranslationsSchema } from '../../../models';
import { onSelectPage } from '../../../logic/admin/manage-translations.logic';

const useStyles = makeStyles((theme: ITheme) => ({
  toolbarSelect: {
    margin: theme.spacing(0.4, 0.8),
  },
  avatar: {
    height: 20,
    width: 20,
    margin: theme.spacing(0, 0.4),
  },
}));

const ManageLanguage = (): JSX.Element => {
  const classes = useStyles();
  const [translations, setTranslations] = useState<TranslationsSchema>();
  const { app } = useAppSelector((state) => state.bookmarkers);

  return (
    <div>
      <Box display="flex" width="50%" flexDirection="column" justifyContent="center" mx="auto">
        <Box my={3}>
          <Typography color="primary" variant="h3">
            Manage Language Translations
          </Typography>
          <Divider />
        </Box>
        <Box display="flex">
          <FormControl className={classes.toolbarSelect} fullWidth>
            <Select
              onChange={(e) => {
                setTranslations(onSelectPage(e.target.value as any));
              }}
              labelId="select-field"
              variant="outlined"
              id="select-field"
              label="Page"
            >
              <MenuItem value="">
                <em>Select Page </em>
              </MenuItem>
              {LanguageSchema.map((lng) => (
                <MenuItem key={lng.title} value={lng.title}>
                  {lng.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.toolbarSelect} fullWidth>
            <Select labelId="select-field" variant="outlined" id="select-field" label="Page">
              <MenuItem value="">
                <em>Select Language</em>
              </MenuItem>
              {(app.translations || []).map((item: TLangauage) => (
                <MenuItem key={item.code} value={item.code}>
                  <Avatar className={classes.avatar} src={item.icon} variant="circle" />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {translations?.translations.map((item) => (
          <Box key={item}>
            <Box component="h3" my={2}>
              {' '}
              {item}
            </Box>
            <TextField fullWidth id="outlined-basic" label="Outlined" variant="outlined" />
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default ManageLanguage;
