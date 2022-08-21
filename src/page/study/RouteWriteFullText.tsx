import { TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { FullTextInfo } from 'src/api/study';
import { StudyContainer } from './Container';
import { ReadingContent } from './RouteReading';
import { useStudy } from './useStudy';

interface WriteFullTextProps {
  data: FullTextInfo[];
  title: string;
}

export function WriteFullText({ data, title }: WriteFullTextProps) {
  const [editable, setEditable] = useState(false);

  const [value, setValue] = useState<string>('');
  const reset = () => setValue('');

  const { current, isLoading, onConfirm, ...restProps } = useStudy({
    data,
    reset,
    isCorrect: (item) => value === item.content,
  });

  const index = data.indexOf(current);

  const handleInput: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (evt) => {
    setValue(evt.target.value);
  };

  return (
    <StudyContainer
      tips={<ReadingContent current={current} />}
      title={title}
      isLoading={isLoading}
      onConfirm={editable ? onConfirm : () => setEditable(true)}
      confirmText={editable ? '提交' : '知道了'}
      {...restProps}
    >
      {!editable
        ? data.map((item) => (
            <Typography gutterBottom key={item.id} variant="study">
              {item.character ? `${item.character}: ${item.content}` : item.content}
            </Typography>
          ))
        : data.slice(0, index + 1).map((item, i) => {
            return i === index ? (
              <Typography key={item.id} component="div" variant="study" sx={{ display: 'flex' }}>
                {item.character && `${item.character}: `}
                <TextField
                  sx={{ flex: 1 }}
                  multiline
                  value={value}
                  onChange={handleInput}
                  onBlur={onConfirm}
                  variant="standard"
                />
              </Typography>
            ) : (
              <Typography gutterBottom key={item.id} variant="study">
                {item.character ? `${item.character}: ${item.content}` : item.content}
              </Typography>
            );
          })}
    </StudyContainer>
  );
}
