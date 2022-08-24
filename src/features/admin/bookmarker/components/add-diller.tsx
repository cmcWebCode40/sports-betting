import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { useAppSelector } from '../../../../provider/hooks/hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(0),
    },
  }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 230,
    },
  },
};

interface ITagInputField {
  title?: string;
  values: string[];
  setValues: Dispatch<SetStateAction<any>>;
}

const AddDiller = ({ setValues, values, title }: ITagInputField): JSX.Element => {
  const classes = useStyles();
  const { languages } = useAppSelector((state) => state.bookmarkers);
  const [data, setData] = useState<any>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setData(event.target.value as string[]);
    setValues(event.target.value as string[]);
  };

  useEffect(() => {
    if (!data.length) {
      const sportNames = values.map((item: any) => item.name);
      setData(sportNames);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length, values]);

  return (
    <>
      <FormControl fullWidth className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">{title}</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={data}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => (selected as string[]).join(', ')}
          MenuProps={MenuProps}
        >
          {languages.map((item: any) => (
            <MenuItem key={item.code} value={item.code}>
              <Checkbox color="primary" checked={data.indexOf(item.code) > -1} />
              <ListItemText primary={item.code} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default AddDiller;
