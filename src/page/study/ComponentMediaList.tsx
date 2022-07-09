import { Box, IconButton, Stack } from '@mui/material';
import { Attach, AttachType } from 'src/api/study';
import ImageIcon from '@mui/icons-material/Image';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import screenfull from 'screenfull';
import { useRef, useState } from 'react';

export interface MediaListProps {
  attach: Attach | undefined | Array<Attach | undefined>;
}

export function MediaList({ attach }: MediaListProps) {
  const [type, setType] = useState('');
  const imageRef = useRef<HTMLImageElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null); // TODO: 逗号分隔多个视频
  const videoRef = useRef<HTMLVideoElement>(null);

  const filterAttachs = (Array.isArray(attach) ? attach : [attach]).filter(Boolean) as Attach[];

  const imageAttach = filterAttachs.find((v) => v.attachType === AttachType.Image);
  const audioAttach = filterAttachs.find((v) => v.attachType === AttachType.Audio);
  const videoAttach = filterAttachs.find((v) => v.attachType === AttachType.Video);

  const handleClick = (value: string) => {
    if (value === type) {
      setType('');
      return;
    }
    setType(value);
    if ((value === 'image' || value === 'video') && screenfull.isEnabled) {
      if (value === 'image') {
        screenfull.request(imageRef.current!);
      } else {
        screenfull.request(videoRef.current!);
      }
    }
  };

  const toggleImageFullscreen: React.MouseEventHandler<HTMLImageElement> = (evt) => {
    const { target } = evt;
    if (screenfull.isEnabled) {
      screenfull.toggle(target as HTMLImageElement);
    }
  };

  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="center">
        {imageAttach && (
          <IconButton
            size="large"
            color={type === 'image' ? 'primary' : 'default'}
            onClick={() => handleClick('image')}
          >
            <ImageIcon fontSize="inherit" />
          </IconButton>
        )}
        {audioAttach && (
          <IconButton
            size="large"
            color={type === 'audio' ? 'primary' : 'default'}
            onClick={() => handleClick('audio')}
          >
            <AudiotrackIcon fontSize="inherit" />
          </IconButton>
        )}
        {videoAttach && (
          <IconButton
            size="large"
            color={type === 'video' ? 'primary' : 'default'}
            onClick={() => handleClick('video')}
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
