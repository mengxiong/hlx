import EventEmitter from 'eventemitter3';

export class RecorderManager extends EventEmitter {
  private static instance: RecorderManager;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new RecorderManager();
    }
    return this.instance;
  }

  private mediaRecorder: MediaRecorder | null = null;

  private chunks: Blob[] = [];

  private onStateChange = () => {
    this.emit('statechange', this.mediaRecorder?.state);
  };

  public start() {
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      return Promise.reject(new Error('not supported'));
    }
    return navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.mediaRecorder = new MediaRecorder(stream);

      this.chunks = [];

      this.mediaRecorder.addEventListener('dataavailable', (event) => {
        this.chunks.push(event.data);
      });

      this.mediaRecorder.addEventListener('start', this.onStateChange);
      this.mediaRecorder.addEventListener('pause', this.onStateChange);
      this.mediaRecorder.addEventListener('stop', this.onStateChange);
      this.mediaRecorder.addEventListener('resume', this.onStateChange);

      this.mediaRecorder.start();

      return this.mediaRecorder;
    });
  }

  public stop() {
    if (!this.mediaRecorder) return Promise.reject();
    return new Promise<Blob>((resolve) => {
      const { mimeType } = this.mediaRecorder!;
      this.mediaRecorder!.addEventListener('stop', () => {
        const blob = new Blob(this.chunks, { type: mimeType });
        resolve(blob);
      });
      this.cancel();
    });
  }

  public cancel() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.mediaRecorder = null;
    }
  }

  public resume() {
    this.mediaRecorder?.resume();
  }

  public pause() {
    this.mediaRecorder?.pause();
  }
}
