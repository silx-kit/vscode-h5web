import {
  assertNonNull,
  type BuiltInExporter,
  type Dataset,
  type ExportFormat,
  type ExportURL,
} from '@h5web/app';
import { type Plugin } from '@h5web/h5wasm';

import { MessageType } from '../extension/models.js';
import { vscode } from './vscode-api.js';

const pluginsScriptElem = document.getElementById('plugins');
assertNonNull(pluginsScriptElem);

const PLUGINS = JSON.parse(pluginsScriptElem.innerHTML) as Record<
  Plugin,
  string
>;

export async function getPlugin(
  name: Plugin,
): Promise<ArrayBuffer | undefined> {
  const url = PLUGINS[name];

  if (!url) {
    return undefined;
  }

  const response = await fetch(url);
  return response.arrayBuffer();
}

export function getExportURL(
  format: ExportFormat,
  dataset: Dataset,
  _selection?: string,
  builtInExporter?: BuiltInExporter,
): ExportURL | undefined {
  if (!builtInExporter) {
    return undefined;
  }

  return async () => {
    const payload = builtInExporter();

    // Send payload to `H5WebViewer` editor provider
    vscode.postMessage({
      type: MessageType.Export,
      data: { format, name: dataset.name, payload },
    });

    return new Blob(); // doesn't matter as long as it's not falsy
  };
}
