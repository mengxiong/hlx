import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { SelectionInfo } from 'src/api/study';
import { CheckboxGroup } from 'src/component/CheckboxGroup';
import { RadioGroups } from 'src/component/RadioGroup';
import { MediaList } from './ComponentMediaList';
import { ComponentStepFooter } from './ComponentStepFooter';
import { StudyContainer } from './ComponentStudyContainer';

export function Selection({ data, title }: { data: SelectionInfo[]; title: string }) {
  const [index, setIndex] = useState(0);

  const current = data[index];

  const multiSelect = current.answer.indexOf('|') !== -1;

  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setValue('');
  }, [index]);

  const isCorrect = () => {
    return value === current.answer;
  };

  const options = current.options.map((v) => ({
    label: v.type === '006002' ? <img src={v.content} alt={v.content} height="160" /> : v.content,
    value: v.value,
  }));

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
      {current.content ? (
        <Typography mb={1}>{current.content}</Typography>
      ) : (
        <MediaList audioAttach={current.audioAttach} />
      )}
      {multiSelect ? (
        <CheckboxGroup
          value={value.split('|')}
          onChange={(v) => setValue(v.sort().join('|'))}
          options={options}
        ></CheckboxGroup>
      ) : (
        <RadioGroups value={value} onChange={setValue} options={options}></RadioGroups>
      )}
    </StudyContainer>
  );
}
