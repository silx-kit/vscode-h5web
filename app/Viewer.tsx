import { App } from '@h5web/app';
import { H5WasmProvider } from '@h5web/h5wasm';
import { suspend } from 'suspend-react';
import { getExportURL } from './utils';
import { type FileInfo } from '../src/models.js';

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
    <H5WasmProvider
      filename={fileInfo.name}
      buffer={buffer}
      getExportURL={getExportURL}
    >
      <App />
    </H5WasmProvider>
  );
}

export default Viewer;
