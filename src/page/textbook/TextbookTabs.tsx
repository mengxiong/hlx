import { Tab, Tabs } from '@mui/material';
import { TextbookType } from 'src/api/textbook';
import { useTextbookType } from './useTextbookType';

export function TextbookTabs() {
  const [type, setType] = useTextbookType();

  const handleChange = (evt: React.SyntheticEvent, value: TextbookType) => {
    setType(value);
  };

  return (
    <Tabs variant="scrollable" value={type} onChange={handleChange}>
      <Tab label="英语课程" value={TextbookType.English} />
      <Tab label="汉语课程" value={TextbookType.Chinese} />
    </Tabs>
  );
}
