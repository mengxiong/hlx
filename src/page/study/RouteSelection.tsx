import { useState } from 'react';
import { SelectionInfo } from 'src/api/study';
import { CheckboxGroup } from 'src/component/CheckboxGroup';
import { RadioGroups } from 'src/component/RadioGroup';
import { Container } from './Container';
import { Subject } from './Subject';
import { useStep } from './useStep';
import { useSubmit } from './useSubmit';

interface SelectionProps {
  data: SelectionInfo[];
  title: string;
  baseKey: 'audioAttach' | 'content';
}

export function Selection({ data, title, baseKey }: SelectionProps) {
  const [value, setValue] = useState<string>('');
  const reset = () => setValue('');

  const { current, isFirst, isLast, previous, next } = useStep(data, reset);
  const { submit, isLoading } = useSubmit();

  const isCorrect = () => {
    return value === current.answer;
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

  const multiSelect = current.answer.indexOf('|') !== -1;

  const options = current.options.map((v) => ({
    label: v.type === '006002' ? <img src={v.content} alt={v.content} height="160" /> : v.content,
    value: v.value,
  }));

  return (
    <Container
      title={title}
      isLoading={isLoading}
      onCancel={!isFirst ? previous : undefined}
      onConfirm={handleConfirm}
    >
      <Subject id={current.id!} data={current[baseKey]} />
      {multiSelect ? (
        <CheckboxGroup
          value={value.split('|')}
          onChange={(v) => setValue(v.sort().join('|'))}
          options={options}
        ></CheckboxGroup>
      ) : (
        <RadioGroups value={value} onChange={setValue} options={options}></RadioGroups>
      )}
    </Container>
  );
}
