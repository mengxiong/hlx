import { Paper, Container, Stack, Button, ButtonProps } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Header } from 'src/component/Header';
import { DialogFullscreen } from 'src/component/DialogFullscreen';
import { useLocation } from 'react-router-dom';
import { isObject } from 'src/util';

export interface StudyContainerProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  tips?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  isWrong?: boolean;
  confirmProps?: ButtonProps;
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
  confirmProps,
  cancelText = '上一步',
  confirmText = '确定',
  children,
  footer,
}: StudyContainerProps) {
  const location = useLocation();

  const headerTitle = isObject(location.state) ? location.state.title : title;

  return (
    <Paper sx={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <Header primary title={headerTitle}></Header>
      <Container maxWidth="lg" sx={{ flex: 1, overflow: 'auto', py: 4 }}>
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
          <LoadingButton
            loading={isLoading}
            size="large"
            variant="contained"
            onClick={onConfirm}
            {...confirmProps}
          >
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
        <DialogFullscreen
          title="提示"
          cancelButtonText="知道了"
          open={isWrong}
          onClose={onRight || voidFunction}
        >
          {tips}
        </DialogFullscreen>
      )}
    </Paper>
  );
}
