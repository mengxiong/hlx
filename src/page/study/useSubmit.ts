import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { recordStudy, StudyParams } from 'src/api/study';
import { TextBookUnitStep } from 'src/api/textbook';
import { getStudyPath } from 'src/Routes';

export function useSubmit() {
  const { textbookId, unitId, stepId, stepValue } = useParams() as StudyParams<any>;
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const startTime = useRef(0);

  useEffect(() => {
    startTime.current = Date.now();
  }, []);

  const { mutate, isLoading } = useMutation(recordStudy, {
    onSuccess() {
      const stepList = queryClient.getQueryData<TextBookUnitStep[]>([
        'steplist',
        textbookId,
        unitId,
      ]);
      if (stepList) {
        const index = stepList.findIndex((item) => item.stepNum === stepId);
        if (index !== stepList.length - 1) {
          const next = stepList[index + 1];
          navigate(getStudyPath(textbookId, unitId, next.stepNum, next.stepValue));
        }
      }
    },
  });

  const submit = () => {
    const end = Date.now();
    const studyTime = Math.round((end - startTime.current) / 1000);
    mutate({
      textbookId,
      unitId,
      stepNum: stepId,
      stepValue,
      studyTime,
      startTime: dayjs(startTime.current).format('YYYY-MM-DD HH:mm:ss'),
      endTime: dayjs(end).format('YYYY-MM-DD HH:mm:ss'),
    });
  };

  return { submit, isLoading };
}
