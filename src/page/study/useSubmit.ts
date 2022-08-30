import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { recordStudy, StudyParams } from 'src/api/study';
import { getTextbookUnitStep } from 'src/api/textbook';
import { generateStudyPath } from 'src/Routes';

export function useSubmit() {
  const { type, textbookId, unitId, stepId, stepValue } = useParams() as StudyParams<any> & {
    type: string;
  };
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const startTime = useRef(0);

  useEffect(() => {
    startTime.current = Date.now();
  }, []);

  const { mutate, isLoading } = useMutation(recordStudy, {
    async onSuccess() {
      try {
        const stepList = await queryClient.fetchQuery(
          ['unit', textbookId, unitId],
          () => getTextbookUnitStep({ textbookId, unitId }),
          {
            staleTime: 15 * 60 * 1000,
          }
        );
        const index = stepList.findIndex((item) => item.stepNum === stepId);
        if (index !== stepList.length - 1) {
          const next = stepList[index + 1];
          navigate(generateStudyPath(type, textbookId, unitId, next.stepNum, next.stepValue), {
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
