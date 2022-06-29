import EventEmitter from 'eventemitter3';

type EventMap = Record<string, any>;

type EventKey<T extends EventMap> = string & keyof T;
type EventCallback<T> = (params: T) => void;

interface Emitter<T extends EventMap> {
  on<K extends EventKey<T>>(eventName: K, fn: EventCallback<T[K]>): void;
  off<K extends EventKey<T>>(eventName: K, fn: EventCallback<T[K]>): void;
  emit<K extends EventKey<T>>(eventName: K, ...params: T[K] extends void ? [] : [T[K]]): void;
}

function createEmitter<T extends EventMap>(): Emitter<T> {
  return new EventEmitter();
}

// key 是事件名, value 是回调参数类型
// eventBus.on('auth', (value: AuthInfo | null) => {})
export const eventBus = createEmitter<{
  // auth: AuthInfo | null;
}>();
