import { Typography } from '@mui/material';
import { useState } from 'react';
import { WriteFullTextInfo } from 'src/api/study';
import { InputAutoHeight } from 'src/component/InputAutoHeight';
import { Container } from './Container';
import { ReadingContent } from './RouteReading';
import { useStudy } from './useStudy';

interface WriteFullTextProps {
  data: WriteFullTextInfo[];
  title: string;
}

export function WriteFullText({ data, title }: WriteFullTextProps) {
  const [writable, setWritable] = useState(false);

  const [value, setValue] = useState<string>('');
  const reset = () => setValue('');

  const { current, isLoading, onConfirm } = useStudy({
    data,
    reset,
    isCorrect: (item) => value === item.content,
  });

  const index = data.indexOf(current);

  const handleInput: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (evt) => {
    setValue(evt.target.value);
  };

  return (
    <Container
      tips={<ReadingContent current={current} />}
      title={title}
      isLoading={isLoading}
      onConfirm={writable ? onConfirm : () => setWritable(true)}
      confirmText={writable ? '提交' : '知道了'}
    >
      {!writable
        ? data.map((item) => (
            <Typography key={item.id} variant="study">
              {item.character ? `${item.character}: ${item.content}` : item.content}
            </Typography>
          ))
        : data.slice(0, index + 1).map((item, i) => {
            return i === index ? (
              <Typography key={item.id} component="div" variant="study" sx={{ display: 'flex' }}>
                {item.character && `${item.character}: `}
                <InputAutoHeight
                  sx={{ flex: 1 }}
                  value={value}
                  onChange={handleInput}
                  onBlur={onConfirm}
                ></InputAutoHeight>
              </Typography>
            ) : (
              <Typography key={item.id} variant="study">
                {item.character ? `${item.character}: ${item.content}` : item.content}
              </Typography>
            );
          })}
    </Container>
  );
}
