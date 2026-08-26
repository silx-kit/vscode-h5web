import { App } from '@h5web/app';
import { H5WasmBufferProvider } from '@h5web/h5wasm';
import { suspend } from 'suspend-react';

import { type FileInfo } from '../extension/models.js';
import { getExportURL, getPlugin } from './utils';

interface Props {
  fileInfo: FileInfo;
}

function Viewer(props: Props) {
  const { fileInfo } = props;

  const buffer = suspend(async () => {
    // Ask for the file as a range, so that VS Code's webview service worker
    // does not keep a copy of it. It caches a plain GET in full and forever,
    // but serves a range request `no-store` - https://github.com/microsoft/vscode/blob/main/src/vs/workbench/contrib/webview/browser/pre/service-worker.js
    const res = await fetch(fileInfo.uri, { headers: { Range: 'bytes=0-' } });
    return res.arrayBuffer();
  }, [fileInfo]);

  return (
    <H5WasmBufferProvider
      filename={fileInfo.name}
      buffer={buffer}
      getExportURL={getExportURL}
      getPlugin={getPlugin}
    >
      <App />
    </H5WasmBufferProvider>
  );
}

export default Viewer;
