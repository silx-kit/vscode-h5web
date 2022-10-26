import { App } from '@h5web/app';
import { H5WasmProvider } from '@h5web/h5wasm';
import { FileInfo } from './models';
import { suspend } from 'suspend-react';
import { MAX_SIZE_IN_BYTES } from './utils';

interface Props {
  fileInfo: FileInfo;
}

function Viewer(props: Props) {
  const { fileInfo } = props;

  if (fileInfo.size >= MAX_SIZE_IN_BYTES) {
    throw new Error(
      'Cannot open: the file is bigger than the maximum supported size (2 GB)'
    );
  }

  const buffer = suspend(async () => {
    const res = await fetch(fileInfo.uri);
    return res.arrayBuffer();
  }, [fileInfo]);

  return (
    <H5WasmProvider filename={fileInfo.name} buffer={buffer}>
      <App />
    </H5WasmProvider>
  );
}

export default Viewer;
