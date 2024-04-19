import { App } from '@h5web/app';
import { H5WasmProvider } from '@h5web/h5wasm';
import { suspend } from 'suspend-react';
import { getExportURL, getPlugin } from './utils';
import { type FileInfo } from '../src/models.js';

// 2 GB = 2 * 1024 * 1024 * 1024 B
const MAX_SIZE_IN_BYTES = 2147483648;

interface Props {
  fileInfo: FileInfo;
}

function Viewer(props: Props) {
  const { fileInfo } = props;

  if (fileInfo.size === 0) {
    // e.g. when comparing git changes on an untracked file - https://github.com/silx-kit/vscode-h5web/issues/22
    return <p>File does not exist</p>;
  }

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
    <H5WasmProvider
      filename={fileInfo.name}
      buffer={buffer}
      getExportURL={getExportURL}
      getPlugin={getPlugin}
    >
      <App />
    </H5WasmProvider>
  );
}

export default Viewer;
