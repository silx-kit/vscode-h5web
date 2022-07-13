import { FileInfo, Message } from './models';

export function isFileInfoMessage(
  message: Message
): message is Message<FileInfo> {
  return message.type === 'FileInfo';
}
