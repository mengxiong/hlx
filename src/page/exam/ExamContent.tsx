import { Box, Container, Stack, TextField, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { useEffect, useRef, useState } from 'react';
import { commitExam, ExamDetailData, ExamType } from 'src/api/exam';
import { Cloze } from 'src/component/Cloze';
import { RadioGroups } from 'src/component/RadioGroup';
import { getTimeFormat, isSameSentence } from 'src/util';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { DialogFullscreen } from 'src/component/DialogFullscreen';
import img from 'src/assets/image/exam-success.png';
import { MediaList } from '../study/MediaList';
import { useStep } from '../study/useStep';

export interface ExamCcontentProps {
  data: ExamDetailData[];
}

export function ExamContent({ data }: ExamCcontentProps) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [open, setOpen] = useState(false);

  const { current, next, isLast } = useStep({ data });

  const [errorCount, setErrorCount] = useState(0);

  const [value, setValue] = useState('');

  const isCloze = current.type === ExamType.Write && current.title.includes('#');

  const isSelection = current.type === ExamType.Select;

  const getContent = () => {
    if (isCloze) {
      return (
        <Cloze
          content={current.title}
          value={value.split('|')}
          onChange={(arr) => setValue(arr.join('|'))}
        />
      );
    }
    if (isSelection) {
      const options = (current.options || []).map((v) => ({ label: v.content, value: v.label }));
      return <RadioGroups value={value} onChange={setValue} options={options}></RadioGroups>;
    }

    return (
      <TextField
        placeholder="输入答案"
        fullWidth
        multiline
        value={value}
        onChange={(evt) => setValue(evt.target.value)}
        variant="standard"
      />
    );
  };

  const validate = () => {
    if (isCloze) {
      return (value.match(/[^|\s]+/g) || []).length === (current.title.match(/#/g) || []).length;
    }
    return value.trim() !== '';
  };

  const checkAnswer = () => {
    if (isCloze) {
      return value.replace(/\s+\|\s+/g, '|').toLowerCase() === current.answer.toLowerCase();
    }
    if (isSelection) {
      return value === current.answer;
    }
    return isSameSentence(value, current.answer);
  };

  const startTime = useRef(0);
  const durationTime = useRef(0);

  useEffect(() => {
    startTime.current = Date.now();
  }, []);

  const { mutate, isLoading } = useMutation(commitExam, {
    onSuccess() {
      setOpen(true);
    },
  });

  const handleConfirm = () => {
    if (validate()) {
      if (!checkAnswer()) {
        setErrorCount((prev) => prev + 1);
      }
      if (!isLast) {
        next();
        setValue('');
      } else {
        const endTime = Date.now();
        const duration = ((endTime - startTime.current) / 1000) | 0;
        durationTime.current = duration;
        const params = {
          startTime: dayjs(startTime.current).format('YYYY-MM-DD HH:mm:ss'),
          endTime: dayjs(endTime).format('YYYY-MM-DD HH:mm:ss'),
          examTime: duration, // s
          examId: id!,
          examNoNum: errorCount,
          examYesNum: data.length - errorCount,
        };
        mutate(params);
      }
    } else {
      enqueueSnackbar('答案不能为空', { variant: 'warning', autoHideDuration: 2000 });
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', height: '100%', pt: 2 }}>
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {current.attach && <MediaList key={current.id} attach={current.attach} />}
        {!isCloze && (
          <Typography variant="study" mb={1}>
            {current.title}
          </Typography>
        )}
        {getContent()}
      </Box>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
        <LoadingButton loading={isLoading} variant="contained" onClick={handleConfirm}>
          {isLast ? '提交' : '下一题'}
        </LoadingButton>
      </Box>
      {open && (
        <DialogFullscreen
          title="评测完成"
          cancelButtonText="确定"
          open={open}
          onClose={handleClose}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img style={{ width: '70%' }} src={img} alt="" />
            <Stack direction="row" spacing={2}>
              <span>正确：{data.length - errorCount}题</span>
              <Box component="span" color="error.main">
                错误：{errorCount}题
              </Box>
              <span>用时：{getTimeFormat(durationTime.current)}</span>
            </Stack>
          </Box>
        </DialogFullscreen>
      )}
    </Container>
  );
}
