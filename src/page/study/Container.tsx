import { Typography, Paper, Stack, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Header } from 'src/component/Header';
import { DialogBasic } from 'src/component/DialogBasic';

export interface StudyContainerProps {
  title: string;
  children: React.ReactNode;
  tips?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  isWrong?: boolean;
  onRight?: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
}

const voidFunction = () => {};

export function Container({
  title,
  tips,
  isLoading = false,
  isWrong = false,
  onRight,
  onCancel,
  onConfirm,
  cancelText = '上一步',
  confirmText = '提交',
  children,
}: StudyContainerProps) {
  return (
    <Paper sx={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <Header primary title={title}></Header>
      <Typography variant="study" sx={{ whiteSpace: 'pre-wrap', flex: 1, overflow: 'auto', p: 4 }}>
        {children}
      </Typography>
      <Stack p={2} spacing={2} direction="row" justifyContent="center" alignItems="center">
        <>
          {onCancel && (
            <Button size="large" variant="outlined" onClick={onCancel}>
              {cancelText}
            </Button>
          )}
          <LoadingButton
            loading={isLoading}
            loadingIndicator="提交中..."
            size="large"
            variant="contained"
            onClick={onConfirm}
          >
            {confirmText}
          </LoadingButton>
        </>
      </Stack>
      {tips && (
        <DialogBasic
          title="提示"
          cancelButtonText="知道了"
          open={isWrong}
          onClose={onRight || voidFunction}
        >
          {tips}
        </DialogBasic>
      )}
    </Paper>
  );
}
