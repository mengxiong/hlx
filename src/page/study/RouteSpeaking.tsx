import { Attach, SpeakingInfo } from 'src/api/study';
import { AudioRecorder } from 'src/component/AudioRecorder';
import { PickByValue } from 'utility-types';
import { Container } from './Container';
import { Subject } from './Subject';
import { useStudy } from './useStudy';

interface SpeakingProps {
  data: SpeakingInfo[];
  title: string;
  baseKey: keyof PickByValue<Required<SpeakingInfo>, string | Attach>;
}

export function Speaking({ data, title, baseKey }: SpeakingProps) {
  const { current, ...restProps } = useStudy({
    data,
  });

  return (
    <Container title={title} {...restProps}>
      <Subject id={current.id} data={current[baseKey]} />
      <AudioRecorder key={current.id} url={current.audioAttach?.attachUrl} />
    </Container>
  );
}
