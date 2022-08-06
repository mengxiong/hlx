import { useState } from 'react';
import { Attach, WriteSentenceInfo } from 'src/api/study';
import { PickByValue } from 'utility-types';
import { TextField } from '@mui/material';
import { Subject } from './Subject';
import { Container } from './Container';
import { useStudy } from './useStudy';
import { ReadingContent } from './RouteReading';

interface WriteSentenceProps {
  data: WriteSentenceInfo[];
  title: string;
  baseKey: keyof PickByValue<Required<WriteSentenceInfo>, string | Attach>;
}

export function WriteSentence({ data, title, baseKey }: WriteSentenceProps) {
  const [value, setValue] = useState<string>('');
  const reset = () => setValue('');

  const { current, ...restProps } = useStudy({
    data,
    reset,
    isCorrect: (item) => value === item.content,
  });

  const handleInput: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (evt) => {
    setValue(evt.target.value);
  };

  return (
    <Container tips={<ReadingContent current={current} />} title={title} {...restProps}>
      <Subject id={current.id} data={current[baseKey]} />
      <TextField fullWidth multiline value={value} onChange={handleInput} variant="standard" />
    </Container>
  );
}
