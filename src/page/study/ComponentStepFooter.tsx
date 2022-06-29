import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import { useSubmit } from './useSubmit';

export interface ComponentStepFooterProps {
  index: number;
  length: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  isCorrect?: () => boolean;
  confirmText?: string;
}

const isRight = () => true;

export function ComponentStepFooter({
  index,
  length,
  setIndex,
  isCorrect = isRight,
  confirmText = '提交',
}: ComponentStepFooterProps) {
  const { submit, isLoading } = useSubmit();

  const next = () => setIndex((value) => value + 1);

  const previous = () => setIndex((value) => value - 1);

  const isFirst = () => index === 0;

  const isLast = () => index === length - 1;

  const handleNext = () => {
    if (isCorrect()) {
      if (!isLast()) {
        next();
      } else {
        submit();
      }
    }
  };

  return (
    <>
      {!isFirst() && (
        <Button size="large" variant="outlined" onClick={previous}>
          上一步
        </Button>
      )}
      <LoadingButton
        loading={isLoading}
        loadingIndicator="提交中..."
        size="large"
        variant="contained"
        onClick={handleNext}
      >
        {confirmText}
      </LoadingButton>
    </>
  );
}
