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

  if (format === 'csv') {
    // Async function that will be called when the user clicks on a `CSV` export menu entry
    return async () => {
      // Generate CSV string from `value` array
      let csv = '';
      let dims = [];

      // Record all dataset dimensions with cardinality greater than one,
      // accounting for subset selection if applicable
      if (selection) {
        let subsets = selection.split(',');
        for (let i = 0; i < subsets.length; i++) {
          // Because of the user interface, all slices will either be
          // the full array length or a single value
          if (subsets[i] === ':' && dataset.shape[i] > 1) {
            dims.push(dataset.shape[i]);
          }
        }
      } else {
        dataset.shape.forEach((val) => {
          if (val > 1) dims.push(val);
        });
      }

      // Only provide special handling for 2D dataset outputs
      if (dims.length == 2) {
        let k = 0;
        for (let i = 0; i < dims[0]; i++) {
          for (let j = 0; j < dims[1] - 1; j++) {
            csv += `${value[k].toString()}, `;
            k++;
          }

          csv += `${value[k].toString()}\n`;
          k++;
        }
      } else {
        value.forEach((val: any) => {
          csv += `${val.toString()}\n`;
        });
      }

      const finalCsv = csv.slice(0, -1);

      vscode.postMessage({
        type: MessageType.Export,
        data: {
          format,
          name: dataset.name,
          payload: finalCsv,
        },
      });

      return new Blob(); // doesn't matter as long as it's not falsy
    };
  }

  return undefined;
};
