import React from 'react';
import { Paper, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { useSearchInputStyles } from './styles/search-bar.styles';

interface ISearchInputField {
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: CSSProperties;
  placeholder?: string;
}

const SearchInputField = (props: ISearchInputField): JSX.Element => {
  const { value, onChange, style, ...rest } = props;
  const classes = useSearchInputStyles();

  return (
    <Paper className={classes.root} style={style}>
      <SearchIcon className={classes.icon} />
      <Input
        {...rest}
        value={value}
        disableUnderline
        onChange={onChange}
        className={classes.input}
      />
    </Paper>
  );
};

export default SearchInputField;
