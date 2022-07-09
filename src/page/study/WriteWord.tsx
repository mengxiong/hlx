import { Box } from '@mui/material';
import reactStringReplace from 'react-string-replace';
import { useEffect, useState } from 'react';
import { WriteWordInfo } from 'src/api/study';
import { InputAutoWidth } from 'src/component/InputAutoWidth';
import { ComponentStepFooter } from './ComponentStepFooter';
import { StudyContainer } from './ComponentStudyContainer';
import { Tips } from './Tips';

export function WriteWord({ data, title }: { data: WriteWordInfo[]; title: string }) {
  const [index, setIndex] = useState(0);

  const [values, setValues] = useState<string[]>([]);

  const current = data[index];

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

  useEffect(() => {
    setValues([]);
  }, [index]);

  const isCorrect = () => {
    return values.map((v) => v.trim()).join('|') === current?.answer;
  };

  let i = -1;
  const items = current?.content.split(/\n/g).map((item, row) => {
    const children = reactStringReplace(item, '#', () => {
      i += 1;
      return <InputAutoWidth key={`${index}-${i}`} value={values[i]} onChange={handleInput(i)} />;
    });
    return (
      <Box key={row} marginBottom={1}>
        {children}
      </Box>
    );
  });

  return (
    <StudyContainer
      title={title}
      footer={
        <ComponentStepFooter
          index={index}
          setIndex={setIndex}
          length={data.length}
          isCorrect={isCorrect}
          tips={<Tips {...current.tips} />}
        />
      }
    >
      {items}
    </StudyContainer>
  );
}
