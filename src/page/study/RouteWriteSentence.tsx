import { useState } from 'react';
import { Attach, WriteSentenceInfo } from 'src/api/study';
import { InputAutoHeight } from 'src/component/InputAutoHeight';
import { PickByValue } from 'utility-types';
import { Subject } from './Subject';
import { Container } from './Container';
import { useStep } from './useStep';
import { useSubmit } from './useSubmit';

interface WriteSentenceProps {
  data: WriteSentenceInfo[];
  title: string;
  baseKey: keyof PickByValue<Required<WriteSentenceInfo>, string | Attach>;
}

export function WriteSentence({ data, title, baseKey }: WriteSentenceProps) {
  const [value, setValue] = useState<string>('');
  const reset = () => setValue('');

  const { current, isFirst, isLast, previous, next } = useStep(data, reset);
  const { submit, isLoading } = useSubmit();

  const isCorrect = () => {
    return value === current.content;
  };

  const handleConfirm = () => {
    if (isCorrect()) {
      if (!isLast) {
        next();
      } else {
        submit();
      }
    }
  };

  const handleInput: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (evt) => {
    setValue(evt.target.value);
  };

  return (
    <Container
      title={title}
      isLoading={isLoading}
      onCancel={!isFirst ? previous : undefined}
      onConfirm={handleConfirm}
    >
      <Subject id={current.id} data={current[baseKey]} />
      <InputAutoHeight value={value} onChange={handleInput}></InputAutoHeight>
    </Container>
  );
}
