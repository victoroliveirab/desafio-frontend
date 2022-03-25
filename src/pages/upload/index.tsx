/* eslint-disable jsx-a11y/media-has-caption */
import { useMemo, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { InputFile } from 'components';
import { videosServices } from 'api';
import type { YoutubeCategory } from 'api/videos';

import styles from './styles.module.scss';

function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const filePreview = useMemo(() => file && URL.createObjectURL(file), [file]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<YoutubeCategory[]>([]);
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!file || !categoryId) return;
    const videoTitle = title || 'unknown';
    const videoDescription = description || 'unknown';
    const {
      data: { id },
    } = await videosServices.uploadVideo(file);
    videosServices.uploadVideoInfo(
      id,
      videoTitle,
      videoDescription,
      categoryId
    );
  };

  useEffect(() => {
    if (!file || categories.length > 0) return;
    videosServices.getCategories().then(({ data }) => {
      setCategories(data.items);
    });
  }, [categories.length, file]);

  return (
    <>
      <InputFile file={file} setter={setFile} type="video" />
      {filePreview && (
        <div className={styles['video-wrapper']}>
          <video className={styles.video} src={filePreview} controls />
        </div>
      )}
      {file && (
        <div className={styles.form}>
          <TextField
            label="Title"
            variant="standard"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            variant="standard"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {categories.length > 0 && (
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-standard-label">
                Category
              </InputLabel>
              <Select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                label="Category"
                fullWidth
                variant="standard"
                placeholder="Category"
              >
                {categories.map(({ id, snippet: { title: categoryName } }) => (
                  <MenuItem key={id} value={id}>
                    {categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      )}
    </>
  );
}

export default UploadPage;
