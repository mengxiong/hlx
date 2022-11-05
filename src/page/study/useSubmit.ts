import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { recordStudy, StudyParams } from 'src/api/study';
import { generateStudyPath } from 'src/Routes';
import { useSteps } from '../textbook/Unit';

export function useSubmit() {
  const { textbookId, unitId, stepId, stepValue } = useParams() as StudyParams<any>;

  const steps = useSteps();
  // const step = steps.find((v) => String(v.stepNum) === stepId);

  const navigate = useNavigate();
  const location = useLocation();

  const startTime = useRef(0);

  useEffect(() => {
    startTime.current = Date.now();
  }, []);

  const { mutate, isLoading } = useMutation(recordStudy, {
    async onSuccess() {
      try {
        const index = steps.findIndex((item) => item.stepNum === stepId);
        if (index !== steps.length - 1) {
          const next = steps[index + 1];
          const nextPath = location.pathname.replace(
            generateStudyPath({ stepId, stepValue }),
            generateStudyPath({ stepId: next.stepNum, stepValue: next.stepValue })
          );
          navigate(nextPath, {
            replace: true,
          });
        } else {
          navigate(-1);
        }
      } catch (error) {
        navigate(-1);
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
