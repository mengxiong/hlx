import { Typography } from '@mui/material';
import { Attach } from 'src/api/study';
import { PickByValue } from 'utility-types';
import { MediaList } from './MediaList';

type SubjectBaseKey<T> = keyof PickByValue<Required<T>, string | Attach>;

export type SubjectBaseKeys<T> = SubjectBaseKey<T> | SubjectBaseKey<T>[];
export interface SubjectProps<T extends Record<string, any>> {
  mediaId?: string;
  data: T;
  baseKey: SubjectBaseKeys<T>;
  defaultIndex?: number;
}

export function Subject<T extends Record<string, any>>({
  data,
  mediaId = 'id',
  baseKey,
  defaultIndex,
}: SubjectProps<T>) {
  const keys = Array.isArray(baseKey) ? baseKey : [baseKey];

  const stringArray = keys.filter((v) => !/Attach/.test(String(v)));
  const attachArray = keys.filter((v) => /Attach/.test(String(v)));

  return (
    <>
      {stringArray.map((key) => {
        const value = data[key];
        if (typeof value === 'string') {
          return (
            <Typography key={String(key)} variant="study" mb={1}>
              {value}
            </Typography>
          );
        }
        return null;
      })}
      {attachArray.length ? (
        <MediaList
          key={data[mediaId]}
          attach={attachArray.map((v) => data[v])}
          defaultIndex={defaultIndex}
        />
      ) : null}
    </>
  );
}
