import { ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';

// eslint-disable-next-line no-shadow
type InputFileFormats = 'image' | 'video';

interface IInputFile {
  file: File | null;
  setter: (file: File | null) => void;
  type?: InputFileFormats;
}

const formats: { [key in InputFileFormats]: string } = {
  image: 'image/png,image/jpg,image/jpeg',
  video: 'video/mp4,video/*',
};

function InputFile({ file, setter, type = 'video' }: IInputFile) {
  const handleFile = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (!target.files) return;
    if (target.files.length > 0) setter(target.files[0]);
  };
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Button variant="contained" component="label">
        Choose file
        <input
          accept={formats[type]}
          onChange={handleFile}
          type="file"
          hidden
        />
      </Button>
      {file && <p>{file.name}</p>}
      {file && (
        <IconButton onClick={() => setter(null)}>
          <DeleteIcon />
        </IconButton>
      )}
    </Stack>
  );
}

export default InputFile;
