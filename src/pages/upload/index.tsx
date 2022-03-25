import { ChangeEvent, useState } from 'react';
import api from 'api';

function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const handleFile = (event: ChangeEvent) => {
    const { files } = event.target as HTMLInputElement;
    if (!files || files.length === 0) return;
    setFile(files[0]);
  };
  const send = () => {
    if (!file) return;
    const body = {
      part: 'snippet,status',
      snippet: {
        categoryId: '22',
        description: 'Description of uploaded video.',
        title: 'Test video upload.',
      },
      status: {
        privacyStatus: 'private',
      },
    };
    const formData = new FormData();
    formData.append('file', file, 'video_sample.mp4');
    api
      .post('https://www.googleapis.com/upload/youtube/v3/videos', formData)
      .then(({ data }) => {
        console.log(data);
      });
  };
  return (
    <>
      Upload
      <input type="file" name="file" onChange={handleFile} />
      {file && (
        <button type="button" onClick={send}>
          Send
        </button>
      )}
    </>
  );
}

export default UploadPage;
