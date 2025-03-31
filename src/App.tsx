import { useEventListener } from '@react-hookz/web';
import { Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { type FileInfo, type Message, MessageType } from '../extension/models';
import StandaloneViewer from './StandaloneViewer';
import Viewer from './Viewer';
import { vscode } from './vscode-api';

// 2 GB = 2 * 1024 * 1024 * 1024 B
const MAX_SIZE_IN_BYTES = 2_147_483_648;

function App() {
  const [fileInfo, setFileInfo] = useState<FileInfo>();

  useEventListener(globalThis, 'message', (evt: MessageEvent<Message>) => {
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
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <p>{error instanceof Error ? error.message : 'Unknown error'}</p>
      )}
    >
      <Suspense fallback={<>Loading...</>}>
        <Viewer fileInfo={fileInfo} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
