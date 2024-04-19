import { Suspense, useEffect, useState } from 'react';
import { useEventListener } from '@react-hookz/web';
import Viewer from './Viewer';
import { ErrorBoundary } from 'react-error-boundary';
import { vscode } from './vscode-api';
import { MessageType, type Message, type FileInfo } from '../src/models';
import { H5WasmLocalFileProvider } from '@h5web/h5wasm';
import StandaloneViewer from './StandaloneViewer';

// 2 GB = 2 * 1024 * 1024 * 1024 B
const MAX_SIZE_IN_BYTES = 2147483648;

function App() {
  const [fileInfo, setFileInfo] = useState<FileInfo>();

  useEventListener(window, 'message', (evt: MessageEvent<Message>) => {
    const { data: message } = evt;
    if (message.type === MessageType.FileInfo) {
      setFileInfo(message.data);
    }
  });

  useEffect(() => {
    vscode.postMessage({ type: MessageType.Ready });
  }, []);

  if (!fileInfo) {
    return null;
  }

  if (fileInfo.size === 0) {
    // e.g. when comparing git changes on an untracked file - https://github.com/silx-kit/vscode-h5web/issues/22
    return <p>File does not exist</p>;
  }

  if (fileInfo.size >= MAX_SIZE_IN_BYTES) {
    return (
      <StandaloneViewer
        customMessage={
          <p>
            File is too large to be opened from the explorer (max 2 GB). Please
            browse for it from here:
          </p>
        }
      />
    );
  }

  return (
    <ErrorBoundary fallbackRender={({ error }) => <p>{error.message}</p>}>
      <Suspense fallback={<>Loading...</>}>
        <Viewer fileInfo={fileInfo} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
