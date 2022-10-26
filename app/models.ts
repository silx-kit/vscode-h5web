export interface Message<T = unknown> {
  type: string;
  data: T;
}

export interface FileInfo {
  uri: string;
  name: string;
  size: number;
}
