import { useEffect, useMemo, useRef, useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import InputAdornment from '@mui/material/InputAdornment';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { useDebounce } from 'shared/hooks';

interface ISearchFieldOptions {
  id: string | number;
  label: string;
}

interface ISearchField {
  autocomplete?: boolean;
  callback(value: string): void;
  options?: ISearchFieldOptions[];
}

const searchFieldId = 'search-field';

function SearchField({
  callback,
  autocomplete = false,
  options,
}: ISearchField) {
  const ref = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 1000);

  const filteredOptions = useMemo(() => {
    if (!options) return [];
    const normalizedValue = value.toLowerCase();
    const availableOptions = options.filter(({ label }) =>
      label.includes(normalizedValue)
    );
    if (
      availableOptions.length === 1 &&
      availableOptions[0].label === normalizedValue
    )
      return [];
    return availableOptions;
  }, [options, value]);

  useEffect(() => {
    callback(debouncedValue);
    setOpenMenu(false);
  }, [callback, debouncedValue]);

  useEffect(() => {
    if (value.length > 0) {
      setOpenMenu(true);
    }
  }, [value.length]);

  const onClickAway = (event: MouseEvent | TouchEvent) => {
    if (!(event.target instanceof Element)) return;
    const {
      target: { id: elementId },
    } = event;
    if (elementId !== searchFieldId) setOpenMenu(false);
  };

  return (
    <>
      <TextField
        id={searchFieldId}
        autoFocus
        ref={ref}
        autoComplete="off"
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
        onClick={() => setOpenMenu(true)}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => {
          if (value.length > 0) {
            setOpenMenu(true);
          }
        }}
      />
      {autocomplete && ref.current && filteredOptions.length > 0 && (
        <ClickAwayListener onClickAway={onClickAway}>
          <Popper
            open={openMenu}
            anchorEl={ref.current}
            style={{ width: ref.current?.offsetWidth || '100%' }}
          >
            <Paper>
              <MenuList>
                {filteredOptions.map((option) => (
                  <MenuItem
                    key={option.id}
                    onClick={() => setValue(option.label)}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Paper>
          </Popper>
        </ClickAwayListener>
      )}
    </>
  );
}

export default SearchField;
