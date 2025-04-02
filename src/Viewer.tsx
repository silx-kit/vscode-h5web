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
    const res = await fetch(fileInfo.uri);
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
