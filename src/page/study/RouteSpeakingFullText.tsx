import { Typography } from '@mui/material';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { checkVoice, FullTextInfo } from 'src/api/study';
import { AudioRecorder } from 'src/component/AudioRecorder';
import { blobToBase64 } from 'src/util';
import { StudyContainer } from './Container';
import { SpeakingSentenceTip } from './SpeakingSentenceTip';
import { useStudy } from './useStudy';

interface SpeakingFullTextProps {
  data: FullTextInfo[];
  title: string;
}

export function SpeakingFullText({ data, title }: SpeakingFullTextProps) {
  const { type, stepValue } = useParams() as { type: string; stepValue: string };

  const [editable, setEditable] = useState(false);

  const [audio, setAudio] = useState<Blob>();

  const reset = () => setAudio(undefined);

  const sentenceMutation = useMutation(checkVoice);

  const isCorrect = async (value: FullTextInfo) => {
    const audioBase64 = await blobToBase64(audio!);
    const val = await sentenceMutation.mutateAsync({
      type: parseInt(stepValue, 10),
      id: value.id,
      language: type,
      audioBase64,
    });
    return val.status === '1';
  };

  const { current, isLoading, onConfirm, ...restProps } = useStudy({
    data,
    reset,
    validateText: '请先录音',
    validate: () => audio === undefined,
    isCorrect,
  });

  const index = data.indexOf(current);

  return (
    <StudyContainer
      tips={
        <SpeakingSentenceTip
          audioAttach={current.audioAttach}
          words={sentenceMutation.data?.words}
        />
      }
      title={title}
      confirmProps={{ disabled: editable && !audio }}
      footer={
        editable ? <AudioRecorder value={audio} onChange={setAudio} key={current.id} /> : undefined
      }
      isLoading={isLoading || sentenceMutation.isLoading}
      onConfirm={editable ? onConfirm : () => setEditable(true)}
      confirmText={editable ? '提交' : '知道了'}
      {...restProps}
    >
      {!editable
        ? data.map((item) => (
            <Typography gutterBottom key={item.id} variant="study">
              {item.character ? `${item.character}: ${item.content}` : item.content}
            </Typography>
          ))
        : data.slice(0, index + 1).map((item, i) => {
            return i === index ? (
              <Typography key={item.id} component="div" variant="study" sx={{ display: 'flex' }}>
                {item.character && `${item.character}: `}
              </Typography>
            ) : (
              <Typography gutterBottom key={item.id} variant="study">
                {item.character ? `${item.character}: ${item.content}` : item.content}
              </Typography>
            );
          })}
    </StudyContainer>
  );
}
