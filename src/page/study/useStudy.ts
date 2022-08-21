import { useState } from 'react';
import { useStep, UseStepParams } from './useStep';
import { useSubmit } from './useSubmit';

interface UseStudyParams<T> extends UseStepParams<T> {
  isCorrect?: (item: T) => boolean | Promise<boolean>;
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

  const { current, isLast, next, setIndex } = useStep({
    data: isRestart ? wrongList : data,
    reset,
  });

  const { submit, isLoading } = useSubmit();

  const onConfirm = async () => {
    const result = await isCorrect(current);
    if (result) {
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

  // 不显示上一步
  // const onCancel = !isFirst ? previous : undefined;

  const onRight = () => setWrong(false);

  return { current, isLoading, onConfirm, isWrong, onRight };
}
