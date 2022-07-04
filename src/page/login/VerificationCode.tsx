import { LoadingButton } from '@mui/lab';
import { Box, TextField, InputAdornment, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { LoginByCodeParams, sendSms } from 'src/api/auth';
import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';

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

export function VerificationCode({ onSuccess }: { onSuccess: VoidFunction }) {
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
