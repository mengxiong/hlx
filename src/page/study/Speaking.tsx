import { Typography } from '@mui/material';
import { useState } from 'react';
import { SpeakingInfo } from 'src/api/study';
import { AudioRecorder } from 'src/component/AudioRecorder';
import { MediaList } from './ComponentMediaList';
import { ComponentStepFooter } from './ComponentStepFooter';
import { StudyContainer } from './ComponentStudyContainer';

interface SpeakingProps {
  data: SpeakingInfo[];
  title: string;
  baseKey: keyof SpeakingInfo;
}

export function Speaking({ data, title, baseKey }: SpeakingProps) {
  const [index, setIndex] = useState(0);

  // const [value, setValue] = useState('');

  const current = data[index];

  // useEffect(() => {
  //   setValue('');
  // }, [index]);

  let header: React.ReactNode;
  if (baseKey === 'imageAttach') {
    header = <MediaList imageAttach={current.imageAttach}></MediaList>;
  } else if (baseKey) {
    header = <Typography variant="study">{current[baseKey] as string}</Typography>;
  }

  return (
    <StudyContainer
      title={title}
      footer={<ComponentStepFooter index={index} setIndex={setIndex} length={data.length} />}
    >
      {header}
      <AudioRecorder key={index} url={current.audioAttach?.attachUrl} />
    </StudyContainer>
  );
}
