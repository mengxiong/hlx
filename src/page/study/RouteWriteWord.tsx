import { Typography } from '@mui/material';
import reactStringReplace from 'react-string-replace';
import { useState } from 'react';
import { WriteWordInfo } from 'src/api/study';
import { InputAutoWidth } from 'src/component/InputAutoWidth';
import { Container } from './Container';
import { useStudy } from './useStudy';
import { Tips } from './Tips';

export function WriteWord({ data, title }: { data: WriteWordInfo[]; title: string }) {
  const [values, setValues] = useState<string[]>([]);
  const reset = () => setValues([]);

  const { current, ...restProps } = useStudy({
    data,
    reset,
    isCorrect: (item) => values.map((v) => v.trim()).join('|') === item.answer,
  });

  const handleInput = (
    i: number
  ): React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> => {
    return (evt) => {
      const { value } = evt.target;
      setValues((prevValues) => {
        const nextValues = prevValues.slice();
        nextValues[i] = value;
        return nextValues;
      });
    };
  };

  let i = -1;
  const items = current?.content.split(/\n/g).map((item, row) => {
    const children = reactStringReplace(item, '#', () => {
      i += 1;
      return (
        <InputAutoWidth key={`${current.id}-${i}`} value={values[i]} onChange={handleInput(i)} />
      );
    });
    return (
      <Typography variant="study" key={row} marginBottom={1}>
        {children}
      </Typography>
    );
  });

  return (
    <Container tips={<Tips {...current.tips} />} title={title} {...restProps}>
      {items}
    </Container>
  );
}
