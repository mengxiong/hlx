import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getStudyInfo, StepValue, StudyParams } from 'src/api/study';
import { WriteWord } from './RouteWriteWord';
import { Reading } from './RouteReading';
import { Sorting } from './RouteSorting';
import { Selection } from './RouteSelection';
import { WriteSentence } from './RouteWriteSentence';
import { WriteFullText } from './RouteWriteFullText';
import { Speaking } from './RouteSpeaking';

const map: {
  [key in StepValue]: JSX.Element;
} = {
  [StepValue.Reading]: <Reading title="看和听" data={[]} />,
  [StepValue.WriteWord]: <WriteWord title="填空" data={[]} />,
  [StepValue.WriteSentenceByAudio]: (
    <WriteSentence title="句子听写" data={[]} baseKey="audioAttach" />
  ),
  [StepValue.WriteSentenceByTranslation]: (
    <WriteSentence title="据译写文" data={[]} baseKey="translation" />
  ),
  [StepValue.WriteFullText]: <WriteFullText title="默写" data={[]} />,

  [StepValue.SortSentence]: <Sorting title="排句成篇" data={[]} vertical />,
  [StepValue.SortTranslation]: <Sorting title="译文排序" data={[]} vertical baseKey="attach" />,
  [StepValue.SortSentenceByAudio]: (
    <Sorting title="据音排句" data={[]} vertical baseKey="audioAttach" />
  ),
  [StepValue.SortWordByAudio]: <Sorting title="据音排词" data={[]} baseKey="audioAttach" />,
  [StepValue.SortWordByTranslation]: <Sorting title="据译排词" data={[]} baseKey="translation" />,

  [StepValue.Selection]: <Selection title="常规选择" data={[]} baseKey="content" />,
  [StepValue.SelectionByAudio]: <Selection title="据音选文" data={[]} baseKey="audioAttach" />,
  [StepValue.SelectionByContent]: <Selection title="据文选择" data={[]} baseKey="content" />,
  [StepValue.SelectionImageByAudio]: <Selection title="据音选图" data={[]} baseKey="audioAttach" />,

  [StepValue.SpeakingByTranslation]: <Speaking title="据译说文" data={[]} baseKey="translation" />,
  [StepValue.SpeakingByImage]: <Speaking title="说图" data={[]} baseKey="imageAttach" />,
  [StepValue.SpeakingByContent]: <Speaking title="读句子" data={[]} baseKey="content" />,
};

export function Study<T extends StepValue>() {
  const { textbookId, unitId, stepId, stepValue } = useParams() as StudyParams<T>;

  const { isLoading, isError, error, data } = useQuery(
    ['study', textbookId, unitId, stepId, stepValue],
    () => getStudyInfo({ textbookId, unitId, stepId, stepValue })
  );

  if (isLoading) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (isError) {
    return <span>{(error as Error).message}</span>;
  }

  return map[stepValue] ? (
    React.cloneElement(map[stepValue], { data: data! })
  ) : (
    <span>暂不支持</span>
  );
}
