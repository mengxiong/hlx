import { Typography } from '@mui/material';
import reactStringReplace from 'react-string-replace';
import { InputAutoWidth } from './InputAutoWidth';

export interface ClozeProps {
  content: string;
  value: string[];
  onChange: (value: string[]) => void;
}

export function Cloze({ content, value, onChange }: ClozeProps) {
  const handleInput = (
    i: number
  ): React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> => {
    return (evt) => {
      const nextValues = value.slice();
      nextValues[i] = evt.target.value;
      onChange(nextValues);
    };
  };

  let i = -1;
  const items = content.split(/\n/g).map((item, row) => {
    const children = reactStringReplace(item, '#', () => {
      i += 1;
      return <InputAutoWidth value={value[i]} onChange={handleInput(i)} />;
    });
    return (
      <Typography variant="study" key={row} marginBottom={1}>
        {children}
      </Typography>
    );
  });

  return <div>{items}</div>;
}
