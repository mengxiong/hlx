import {
  Paper,
  Container,
  Stack,
  Button,
  ButtonProps,
  useTheme,
  useMediaQuery,
  Slide,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Header } from 'src/component/Header';
import { Modal } from 'src/component/DialogBasic';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';

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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Paper sx={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <Header primary title={title}></Header>
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
        <Modal
          TransitionComponent={Transition}
          fullScreen={fullScreen}
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
