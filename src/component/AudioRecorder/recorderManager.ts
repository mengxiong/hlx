import Recorder from 'js-audio-recorder';

export const recorder = new Recorder({
  sampleBits: 16,
  sampleRate: 16000,
  numChannels: 1,
  compiling: false,
});
