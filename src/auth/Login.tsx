import { LoadingButton } from '@mui/lab';
import { Box, Container, TextField, Tabs, Tab, InputAdornment, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginByCodeParams, LoginByPassParams, sendSms } from 'src/api/auth';
import bg from 'src/image/login-bg.png';
import logo from 'src/image/login-logo.png';
import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

function AccountPassword({ onSuccess }: { onSuccess: VoidFunction }) {
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginByPassParams>({
    defaultValues: {
      username: '13607148408',
      pass: '123456',
    },
  });

  const loginMutation = useMutation(auth.signin, {
    onSuccess,
  });

  const onFinish = (values: LoginByPassParams) => {
    loginMutation.mutate(values);
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onFinish)}>
      <TextField
        margin="normal"
        variant="standard"
        required
        fullWidth
        label="账号"
        autoComplete="tel"
        autoFocus
        helperText={errors.username?.message}
        error={!!errors.username}
        {...register('username', { required: '账号不能为空' })}
      ></TextField>
      <TextField
        margin="normal"
        variant="standard"
        required
        fullWidth
        label="密码"
        type="password"
        autoComplete="current-password"
        error={!!errors.pass}
        helperText={errors.pass?.message}
        {...register('pass', { required: '密码不能为空' })}
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
    </Box>
  );
}

function CountDown({ onEnd }: { onEnd: VoidFunction }) {
  const [time, setTime] = useState(60);

  useEffect(() => {
    if (time === 0) {
      onEnd();
    }
  }, [time, onEnd]);

  useEffect(() => {
    const tid = window.setInterval(() => {
      setTime((value) => value - 1);
    }, 1000);
    return () => {
      window.clearInterval(tid);
    };
  }, []);

  return <span>{`${time}秒后可重发`}</span>;
}

function PhoneCode({ onSuccess }: { onSuccess: VoidFunction }) {
  const auth = useAuth();
  const [smsState, setSmsState] = useState(0); // 0 是未发送 1 是已发送 2 是已发送且可以重新发送

  const {
    trigger,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginByCodeParams>({ mode: 'onChange' });

  const loginMutation = useMutation(auth.signin, {
    onSuccess,
  });

  const onFinish = (values: LoginByCodeParams) => {
    loginMutation.mutate(values);
  };

  const onSendSms = async () => {
    const success = await trigger('phone', { shouldFocus: true });
    if (success) {
      await sendSms({ phone: getValues('phone') });
      setSmsState(1);
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onFinish)}>
      <TextField
        margin="normal"
        variant="standard"
        required
        fullWidth
        label="手机号"
        autoComplete="tel"
        autoFocus
        helperText={errors.phone?.message}
        error={!!errors.phone}
        {...register('phone', { required: '请输入手机号' })}
      ></TextField>
      <TextField
        margin="normal"
        variant="standard"
        required
        fullWidth
        label="验证码"
        autoComplete="off"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button disabled={smsState === 1} onClick={onSendSms} size="medium" variant="text">
                {smsState === 1 ? (
                  <CountDown onEnd={() => setSmsState(2)} />
                ) : (
                  `${smsState === 2 ? '重新' : ''}获取验证码`
                )}
              </Button>
            </InputAdornment>
          ),
        }}
        error={!!errors.code}
        helperText={errors.code?.message}
        {...register('code', { required: '验证码不能为空' })}
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
    </Box>
  );
}

export function LoginPage() {
  const [tab, setTab] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const onSuccess = () => {
    const from = (location.state as any)?.from || '/';
    navigate(from, { replace: true });
  };

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        height: '100%',
        alignItems: 'flex-start',
        backgroundImage: `url("${bg}")`,
        backgroundSize: 'cover',
        backgroundColor: '#fff',
        [theme.breakpoints.down(444)]: {
          backgroundImage: 'none',
        },
      })}
    >
      <Container
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          py: 4,
          mt: 8,
          backgroundColor: '#fff',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <img style={{ width: '85%' }} src={logo} alt="" />
        </Box>
        <Tabs value={tab} onChange={(evt, newValue) => setTab(newValue)}>
          <Tab label="密码登录" value={0}></Tab>
          <Tab label="手机登录" value={1}></Tab>
        </Tabs>
        {tab === 0 && <AccountPassword onSuccess={onSuccess} />}
        {tab === 1 && <PhoneCode onSuccess={onSuccess} />}
      </Container>
    </Box>
  );
}
