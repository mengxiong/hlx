import { useState } from 'react';
import { useStep, UseStepParams } from './useStep';
import { useSubmit } from './useSubmit';

interface UseStudyParams<T> extends UseStepParams<T> {
  isCorrect?: (item: T) => boolean;
  needRestart?: boolean;
}

export function useStudy<T = unknown>({
  data,
  reset,
  needRestart = true,
  isCorrect = () => true,
}: UseStudyParams<T>) {
  const [isWrong, setWrong] = useState(false);
  const [isRestart, setRestart] = useState(false);
  const [wrongList, setWrongList] = useState<T[]>([]);

  const { current, isFirst, isLast, previous, next, setIndex } = useStep({
    data: isRestart ? wrongList : data,
    reset,
  });

  const { submit, isLoading } = useSubmit();

  const onConfirm = () => {
    if (isCorrect(current)) {
      if (!isLast) {
        next();
      } else if (wrongList.length) {
        setRestart(true);
        setIndex(0);
      } else {
        submit();
      }
    } else {
      reset?.(current);
      setWrong(true);
      if (needRestart && !wrongList.includes(current)) {
        setWrongList([...wrongList, current]);
      }
    }
  };

  const onCancel = !isFirst ? previous : undefined;

  const onRight = () => setWrong(false);

  return { current, isLoading, onConfirm, onCancel, isWrong, onRight };
}
