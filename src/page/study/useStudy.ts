import { useStep, UseStepParams } from './useStep';
import { useSubmit } from './useSubmit';

interface UseStudyParams<T> extends UseStepParams<T> {
  isCorrect?: (item: T) => boolean;
}

export function useStudy<T = unknown>({ data, reset, isCorrect = () => true }: UseStudyParams<T>) {
  const { current, isFirst, isLast, previous, next } = useStep({ data, reset });

  const { submit, isLoading } = useSubmit();

  const onConfirm = () => {
    if (isCorrect(current)) {
      if (!isLast) {
        next();
      } else {
        submit();
      }
    }
  };

  const onCancel = !isFirst ? previous : undefined;

  return { isLoading, onConfirm, onCancel, current };
}
