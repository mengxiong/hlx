import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { WriteSentenceInfo } from 'src/api/study';
import { InputAutoHeight } from 'src/component/InputAutoHeight';
import { MediaList } from './ComponentMediaList';
import { ComponentStepFooter } from './ComponentStepFooter';
import { StudyContainer } from './ComponentStudyContainer';

interface WriteSentenceProps {
  data: WriteSentenceInfo[];
  title: string;
  baseKey: keyof WriteSentenceInfo;
}

export function WriteSentence({ data, title, baseKey }: WriteSentenceProps) {
  const [index, setIndex] = useState(0);

  const [value, setValue] = useState('');

  const current = data[index];

  const handleInput: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (evt) => {
    setValue(evt.target.value);
  };

  const isCorrect = () => {
    return value === current.content;
  };

  useEffect(() => {
    setValue('');
  }, [index]);

  let header: React.ReactNode;
  if (baseKey === 'audioAttach') {
    header = <MediaList key={current.id} attach={current.audioAttach}></MediaList>;
  } else if (baseKey) {
    header = (
      <Typography variant="study" mb={2}>
        {current[baseKey] as string}
      </Typography>
    );
  }

  return (
    <StudyContainer
      title={title}
      footer={
        <ComponentStepFooter
          index={index}
          setIndex={setIndex}
          length={data.length}
          isCorrect={isCorrect}
        />
      }
    >
      {header}
      <InputAutoHeight value={value} onChange={handleInput}></InputAutoHeight>
    </StudyContainer>
  );
}
