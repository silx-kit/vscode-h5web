import { Suspense, useEffect, useState } from 'react';
import { useEventListener } from '@react-hookz/web';
import Viewer from './Viewer';
import { ErrorBoundary } from 'react-error-boundary';
import { vscode } from './vscode-api';
import { MessageType, type Message, type FileInfo } from '../src/models';
import { MAX_SIZE_IN_BYTES } from './utils';

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

  if (fileInfo.size >= MAX_SIZE_IN_BYTES) {
    throw new Error(
      'Cannot open: the file is bigger than the maximum supported size (2 GB)'
    );
  }

  if (fileInfo.size === 0) {
    // e.g. when comparing git changes on an untracked file - https://github.com/silx-kit/vscode-h5web/issues/22
    return <p>File does not exist</p>;
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
