import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

export interface CheckboxGroupProps {
  options: Array<{ label: React.ReactNode; value: string }>;
  value: Array<string>;
  onChange: (values: Array<string>) => void;
}

export function CheckboxGroup({ options, value, onChange }: CheckboxGroupProps) {
  return (
    <FormGroup>
      {options.map((item) => (
        <FormControlLabel
          key={item.value}
          control={
            <Checkbox
              checked={value.indexOf(item.value) !== -1}
              onChange={() => {
                const nextValue = value.slice();
                const index = nextValue.findIndex((v) => v === item.value);
                if (index === -1) {
                  nextValue.push(item.value);
                } else {
                  nextValue.splice(index, 1);
                }
                onChange(nextValue);
              }}
            />
          }
          label={item.label}
        />
      ))}
    </FormGroup>
  );
}
