import { useState } from 'react';

export interface UseStepParams<T> {
  data: T[];
  reset?: (value: T) => void;
}

export function useStep<T>({ data, reset }: UseStepParams<T>) {
  const [index, setIndex] = useState(0);

  const current = data[index];

  const next = () => {
    const nextIndex = index + 1;
    setIndex(nextIndex);
    reset?.(data[nextIndex]);
  };

  const previous = () => {
    const nextIndex = index - 1;
    setIndex(nextIndex);
    reset?.(data[nextIndex]);
  };

  const isFirst = index === 0;

  const isLast = index === data.length - 1;

  return { current, next, previous, isFirst, isLast, index };
}
