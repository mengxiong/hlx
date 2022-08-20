import { Paper, Container, Stack, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Header } from 'src/component/Header';
import { Modal } from 'src/component/DialogBasic';

export interface StudyContainerProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
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

export function StudyContainer({
  title,
  tips,
  isLoading = false,
  isWrong = false,
  onRight,
  onCancel,
  onConfirm,
  cancelText = '上一步',
  confirmText = '确定',
  children,
  footer,
}: StudyContainerProps) {
  return (
    <Paper sx={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <Header primary title={title}></Header>
      <Container maxWidth="lg" sx={{ flex: 1, overflow: 'audo', py: 4 }}>
        {children}
      </Container>
      <Stack
        p={2}
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        <>
          {footer}
          <LoadingButton loading={isLoading} size="large" variant="contained" onClick={onConfirm}>
            {confirmText}
          </LoadingButton>
          {onCancel && (
            <Button size="large" variant="outlined" onClick={onCancel}>
              {cancelText}
            </Button>
          )}
        </>
      </Stack>
      {tips && (
        <Modal
          title="提示"
          cancelButtonText="知道了"
          open={isWrong}
          onClose={onRight || voidFunction}
        >
          {tips}
        </Modal>
      )}
    </Paper>
  );
}
