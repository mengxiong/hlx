import { uniqBy } from 'lodash';
import { useState } from 'react';
import { SelectionInfo } from 'src/api/study';
import { CheckboxGroup } from 'src/component/CheckboxGroup';
import { RadioGroups } from 'src/component/RadioGroup';
import { StudyContainer } from './Container';
import { Subject, SubjectBaseKeys } from './Subject';
import { Tips } from './Tips';
import { useStudy } from './useStudy';

interface SelectionProps {
  data: SelectionInfo[];
  title: string;
  baseKey: SubjectBaseKeys<SelectionInfo>;
  multiple?: boolean;
}

export function Selection({ data, title, baseKey, multiple = false }: SelectionProps) {
  const [value, setValue] = useState<string>('');

  const reset = () => setValue('');

  const { current, ...restProps } = useStudy({
    data,
    reset,
    validate: () => value === '',
    isCorrect: (item) => value === item.answer,
  });

  const options = uniqBy(
    current.options.map((v) => ({
      label: v.type === '006002' ? <img src={v.content} alt={v.content} height="160" /> : v.content,
      value: v.value,
    })),
    'value'
  );

  return (
    <StudyContainer tips={current.tips && <Tips {...current.tips} />} title={title} {...restProps}>
      <Subject data={current} baseKey={baseKey} />
      {multiple ? (
        <CheckboxGroup
          value={value ? value.split('|') : []}
          onChange={(v) => setValue(v.sort().join('|'))}
          options={options}
        ></CheckboxGroup>
      ) : (
        <RadioGroups value={value} onChange={setValue} options={options}></RadioGroups>
      )}
    </StudyContainer>
  );
}
