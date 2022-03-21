import { useEffect, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { useDebounce } from 'shared/hooks';

interface ISearchField {
  callback(value: string): void;
}

function SearchField({ callback }: ISearchField) {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 1000);

  useEffect(() => {
    callback(debouncedValue);
  }, [callback, debouncedValue]);
  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      fullWidth
      variant="standard"
      placeholder="Search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default SearchField;
