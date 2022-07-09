import { LoadingButton } from '@mui/lab';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { WriteFullTextInfo } from 'src/api/study';
import { InputAutoHeight } from 'src/component/InputAutoHeight';
import { StudyContainer } from './ComponentStudyContainer';
import { useSubmit } from './useSubmit';

interface WriteFullTextProps {
  data: WriteFullTextInfo[];
  title: string;
}

export function WriteFullText({ data, title }: WriteFullTextProps) {
  const { submit, isLoading } = useSubmit();

  const [writable, setWritable] = useState(false);

  const [index, setIndex] = useState(0);

  const [value, setValue] = useState('');

  const current = data[index];

  const handleInput: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (evt) => {
    setValue(evt.target.value);
  };

  const isCorrect = () => value === current.content;
  const isLast = () => index === data.length - 1;

  const handleConfirm = () => {
    if (isCorrect()) {
      if (!isLast()) {
        setIndex(index + 1);
        setValue('');
      } else {
        submit();
      }
    }
  };

  return (
    <StudyContainer
      title={title}
      footer={
        !writable ? (
          <Button variant="contained" onClick={() => setWritable(true)}>
            知道了
          </Button>
        ) : (
          <LoadingButton
            loading={isLoading}
            loadingIndicator="提交中..."
            size="large"
            variant="contained"
            onClick={handleConfirm}
          >
            提交
          </LoadingButton>
        )
      }
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
                  onBlur={handleConfirm}
                ></InputAutoHeight>
              </Typography>
            ) : (
              <Typography key={item.id} variant="study">
                {item.character ? `${item.character}: ${item.content}` : item.content}
              </Typography>
            );
          })}
    </StudyContainer>
  );
}
