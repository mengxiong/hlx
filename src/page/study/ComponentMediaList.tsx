import { Box, IconButton, Stack } from '@mui/material';
import { Attach } from 'src/api/study';
import ImageIcon from '@mui/icons-material/Image';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import screenfull from 'screenfull';
import { useEffect, useRef, useState } from 'react';

export interface MediaListProps {
  imageAttach?: Attach;
  audioAttach?: Attach;
  videoAttach?: Attach;
}

export function MediaList({ imageAttach, audioAttach, videoAttach }: MediaListProps) {
  const [type, setType] = useState('');
  const imageRef = useRef<HTMLImageElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null); // TODO: 逗号分隔多个视频
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClickImage = () => {
    setType('image');
    if (screenfull.isEnabled) {
      screenfull.request(imageRef.current!);
    }
  };

  const handleClickAudio = () => {
    setType('audio');
  };

  const handleClickVideo = () => {
    setType('video');
    if (screenfull.isEnabled) {
      screenfull.request(videoRef.current!);
    }
  };

  const toggleImageFullscreen: React.MouseEventHandler<HTMLImageElement> = (evt) => {
    const { target } = evt;
    if (screenfull.isEnabled) {
      screenfull.toggle(target as HTMLImageElement);
    }
  };

  useEffect(() => {
    setType('');
  }, [imageAttach, audioAttach, videoAttach]);

  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="center">
        {imageAttach && (
          <IconButton
            size="large"
            color={type === 'image' ? 'primary' : 'default'}
            onClick={handleClickImage}
          >
            <ImageIcon fontSize="inherit" />
          </IconButton>
        )}
        {audioAttach && (
          <IconButton
            size="large"
            color={type === 'audio' ? 'primary' : 'default'}
            onClick={handleClickAudio}
          >
            <AudiotrackIcon fontSize="inherit" />
          </IconButton>
        )}
        {videoAttach && (
          <IconButton
            size="large"
            color={type === 'video' ? 'primary' : 'default'}
            onClick={handleClickVideo}
          >
            <OndemandVideoIcon fontSize="inherit" />
          </IconButton>
        )}
      </Stack>
      <Box m={2} display="flex" justifyContent="center">
        {imageAttach && (
          <img
            style={{ display: type === 'image' ? 'block' : 'none' }}
            alt="study"
            ref={imageRef}
            src={imageAttach.attachUrl}
            onClick={toggleImageFullscreen}
          />
        )}
        {audioAttach && (
          <audio
            ref={audioRef}
            style={{ display: type === 'audio' ? 'block' : 'none' }}
            controls
            src={audioAttach.attachUrl}
          />
        )}
        {videoAttach && (
          <video
            ref={videoRef}
            style={{ display: type === 'video' ? 'block' : 'none' }}
            controls
            src={videoAttach.attachUrl}
          />
        )}
      </Box>
    </Box>
  );
}
