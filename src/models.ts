import { ExportFormat } from '@h5web/app';
import { Plugin } from '@h5web/h5wasm';

export type Message =
  | { type: MessageType.Ready }
  | { type: MessageType.FileInfo; data: FileInfo }
  | { type: MessageType.Export; data: Export };

export enum MessageType {
  Ready = 'Ready',
  FileInfo = 'FileInfo',
  Export = 'Export',
}

export interface FileInfo {
  uri: string;
  name: string;
  size: number;
  supportedPlugins: Record<Plugin, string>;
}

export interface Export {
  format: ExportFormat;
  name: string;
  payload: string;
}
