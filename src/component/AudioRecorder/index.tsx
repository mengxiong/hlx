import { Button } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useEffect, useRef, useState } from 'react';
import { padStart, debounce } from 'lodash';
import { RecorderManager } from './recorderManager';

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

  const stop = async () => {
    const blob = await recorderManager.stop();
    const audioURL = window.URL.createObjectURL(blob);
    setRecordingUrl(audioURL);
  };

  const start = () => {
    // 取消暂停步骤
    if (recordState === 'paused') {
      recorderManager.resume();
    } else if (recordState === 'recording') {
      // recorderManager.pause();
      stop();
    } else {
      setRecordingUrl('');
      recorderManager.start();
    }
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
    } else if (recordState !== 'paused') {
      setTime(0);
    }
    return () => {
      window.clearInterval(intervalId.current);
    };
  }, [recordState]);

  useEffect(() => {
    const audio = audioEl;

    if (recordingUrl) {
      const playList: string[] = [];
      if (url) {
        playList.push(url);
      }
      playList.push(recordingUrl);
      let i = 0;
      const throttleSetAudioState = debounce(setAudioState, 50);

      audio.addEventListener('play', () => {
        throttleSetAudioState('play');
      });
      audio.addEventListener('pause', () => {
        throttleSetAudioState('pause');
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
    <>
      <Button
        size="large"
        variant="outlined"
        startIcon={
          audioState === 'play' ? (
            <PauseIcon fontSize="large" />
          ) : (
            <PlayArrowIcon fontSize="large" />
          )
        }
        disabled={!recordingUrl}
        onClick={togglePlay}
      >
        {audioState === 'play' ? '暂停' : '播放'}
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={
          recordState === 'recording' ? (
            <StopIcon fontSize="large" />
          ) : (
            <CircleIcon fontSize="large" />
          )
        }
        onClick={start}
      >
        {recordState === 'recording' ? `${mm}:${ss}` : '录音'}
      </Button>
    </>
  );
}
