import { useEffect, useState } from 'react';
import { WriteWordInfo } from 'src/api/study';
import { InputAutoWidth } from 'src/component/InputAutoWidth';
import { ComponentStepFooter } from './ComponentStepFooter';
import { StudyContainer } from './ComponentStudyContainer';

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

  const items = current?.content.split('#').reduce((previousValue, currentValue, i, array) => {
    return previousValue.concat([
      currentValue,
      i !== array.length - 1 ? (
        <InputAutoWidth key={`${index}-${i}`} value={values[i]} onChange={handleInput(i)} />
      ) : null,
    ]);
  }, [] as React.ReactNode[]);

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
      {items}
    </StudyContainer>
  );
}
