import { useTheme, useMediaQuery, Slide } from '@mui/material';
import { Modal, ModalProps } from 'src/component/DialogBasic';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';

export interface DialogFullscreenProps {}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function DialogFullscreen(props: ModalProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return <Modal TransitionComponent={Transition} fullScreen={fullScreen} {...props}></Modal>;
}
