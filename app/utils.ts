import { FileInfo, Message } from './models';

// 2 GB = 2 * 1024 * 1024 * 1024 B
export const MAX_SIZE_IN_BYTES = 2147483648;

export function isFileInfoMessage(
  message: Message
): message is Message<FileInfo> {
  return message.type === 'FileInfo';
}
