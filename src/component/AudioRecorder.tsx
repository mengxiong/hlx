import { IconButton, Stack, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { RecorderManager } from 'src/lib/RecorderManager';
import { useEffect, useRef, useState } from 'react';
import { padStart } from 'lodash';

export interface AudioRecorderProps {
  url?: string; // 标准音频
}

export function AudioRecorder({ url }: AudioRecorderProps) {
  const recorderManager = RecorderManager.getInstance();
  const [recordState, setRecordState] = useState<RecordingState>('inactive');
  const [time, setTime] = useState(0);
  const [recordingUrl, setRecordingUrl] = useState('');
  const [audioState, setAudioState] = useState('');
  const intervalId = useRef<number>();
  const [audioEl] = useState(() => new Audio());

  const start = () => {
    if (recordState === 'paused') {
      recorderManager.resume();
    } else if (recordState === 'recording') {
      recorderManager.pause();
    } else {
      setRecordingUrl('');
      recorderManager.start();
    }
  };

  const stop = async () => {
    const blob = await recorderManager.stop();
    const audioURL = window.URL.createObjectURL(blob);
    setRecordingUrl(audioURL);
  };

  const togglePlay = () => {
    if (audioState === 'play') {
      audioEl.pause();
    } else {
      audioEl.play();
    }
  };

  useEffect(() => {
    recorderManager.on('statechange', setRecordState);
    return () => {
      recorderManager.off('statechange', setRecordState);
    };
  }, []);

  useEffect(() => {
    if (recordState === 'recording') {
      intervalId.current = window.setInterval(() => {
        setTime((value) => value + 1);
      }, 1000);
    } else if (recordState === 'inactive') {
      setTime(0);
    }
    return () => {
      window.clearInterval(intervalId.current);
    };
  }, [recordState]);

  useEffect(() => {
    const audio = audioEl;

    if (recordingUrl) {
      const playList = [recordingUrl];
      if (url) {
        playList.push(url);
      }
      let i = 0;
      audio.addEventListener('play', () => {
        setAudioState('play');
      });
      audio.addEventListener('pause', () => {
        setAudioState('pause');
      });
      audio.addEventListener('ended', () => {
        i = (i + 1) % playList.length;
        audio.src = playList[i];
        audio.play();
      });
      audio.loop = false;
      audio.src = playList[i];
      audio.play();
    }
    return () => {
      audio.pause();
    };
  }, [recordingUrl, url]);

  const mm = padStart(String((time / 60) | 0), 2, '0');
  const ss = padStart(String(time % 60), 2, '0');

  return (
    <Stack pt={2} pb={4} direction="row" spacing={4} justifyContent="center" alignItems="end">
      <IconButton sx={{ color: '#000' }} disabled={!recordingUrl} onClick={togglePlay}>
        {audioState === 'play' ? (
          <PauseIcon fontSize="large" />
        ) : (
          <PlayArrowIcon fontSize="large" />
        )}
      </IconButton>
      <Stack justifyContent="center" alignItems="center">
        <Typography>
          {recordState === 'recording' || recordState === 'paused' ? `${mm}:${ss}` : ' '}
        </Typography>
        <IconButton sx={{ border: '1px solid #ccc' }} onClick={start} color="error">
          {recordState === 'recording' ? (
            <PauseIcon fontSize="large" />
          ) : (
            <CircleIcon fontSize="large" />
          )}
        </IconButton>
      </Stack>

      <IconButton
        sx={{ color: '#000' }}
        disabled={recordState !== 'recording' && recordState !== 'paused'}
        onClick={stop}
      >
        <StopIcon fontSize="large" />
      </IconButton>
    </Stack>
  );
}
