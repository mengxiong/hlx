import { Attach, SpeakingInfo } from 'src/api/study';
import { AudioRecorder } from 'src/component/AudioRecorder';
import { PickByValue } from 'utility-types';
import { Container } from './Container';
import { Subject } from './Subject';
import { useStep } from './useStep';
import { useSubmit } from './useSubmit';

interface SpeakingProps {
  data: SpeakingInfo[];
  title: string;
  baseKey: keyof PickByValue<Required<SpeakingInfo>, string | Attach>;
}

export function Speaking({ data, title, baseKey }: SpeakingProps) {
  const { current, isFirst, isLast, previous, next } = useStep(data);
  const { submit, isLoading } = useSubmit();

  const isCorrect = () => true;

  const handleConfirm = () => {
    if (isCorrect()) {
      if (!isLast) {
        next();
      } else {
        submit();
      }
    }
  };

  return (
    <Container
      title={title}
      isLoading={isLoading}
      onCancel={!isFirst ? previous : undefined}
      onConfirm={handleConfirm}
    >
      <Subject id={current.id} data={current[baseKey]} />
      <AudioRecorder key={current.id} url={current.audioAttach?.attachUrl} />
    </Container>
  );
}
