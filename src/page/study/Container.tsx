import { Typography, Paper, Stack, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Header } from 'src/component/Header';
// import { DialogBasic } from 'src/component/DialogBasic';

export interface StudyContainerProps {
  title: string;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
  // tips?: React.ReactNode;
  // tipsMode?: number; // 错误 1 ; 正确 2; 错误正确都提示 3;
}

// const enum TipsMode {
//   Wrong = 1,
//   Right = 2,
// }

export function Container({
  title,
  isLoading = false,
  onCancel,
  onConfirm,
  cancelText = '上一步',
  confirmText = '提交',
  // tips,
  // tipsMode = 0,
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
      {/* {tips && (
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
      )} */}
    </Paper>
  );
}
