import { Attach, SpeakingInfo } from 'src/api/study';
import { AudioRecorder } from 'src/component/AudioRecorder';
import { PickByValue } from 'utility-types';
import { StudyContainer } from './Container';
import { Subject } from './Subject';
import { useStudy } from './useStudy';

type BaseKey = keyof PickByValue<Required<SpeakingInfo>, string | Attach>;

interface SpeakingProps {
  data: SpeakingInfo[];
  title: string;
  baseKey: BaseKey | BaseKey[];
}

export function Speaking({ data, title, baseKey }: SpeakingProps) {
  const { current, ...restProps } = useStudy({
    data,
  });
  const baseKeys = Array.isArray(baseKey) ? baseKey : [baseKey];

  return (
    <StudyContainer
      footer={<AudioRecorder key={current.id} url={current.audioAttach?.attachUrl} />}
      confirmText="读的不错"
      title={title}
      {...restProps}
    >
      {baseKeys.map((key) => (
        <Subject key={key} id={current.id} data={current[key]} />
      ))}
    </StudyContainer>
  );
}
