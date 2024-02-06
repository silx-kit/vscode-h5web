import type { GetExportURL } from '@h5web/app';
import { MessageType } from '../src/models.js';
import { vscode } from './vscode-api.js';

// 2 GB = 2 * 1024 * 1024 * 1024 B
export const MAX_SIZE_IN_BYTES = 2147483648;

export const getExportURL: GetExportURL = (
  format,
  dataset,
  selection,
  value
) => {
  function doExport(payload: string): Blob {
    // Send payload to `H5WebViewer` editor provider
    vscode.postMessage({
      type: MessageType.Export,
      data: { format, name: dataset.name, payload },
    });

    return new Blob(); // doesn't matter as long as it's not falsy
  }

  if (format === 'json') {
    return async () => doExport(JSON.stringify(value, null, 2));
  }

  if (format === 'csv') {
    return async () => {
      // Find dimensions of dataset/slice to export
      // Note that there is currently no way to know if the dataset/slice is transposed - https://github.com/silx-kit/h5web/issues/1454
      const dims = selection
        ? dataset.shape.filter((_, index) => selection[index * 2] === ':')
        : dataset.shape;

      if (dims.length < 1 || dims.length > 2) {
        throw new Error(
          'Expected dataset/slice to export to have 1 or 2 dimensions'
        );
      }

      let csv = '';
      const [rows, cols = 1] = dims; // export 1D dataset/slice as column (i.e. 1 value per line)

      for (let i = 0; i < rows; i += 1) {
        for (let j = 0; j < cols; j += 1) {
          csv += `${value[i * cols + j].toString()}${j < cols - 1 ? ',' : ''}`;
        }

        csv += i < rows - 1 ? '\n' : '';
      }

      return doExport(csv);
    };
  }

  return undefined;
};

export async function getPlugin(
  url: string | undefined
): Promise<ArrayBuffer | undefined> {
  if (!url) {
    return undefined;
  }

  const response = await fetch(url);
  return response.arrayBuffer();
}
