import { useState } from 'react';
import { SelectionInfo } from 'src/api/study';
import { CheckboxGroup } from 'src/component/CheckboxGroup';
import { RadioGroups } from 'src/component/RadioGroup';
import { Container } from './Container';
import { Subject } from './Subject';
import { Tips } from './Tips';
import { useStudy } from './useStudy';

interface SelectionProps {
  data: SelectionInfo[];
  title: string;
  baseKey: 'audioAttach' | 'content';
}

export function Selection({ data, title, baseKey }: SelectionProps) {
  const [value, setValue] = useState('');

  const reset = () => setValue('');

  const { current, ...restProps } = useStudy({
    data,
    reset,
    isCorrect: (item) => value === item.answer,
  });

  const multiSelect = current.answer.indexOf('|') !== -1;

  const options = current.options.map((v) => ({
    label: v.type === '006002' ? <img src={v.content} alt={v.content} height="160" /> : v.content,
    value: v.value,
  }));

  return (
    <Container tips={current.tips && <Tips {...current.tips} />} title={title} {...restProps}>
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
