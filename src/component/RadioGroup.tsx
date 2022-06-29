import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

export interface RadioGroupProps {
  value?: string;
  onChange: (value: string) => void;
  options: Array<{ label: React.ReactNode; value: string }>;
}

export function RadioGroups({ value, onChange, options }: RadioGroupProps) {
  return (
    <RadioGroup value={value} onChange={(evt) => onChange(evt.target.value)}>
      {options.map((item) => (
        <FormControlLabel
          key={item.value}
          label={item.label}
          value={item.value}
          control={<Radio />}
        />
      ))}
    </RadioGroup>
  );
}
