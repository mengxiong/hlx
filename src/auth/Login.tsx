import { LoadingButton } from '@mui/lab';
import { Box, Container, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginParams } from 'src/api/auth';
import { useAuth } from './AuthContext';

export function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginParams>({
    defaultValues: {
      username: '13607148408',
      pass: '123456',
    },
  });

  const loginMutation = useMutation(auth.signin, {
    onSuccess() {
      const from = (location.state as any)?.from || '/';
      navigate(from, { replace: true });
    },
  });

  const onFinish = (values: LoginParams) => {
    loginMutation.mutate(values);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Container noValidate onSubmit={handleSubmit(onFinish)} component="form" maxWidth="xs">
        <TextField
          margin="normal"
          required
          fullWidth
          label="账号"
          autoComplete="tel"
          autoFocus
          helperText={errors.username && '账号不能为空'}
          error={!!errors.username}
          {...register('username', { required: true })}
        ></TextField>
        <TextField
          margin="normal"
          required
          fullWidth
          label="密码"
          type="password"
          autoComplete="current-password"
          error={!!errors.pass}
          helperText={errors.pass && '密码不能为空'}
          {...register('pass', { required: true })}
        ></TextField>
        <LoadingButton
          sx={{ mt: 2 }}
          variant="contained"
          fullWidth
          type="submit"
          loadingPosition="start"
          startIcon={<SaveIcon />}
          loading={loginMutation.isLoading}
        >
          登录
        </LoadingButton>
      </Container>
    </Box>
  );
}
