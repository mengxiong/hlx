import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import { useState } from 'react';
import { DialogBasic } from 'src/component/DialogBasic';
import { useSubmit } from './useSubmit';

export interface ComponentStepFooterProps {
  index: number;
  length: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  isCorrect?: () => boolean;
  onError?: () => void;
  confirmText?: string;
  tips?: React.ReactNode;
  tipsMode?: number; // 错误 1 ; 正确 2; 错误正确都提示 3;
}

const enum TipsMode {
  Wrong = 1,
  Right = 2,
}

const isRight = () => true;

export function ComponentStepFooter({
  index,
  length,
  setIndex,
  isCorrect = isRight,
  onError,
  tips,
  tipsMode = 0,
  confirmText = '提交',
}: ComponentStepFooterProps) {
  const [open, setOpen] = useState(false);
  const { submit, isLoading } = useSubmit();

  const next = () => setIndex((value) => value + 1);

  const previous = () => setIndex((value) => value - 1);

  const isFirst = () => index === 0;

  const isLast = () => index === length - 1;

  const handleNext = () => {
    if (isCorrect()) {
      if (!isLast()) {
        if (tipsMode & TipsMode.Right) {
          setOpen(true);
        }
        next();
      } else {
        submit();
      }
    } else {
      onError?.();
      if (tipsMode & TipsMode.Wrong) {
        setOpen(true);
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
      {tips && (
        <DialogBasic
          title="提示"
          open={open}
          cancelButtonText="我知道了"
          onClose={() => {
            setOpen(false);
          }}
        >
          {tips}
        </DialogBasic>
      )}
    </>
  );
}
