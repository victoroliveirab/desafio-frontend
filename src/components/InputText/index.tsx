/* eslint-disable react/jsx-props-no-spreading */
import TextField, { StandardTextFieldProps } from '@mui/material/TextField';

export interface InputTextError {
  error?: boolean;
  errorMessage?: string;
}

interface IInputText extends StandardTextFieldProps, InputTextError {
  setValue: (value: string) => void;
  value: string;
}

function InputText({
  error,
  errorMessage,
  setValue,
  value,
  ...props
}: IInputText) {
  return (
    <TextField
      {...props}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      error={error}
      helperText={error && errorMessage ? errorMessage : undefined}
    />
  );
}

export default InputText;
