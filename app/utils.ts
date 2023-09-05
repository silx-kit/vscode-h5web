import type { GetExportURL } from '@h5web/app';
import { MessageType } from '../src/models.js';
import { vscode } from './vscode-api.js';

// 2 GB = 2 * 1024 * 1024 * 1024 B
export const MAX_SIZE_IN_BYTES = 2147483648;

export const getExportURL: GetExportURL = (format, dataset, __, value) => {
  if (format === 'json') {
    return async () => {
      vscode.postMessage({
        type: MessageType.Export,
        data: {
          format,
          name: dataset.name,
          payload: JSON.stringify(value, null, 2),
        },
      });
      return new Blob(); // doesn't matter as long as it's not falsy
    };
  }

  return undefined;
};
