import {
  DialogProps,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface DialogBasicProps extends DialogProps {
  title: string;
  onConfirm?: () => void;
  onClose: () => void;
  children: React.ReactNode;
  cancelButtonText?: string;
  confirmButtonText?: string;
}

export function DialogBasic({
  title,
  open,
  children,
  onClose,
  onConfirm,
  cancelButtonText = '取消',
  confirmButtonText = '确定',
}: DialogBasicProps) {
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button variant={onConfirm ? 'outlined' : 'contained'} onClick={onClose}>
          {cancelButtonText}
        </Button>
        {onConfirm && (
          <Button variant="contained" onClick={onConfirm}>
            {confirmButtonText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
