import { useState } from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { Attach, checkSentence, SpeakingInfo } from 'src/api/study';
import { AudioRecorder } from 'src/component/AudioRecorder';
import { blobToBase64 } from 'src/util';
import { PickByValue } from 'utility-types';
import { StudyContainer } from './Container';
import { SpeakingSentenceTip } from './SpeakingSentenceTip';
import { Subject } from './Subject';
import { useStudy } from './useStudy';

type BaseKey = keyof PickByValue<Required<SpeakingInfo>, string | Attach>;

interface SpeakingProps {
  data: SpeakingInfo[];
  title: string;
  baseKey: BaseKey | BaseKey[];
}

export function SpeakingSentence({ data, title, baseKey }: SpeakingProps) {
  const { type } = useParams() as { type: string };

  const [audio, setAudio] = useState<Blob>();

  const sentenceMutation = useMutation(checkSentence);

  const isCorrect = async (value: SpeakingInfo) => {
    const audioBase64 = await blobToBase64(audio!);
    const val = await sentenceMutation.mutateAsync({ id: value.id, language: type, audioBase64 });
    return val.status === '1';
  };

  const { current, isLoading, ...restProps } = useStudy({
    data,
    isCorrect,
  });
  const baseKeys = Array.isArray(baseKey) ? baseKey : [baseKey];

  return (
    <StudyContainer
      footer={
        <AudioRecorder onStop={setAudio} key={current.id} url={current.audioAttach?.attachUrl} />
      }
      confirmProps={{ disabled: !audio }}
      confirmText="读的不错"
      title={title}
      isLoading={isLoading || sentenceMutation.isLoading}
      tips={
        <SpeakingSentenceTip
          audioAttach={current.audioAttach}
          words={sentenceMutation.data?.words}
        />
      }
      {...restProps}
    >
      {baseKeys.map((key) => (
        <Subject key={key} id={current.id} data={current[key]} />
      ))}
    </StudyContainer>
  );
}
