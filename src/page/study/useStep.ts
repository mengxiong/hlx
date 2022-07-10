import { useState } from 'react';

export function useStep<T>(data: T[], cb?: (value: T) => void) {
  const [index, setIndex] = useState(0);

  const current = data[index];

  const next = () => {
    const nextIndex = index + 1;
    setIndex(nextIndex);
    cb?.(data[nextIndex]);
  };

  const previous = () => {
    const nextIndex = index - 1;
    setIndex(nextIndex);
    cb?.(data[nextIndex]);
  };

  const isFirst = index === 0;

  const isLast = index === data.length - 1;

  return { current, next, previous, isFirst, isLast, index };
}
