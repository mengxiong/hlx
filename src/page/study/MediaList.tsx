import { Box, IconButton, Stack } from '@mui/material';
import { Attach, AttachType } from 'src/api/study';
import ImageIcon from '@mui/icons-material/Image';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import screenfull from 'screenfull';
import { useRef, useState } from 'react';

export interface MediaListProps {
  defaultIndex?: number;
  attach: Attach | undefined | Array<Attach | undefined>;
}

// TODO: tabs 重构
export function MediaList({ attach, defaultIndex = 0 }: MediaListProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null); // TODO: 逗号分隔多个视频
  const videoRef = useRef<HTMLVideoElement>(null);

  const filterAttachs = (Array.isArray(attach) ? attach : [attach]).filter(Boolean) as Attach[];

  const imageAttach = filterAttachs.find((v) => v.attachType === AttachType.Image);
  const audioAttach = filterAttachs.find((v) => v.attachType === AttachType.Audio);
  const videoAttach = filterAttachs.find((v) => v.attachType === AttachType.Video);

  const [type, setType] = useState<AttachType | undefined>(filterAttachs[defaultIndex]?.attachType);

  const handleClick = (value: AttachType) => {
    if (value === type) {
      setType(undefined);
      return;
    }
    setType(value);
    if ((value === AttachType.Image || value === AttachType.Video) && screenfull.isEnabled) {
      if (value === AttachType.Image) {
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

  const hideIcon = filterAttachs.length <= 1 && defaultIndex >= 0;

  return (
    <Box>
      {!hideIcon && (
        <Stack direction="row" spacing={2} justifyContent="center">
          {imageAttach && (
            <IconButton
              size="large"
              color={type === AttachType.Image ? 'primary' : 'default'}
              onClick={() => handleClick(AttachType.Image)}
            >
              <ImageIcon fontSize="inherit" />
            </IconButton>
          )}
          {audioAttach && (
            <IconButton
              size="large"
              color={type === AttachType.Audio ? 'primary' : 'default'}
              onClick={() => handleClick(AttachType.Audio)}
            >
              <AudiotrackIcon fontSize="inherit" />
            </IconButton>
          )}
          {videoAttach && (
            <IconButton
              size="large"
              color={type === AttachType.Video ? 'primary' : 'default'}
              onClick={() => handleClick(AttachType.Video)}
            >
              <OndemandVideoIcon fontSize="inherit" />
            </IconButton>
          )}
        </Stack>
      )}
      <Box sx={{ mb: type ? 1 : 0 }} display="flex" justifyContent={hideIcon ? 'start' : 'center'}>
        {imageAttach && (
          <img
            style={{ display: type === AttachType.Image ? 'block' : 'none', maxWidth: 300 }}
            alt="study"
            ref={imageRef}
            src={imageAttach.attachUrl}
            onClick={toggleImageFullscreen}
          />
        )}
        {audioAttach && (
          <audio
            ref={audioRef}
            style={{ display: type === AttachType.Audio ? 'block' : 'none' }}
            controls
            src={audioAttach.attachUrl}
          />
        )}
        {videoAttach && (
          <video
            ref={videoRef}
            style={{ display: type === AttachType.Video ? 'block' : 'none' }}
            controls
            src={videoAttach.attachUrl}
          />
        )}
      </Box>
    </Box>
  );
}
