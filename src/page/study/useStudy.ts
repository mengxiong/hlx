import { useState } from 'react';
import { useStep, UseStepParams } from './useStep';
import { useSubmit } from './useSubmit';

interface UseStudyParams<T> extends UseStepParams<T> {
  isCorrect?: (item: T) => boolean;
}

export function useStudy<T = unknown>({ data, reset, isCorrect = () => true }: UseStudyParams<T>) {
  const [isWrong, setIsWrong] = useState(false);
  const [useWrongList, setUseWrongList] = useState(false);
  const [wrongList, setWrongList] = useState<T[]>([]);

  const { current, isFirst, isLast, previous, next, setIndex } = useStep({
    data: useWrongList ? wrongList : data,
    reset,
  });

  const { submit, isLoading } = useSubmit();

  const onConfirm = () => {
    if (isCorrect(current)) {
      if (!isLast) {
        next();
      } else if (wrongList.length) {
        setUseWrongList(true);
        setIndex(0);
      } else {
        submit();
      }
    } else {
      reset?.(current);
      setIsWrong(true);
      if (!wrongList.includes(current)) {
        setWrongList([...wrongList, current]);
      }
    }
  };

  const onCancel = !isFirst ? previous : undefined;

  const onRight = () => setIsWrong(false);

  return { current, isLoading, onConfirm, onCancel, isWrong, onRight };
}
