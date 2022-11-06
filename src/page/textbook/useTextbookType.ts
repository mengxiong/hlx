import { useSearchParams } from 'react-router-dom';
import { TextbookType } from 'src/api/textbook';

export function useTextbookType() {
  const [searchParams, setSearchParams] = useSearchParams();

  const type = (searchParams.get('type') as TextbookType) || TextbookType.English;

  const setType = (value: TextbookType) => {
    setSearchParams({ type: value });
  };

  return [type, setType] as const;
}
